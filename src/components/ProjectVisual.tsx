import { motion } from 'motion/react'
import type { ProjectVisual as Kind } from '../data/portfolio'

// Small coded "screens" for each project, in place of screenshots. Swap for real images when you have them.

function Flow() {
  const nodes = [
    { x: 12, y: 50, label: 'Inbox' },
    { x: 38, y: 24, label: 'Classify' },
    { x: 38, y: 76, label: 'Extract' },
    { x: 64, y: 50, label: 'Draft reply' },
    { x: 88, y: 28, label: 'Send' },
    { x: 88, y: 72, label: 'Human review' },
  ]
  const links: [number, number][] = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5]]
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
      {links.map(([a, b], i) => (
        <g key={i}>
          <line x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="currentColor" strokeOpacity=".18" strokeWidth=".4" vectorEffect="non-scaling-stroke" />
          <motion.circle
            r="1.1"
            className="fill-accent"
            initial={{ cx: nodes[a].x, cy: nodes[a].y }}
            animate={{ cx: [nodes[a].x, nodes[b].x], cy: [nodes[a].y, nodes[b].y] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.35, ease: 'easeInOut' }}
          />
        </g>
      ))}
      {nodes.map((n) => (
        <g key={n.label}>
          <rect x={n.x - 9} y={n.y - 4} width="18" height="8" rx="4" className="fill-bg" stroke="currentColor" strokeOpacity=".3" strokeWidth=".3" vectorEffect="non-scaling-stroke" />
          <text x={n.x} y={n.y + 1.2} textAnchor="middle" className="fill-current font-mono" fontSize="2.6">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

function Terminal() {
  const lines = [
    { t: '$ shipfast new acme-site --template agency', c: 'text-fg' },
    { t: '✓ scaffolded 42 files', c: 'text-muted' },
    { t: '✓ lint · typecheck · 128 tests passed', c: 'text-muted' },
    { t: '$ shipfast deploy --prod', c: 'text-fg' },
    { t: '↗ live at acme-site.netlify.app  (38s)', c: 'text-accent' },
  ]
  return (
    <div className="flex h-full flex-col p-5 font-mono text-[11px] leading-relaxed md:p-7 md:text-[13px]">
      <div className="mb-4 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2.5 w-2.5 rounded-full bg-fg/15" />
        ))}
      </div>
      {lines.map((l, i) => (
        <motion.p
          key={i}
          className={`${l.c} truncate`}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 + i * 0.35, duration: 0.4 }}
        >
          {l.t}
        </motion.p>
      ))}
    </div>
  )
}

function Dashboard() {
  const bars = [38, 52, 44, 70, 61, 84, 76, 92]
  return (
    <div className="flex h-full flex-col gap-4 p-5 md:p-7">
      <div className="grid grid-cols-3 gap-3">
        {[
          ['Matched', '1,284'],
          ['Pending', '17'],
          ['Overdue', '3'],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl border border-stroke p-3">
            <p className="label !text-[9px]">{k}</p>
            <p className="mt-1 text-lg tracking-tight md:text-2xl">{v}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-1 items-end gap-2 rounded-2xl border border-stroke p-4">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className={`flex-1 rounded-md ${i === bars.length - 1 ? 'bg-accent' : 'bg-fg/15'}`}
            initial={{ height: '6%' }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.07, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>
    </div>
  )
}

function Chat() {
  return (
    <div className="flex h-full flex-col justify-end gap-3 p-5 text-[13px] md:p-7 md:text-sm">
      <motion.p
        className="max-w-[80%] self-end rounded-2xl rounded-br-md bg-fg px-4 py-2.5 text-bg"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        How do I request access to the staging database?
      </motion.p>
      <motion.div
        className="max-w-[88%] rounded-2xl rounded-bl-md border border-stroke px-4 py-3"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      >
        <p>Open a ticket in #infra-access with the role you need. Approvals take about 2 hours.</p>
        <p className="label mt-2 !text-[9px]">Source · Engineering handbook §4.2</p>
      </motion.div>
    </div>
  )
}

export function ProjectVisual({ kind }: { kind: Kind }) {
  return (
    <div className="h-full w-full text-fg">
      {kind === 'flow' && <Flow />}
      {kind === 'terminal' && <Terminal />}
      {kind === 'dashboard' && <Dashboard />}
      {kind === 'chat' && <Chat />}
    </div>
  )
}
