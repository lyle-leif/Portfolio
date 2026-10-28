import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { canHover, prefersReducedMotion } from '../lib/motion'
import type { Theme } from '../hooks/useTheme'

const PALETTE = {
  dark: { node: '#f2f2f0', edge: '#f2f2f0', pulse: '#8ef0c6', edgeOpacity: 0.12, nodeOpacity: 0.85 },
  light: { node: '#111111', edge: '#111111', pulse: '#0f8a5f', edgeOpacity: 0.14, nodeOpacity: 0.8 },
}

// Soft round sprite so points render as discs instead of squares.
function useDiscTexture() {
  return useMemo(() => {
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')!
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.45, 'rgba(255,255,255,1)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
    return new THREE.CanvasTexture(canvas)
  }, [])
}

function buildGraph(count: number) {
  // Deterministic pseudo-random so the graph looks the same on every visit.
  let seed = 7
  const rand = () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  const nodes: THREE.Vector3[] = []
  for (let i = 0; i < count; i++) {
    // Points inside a flattened ellipsoid, denser toward the middle.
    const u = rand() * Math.PI * 2
    const v = Math.acos(2 * rand() - 1)
    const r = Math.pow(rand(), 0.6)
    nodes.push(new THREE.Vector3(Math.sin(v) * Math.cos(u) * 3.4 * r, Math.sin(v) * Math.sin(u) * 2.3 * r, Math.cos(v) * 1.8 * r))
  }

  const edges: [number, number][] = []
  const seen = new Set<string>()
  nodes.forEach((a, i) => {
    const nearest = nodes
      .map((b, j) => ({ j, d: a.distanceTo(b) }))
      .filter((n) => n.j !== i)
      .sort((x, y) => x.d - y.d)
      .slice(0, 3)
    nearest.forEach(({ j, d }) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (d < 1.6 && !seen.has(key)) {
        seen.add(key)
        edges.push([i, j])
      }
    })
  })
  return { nodes, edges }
}

interface Pulse {
  edge: number
  t: number
  speed: number
}

function Network({ theme, animate, compact }: { theme: Theme; animate: boolean; compact: boolean }) {
  const group = useRef<THREE.Group>(null)
  const pulsePoints = useRef<THREE.Points>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const disc = useDiscTexture()
  const colors = PALETTE[theme]
  const { invalidate } = useThree()

  const { nodes, edges } = useMemo(() => buildGraph(compact ? 70 : 120), [compact])

  const nodeGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(nodes), [nodes])
  const edgeGeometry = useMemo(() => {
    const positions: number[] = []
    edges.forEach(([a, b]) => positions.push(...nodes[a].toArray(), ...nodes[b].toArray()))
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return g
  }, [nodes, edges])

  const pulseCount = compact ? 14 : 26
  const pulses = useRef<Pulse[]>([])
  const pulseGeometry = useMemo(() => {
    pulses.current = Array.from({ length: pulseCount }, (_, i) => ({
      edge: (i * 7) % edges.length,
      t: (i * 0.137) % 1,
      speed: 0.25 + ((i * 31) % 10) / 20,
    }))
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(pulseCount * 3), 3))
    return g
  }, [edges.length, pulseCount])

  useEffect(() => {
    if (!canHover()) return
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useEffect(() => invalidate(), [theme, invalidate])

  const tmp = useMemo(() => new THREE.Vector3(), [])

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05)
    const g = group.current
    if (g && animate) {
      g.rotation.y += dt * 0.06
      // Lean toward the cursor (lerp .05 so it feels weighted).
      g.rotation.x += (pointer.current.y * 0.25 - g.rotation.x) * 0.05
      g.position.x += ((compact ? 0 : 1.6) + pointer.current.x * 0.25 - g.position.x) * 0.05
    }

    const attr = pulsePoints.current?.geometry.getAttribute('position') as THREE.BufferAttribute | undefined
    if (!attr) return
    pulses.current.forEach((p, i) => {
      if (animate) {
        p.t += dt * p.speed
        if (p.t >= 1) {
          // Hop onto an edge that starts where this one ended, so pulses travel through the graph.
          const end = edges[p.edge][1]
          const next = edges.findIndex(([a], k) => a === end && k !== p.edge)
          p.edge = next >= 0 ? next : (p.edge * 13 + 5) % edges.length
          p.t = 0
        }
      }
      const [a, b] = edges[p.edge]
      tmp.copy(nodes[a]).lerp(nodes[b], p.t)
      attr.setXYZ(i, tmp.x, tmp.y, tmp.z)
    })
    attr.needsUpdate = true
  })

  return (
    <group ref={group} position={[compact ? 0 : 1.6, compact ? 0.6 : 0, 0]}>
      <lineSegments geometry={edgeGeometry}>
        <lineBasicMaterial color={colors.edge} transparent opacity={colors.edgeOpacity} depthWrite={false} />
      </lineSegments>
      <points geometry={nodeGeometry}>
        <pointsMaterial color={colors.node} size={0.07} map={disc} transparent opacity={colors.nodeOpacity} depthWrite={false} sizeAttenuation />
      </points>
      <points ref={pulsePoints} geometry={pulseGeometry}>
        <pointsMaterial color={colors.pulse} size={0.13} map={disc} transparent depthWrite={false} sizeAttenuation blending={theme === 'dark' ? THREE.AdditiveBlending : THREE.NormalBlending} />
      </points>
    </group>
  )
}

export default function HeroScene({ theme }: { theme: Theme }) {
  const wrapper = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const [compact] = useState(() => window.innerWidth < 768)
  const reduced = useMemo(prefersReducedMotion, [])

  // Stop rendering once the hero scrolls out of view.
  useEffect(() => {
    const el = wrapper.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapper} className="absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={reduced ? 'demand' : visible ? 'always' : 'never'}
      >
        <Network theme={theme} animate={!reduced} compact={compact} />
      </Canvas>
    </div>
  )
}
