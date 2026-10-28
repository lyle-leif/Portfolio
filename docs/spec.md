# Build spec: Lyle Daniel portfolio

Written with the MotionSites web-builder workflow (spec, then build, then a screenshot-and-fix loop).

## Brief
- **Who:** Lyle Daniel, a full-stack developer and AI automation engineer.
- **Visitor:** hiring managers, founders and ops leads who want web apps built or manual work automated.
- **Mood:** precise, nocturnal, alive.
- **Signature:** a live 3D "neural network" in the hero. Nodes drift, data pulses travel along the edges, and the whole graph leans toward the cursor.
- **Scope:** a full one-page site: Hero, About, Work, Stack, Experience and Contact.
- **Stack:** Vite, React, TypeScript, Tailwind v4, motion, GSAP ScrollTrigger, Lenis and React Three Fiber.

## Tokens
- **Fonts:** Instrument Serif (italic 400) for display accents, Inter (300/400/500) for body and UI, JetBrains Mono (400/500) for micro-labels.
- **Dark theme (default):** bg `#0a0a0a`, surface `#111111`, fg `#f2f2f0`, muted `hsl(0 0% 56%)`, stroke `hsl(0 0% 14%)`.
- **Light theme:** bg `#f4f3ef`, surface `#ffffff`, fg `#111111`, muted `hsl(0 0% 38%)`, stroke `hsl(0 0% 86%)`.
- **Accent:** a signal mint `#8ef0c6` (dark) / `#0f8a5f` (light). It is used only for the data pulses, the "available" dot and the primary CTA hover ring.
- **Easing:** entrances `cubic-bezier(.22,1,.36,1)`, state changes `cubic-bezier(.4,0,.2,1)`.
- **Material:** liquid glass (subtle tier) on the nav pill, chips and secondary buttons.
- **Grain:** an SVG noise layer at 0.06 opacity, fixed, with `pointer-events: none`.

## Type scale
- **H1:** `clamp(44px, 7.4vw, 112px)`, line-height .95, tracking -.045em, Inter 400, with Instrument Serif italic accent words in the muted tone.
- **Section titles:** `clamp(40px, 6vw, 88px)`, same treatment.
- **Body:** 16–18px, line-height 1.6.
- **Labels:** JetBrains Mono 11px, uppercase, tracking .2em, 55% opacity, for example `[ 02 ] Work`.

## Sections
1. **Preloader (about 1.4s):** a 000→100 mono counter at the bottom right and a 1px progress line. It fades out, then the hero choreography plays.
2. **Hero (100dvh):** R3F canvas full-bleed. The copy sits in a left column, bottom-anchored.
   - Eyebrow: a pulsing dot followed by "Available for new projects · Remote worldwide".
   - H1, revealed word by word with a blur-in: "I build software / that *runs itself.*"
   - Role line: "Full-stack developer & [AI automation / workflow / web app / agent] engineer". The bracketed word is a rotating slot that changes every 2s.
   - Sub: "I design web apps and AI-driven workflows that take repetitive work off your team's plate, so people can spend their time on the work that matters."
   - CTAs: a solid "See my work" pill with an arrow chip, and a glass "Get in touch" pill.
   - Bottom right: a mono "Scroll" label with a 40px animated line.
   - Bottom fade into the bg.
3. **About:** label `[ 01 ] About`.
   - A scroll-linked word reveal paragraph (opacity .15 → 1), with three highlighted words.
   - Four count-up stats, each a big number with a mono label.
4. **Work:** label `[ 02 ] Selected work`, title "Things I've *shipped*".
   - Four sticky stacking cards (scale target `1 − (n−1−i)·0.03`, offset 28px).
   - Each card has an index, category tags, a title, a one-line problem → result, a stack list, Live/Code links, and an in-page coded visual (flow graph, terminal, dashboard or chat). There are no fake image boxes.
5. **Stack:** label `[ 03 ] Stack`.
   - Two opposing scroll-linked marquee rows of tool names in large type.
   - Below them, four grouped lists: Frontend, Backend, AI & Automation, Tooling.
6. **Experience:** label `[ 04 ] Experience`.
   - A vertical timeline whose 1px line draws in with ScrollTrigger scrub.
   - Each entry (role, company, dates and two lines) rises in as the line reaches it.
7. **Contact:** a big headline, "Let's automate / the *boring part.*"
   - A glass email pill with a copy-to-clipboard button.
   - The primary CTA "Start a project" (mailto).
   - Social circles and a résumé download.
   - Footer: a live local time, © year, and "Back to top".

## Motion rules
- Entrance order: nav → eyebrow → H1 → role → sub → CTAs → scroll cue, with a 0.12s step. Everything finishes by about 1.6s after the preloader.
- Reveals below the hero trigger in view once, with y 30 → 0, 0.8s and a 0.1s stagger.
- **Reduced motion:** no preloader, no Lenis, the 3D graph is static, all text is in its final state, the marquees stop and the scroll reveals stay at full opacity.
- **Touch (hover: none):** no cursor lean and no magnetic CTA.

## Content
All copy lives in `src/data/portfolio.ts`. Projects, experience and stats are realistic samples, ready to be replaced.
