# Portfolio Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring teodorlutoiu.com's content in line with work shipped since the May 21 redesign (3 new project cards, founder Journey stop, CV + GitHub CTAs, ATS keyword strip, expanded SEO), without touching the 7-section WebGL structure.

**Architecture:** Pure content + small-structure refresh on the existing Vite + React + Tailwind + framer-motion editorial build. Data lives in `src/data/*.ts`; presentation in `src/components/*.tsx`; the components are data-driven so most changes are data edits plus four small component edits and `index.html`/SEO statics. A new Vitest + jsdom + Testing Library harness (dev-only, never shipped) gives a real red-green loop on data shape and component behaviour; `npm run build` + `npm run lint` + a `/wip5/` preview with Lighthouse/Playwright are the integration gates. A separate (non-TDD) prerequisite checklist creates/sanitizes the GitHub repos the cards link to and generates the CV PDF; those must finish before the refresh merges to `prod`.

**Tech Stack:** Vite 7, React 18, TypeScript 5 (strict), Tailwind 3, framer-motion 11. New dev-only deps: `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/dom`. Deploy: GitHub Actions → rsync to Hostinger (Hostinger secrets already configured).

---

## Context for the engineer (read first)

You are working in `~/repos/portfolio` on branch `refresh/2026-05-29-content` (already checked out, branched off `prod` tip `90e3a64`; spec commit `a11f1b0` is already on it). All file paths below are relative to the repo root. The companion spec is `docs/superpowers/specs/2026-05-29-portfolio-refresh-design.md` - read it for the "why"; this plan is the "how".

**Repo facts you need:**

- Default deploy branch is **`prod`, not `main`**. `main` is stale. Never push to `main`.
- `package.json` scripts: `dev`, `build` (`tsc && vite build`), `preview`, `lint` (`eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0`). No `test` script yet - Task 1 adds it.
- `tsconfig.json` is **strict** with `noUnusedLocals` and `noUnusedParameters` true, and `include: ["src"]`. Any unused import/var fails `npm run build`. Tests live in a top-level `tests/` dir (outside `src`) so the build's `tsc` never type-checks them.
- ESLint runs over the whole repo with `--max-warnings 0`, so `tests/` files are linted too. Task 1 adds an ESLint override declaring the Vitest globals so test files lint clean.
- Components use `framer-motion` (`useInView`, `useReducedMotion`), which need `IntersectionObserver` and `window.matchMedia`. jsdom has neither - Task 1's `vitest.setup.ts` mocks both, or every component test throws.
- Subpath previews: the build honours `VITE_BASE`. Components reference assets via `import.meta.env.BASE_URL + '...'` (see `src/components/Journey.tsx`). Anything you hardcode as `/cv/...` will 404 under `/wip5/`.
- Git author: the repo's local git config already commits as `... <tiXor-code@users.noreply.github.com>` (verified on `a11f1b0`). Before your first commit run `git config user.email`; if it is not `tiXor-code@users.noreply.github.com`, prefix commits with `-c user.name="tiXor-code" -c user.email="tiXor-code@users.noreply.github.com"`. Do not modify global git config.

## Decisions & deliberate deviations from the spec (apply these as written)

The spec is approved in intent, but four points are corrected here because they would otherwise break an acceptance criterion or violate a hard user rule. These are intentional; do not "fix" them back to match the spec verbatim.

1. **CV links use `import.meta.env.BASE_URL`, not a hardcoded `/cv/...`.** The spec writes `href="/cv/teodor-lutoiu-cv.pdf"` in Hero and Contact. Under the `/wip5/` preview that resolves to `/cv/...` (root), 404, failing the spec's own "Preview: CV opens" check. Use `import.meta.env.BASE_URL + 'cv/teodor-lutoiu-cv.pdf'`, matching the existing Journey image pattern.
2. **Contact gets a `newTab` flag.** Contact's renderer only sets `target="_blank"` when `href.startsWith('http')`. A BASE_URL-relative CV href would open in the same tab. Add an optional `newTab?: boolean` to the channel type and OR it into the target check.
3. **No em/en dashes anywhere in copy.** Hard user rule (overrides the spec). The spec introduced `—`/`–` in the new meta description, the new project card summaries (cv-tailor, gepa), and the Journey period strings. Replace every one: sentence-break em dashes become a period; the meta-description em dash becomes ` - ` (matching the current live copy `Lutoiu - AI automation engineer`); Journey period ranges use ` - ` (hyphen-space, matching the existing `journey.ts`). Tests in Tasks 1/3/9 assert no `[–—]` slips through.
4. **Hero third stat-band span is shown on all widths.** Today it is `hidden sm:inline` ("Est. 2024"). The new "Available · ~4 weeks notice" is the most recruiter-valuable line, so drop `hidden sm:inline` so it shows on mobile too. The stat band is `flex flex-wrap`, so it wraps cleanly at 375px (verified in the acceptance checks).

If Teodor disagrees with any of these at execution time, adjust the affected task only.

## File structure (what changes and why)

**New files:**
- `vitest.setup.ts` - jsdom global mocks (`matchMedia`, `IntersectionObserver`) + jest-dom matchers. One responsibility: make the test environment able to render framer-motion components.
- `tests/data/projects.test.ts`, `tests/data/journey.test.ts` - pure data-shape assertions.
- `tests/components/Nav.test.tsx`, `Hero.test.tsx`, `Contact.test.tsx`, `Services.test.tsx`, `Journey.test.tsx` - behaviour assertions per component.
- `tests/static/html.test.ts` - asserts `index.html` meta + JSON-LD; `tests/static/seo.test.ts` - asserts robots/sitemap.
- `public/robots.txt`, `public/sitemap.xml` - SEO statics (copied to `dist/` by Vite).
- `public/cv/teodor-lutoiu-cv.pdf` - generated by `cv-tailor` (prerequisite checklist, Section K).
- `.github/workflows/deploy-wip5.yml` - preview deploy (Section L).

**Modified files:**
- `vite.config.ts` - add `test` block (jsdom, setup file, tests glob).
- `package.json` - add `vitest`/RTL devDeps + `test`/`test:watch` scripts.
- `.eslintrc.cjs` - override for `tests/**` + `vitest.setup.ts` (Vitest globals).
- `.gitignore` - add `coverage`.
- `src/data/projects.ts` - 6 → 9 cards, reordered, copy fixes.
- `src/data/journey.ts` - 5 stops, Ministeru' last, EA "Present", hyphen ranges.
- `src/components/Hero.tsx` - stat band + CV CTA.
- `src/components/Nav.tsx` - GitHub icon link (local `GitHubIcon` SVG).
- `src/components/Contact.tsx` - 4th channel + grid + `newTab`.
- `src/components/Services.tsx` - ATS `<dl>` strip.
- `src/components/Journey.tsx` - lead copy + Brussels figure layout.
- `index.html` - meta description, og:description, expanded JSON-LD.

**Deliberately untouched:** `src/components/ShaderBg.tsx`, `AgentDemo.tsx`, `Projects.tsx` (data-driven - renders 9 cards as-is; note `0{i+1}` indexing is fine for ≤9), `Footer.tsx`, `src/lib/icp.ts`, Three.js deps, `deployHost.yml`.

---

# PHASE 0 - Test infrastructure

### Task 1: Stand up Vitest + jsdom + Testing Library

**Files:**
- Modify: `package.json`
- Modify: `vite.config.ts`
- Create: `vitest.setup.ts`
- Modify: `.eslintrc.cjs`
- Modify: `.gitignore`
- Delete: `tests/placeholder.test.js`
- Create: `tests/sanity.test.ts`

- [ ] **Step 1: Install dev dependencies**

Run:
```bash
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/dom
```
Expected: installs without peer-dependency errors. If npm reports a Vite 7 / Vitest peer conflict, pin with `npm install -D vitest@^3` (Vitest 3 supports Vite 7). `@testing-library/react@16` supports React 18 and needs `@testing-library/dom` as a peer (installed above).

- [ ] **Step 2: Add test scripts to `package.json`**

In the `"scripts"` block, add `test` and `test:watch` (keep the existing four):
```json
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "test": "vitest run",
    "test:watch": "vitest"
  },
```

- [ ] **Step 3: Add the Vitest `test` block to `vite.config.ts`**

Replace the file with (only the import line and the new `test` block change):
```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
  server: { port: 3000, host: 'localhost' },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    css: false,
  },
})
```
`vitest/config` re-exports Vite's `defineConfig` with the `test` field typed, so this stays valid for the normal build too.

- [ ] **Step 4: Create `vitest.setup.ts`**

```ts
import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// jsdom has no matchMedia; framer-motion's useReducedMotion calls it.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
})

// jsdom has no IntersectionObserver; framer-motion's useInView needs it.
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
```

- [ ] **Step 5: Add an ESLint override for tests + setup**

In `.eslintrc.cjs`, add an `overrides` array (after the `rules` block) so the Vitest globals are recognised and `tests/` runs in a Node env:
```js
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      files: ['tests/**/*.{ts,tsx}', 'vitest.setup.ts'],
      env: { node: true, browser: true },
      globals: {
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
  ],
}
```

- [ ] **Step 6: Add `coverage` to `.gitignore`**

Append a line after `dist`:
```
coverage
```

- [ ] **Step 7: Replace the placeholder test with a real sanity test**

Delete `tests/placeholder.test.js`, then create `tests/sanity.test.ts`:
```ts
import { render, screen } from '@testing-library/react'

describe('test harness', () => {
  it('runs and renders DOM', () => {
    render(<div>harness ok</div>)
    expect(screen.getByText('harness ok')).toBeInTheDocument()
  })
})
```
```bash
git rm tests/placeholder.test.js
```

- [ ] **Step 8: Run the test to verify the harness works**

Run: `npm run test`
Expected: PASS - 1 file, 1 test passing. (`describe/it/expect` resolve from globals; `render`/`screen` from RTL; jest-dom matcher `toBeInTheDocument` works.)

- [ ] **Step 9: Verify the new tooling does not break the existing gates**

Run: `npm run lint`
Expected: zero warnings/errors (the `tests/` glob is linted; the override keeps it clean).
Run: `npm run build`
Expected: zero TypeScript errors, Vite build succeeds (tests are outside `src`, so `tsc` ignores them).

- [ ] **Step 10: Commit**

```bash
git add package.json package-lock.json vite.config.ts vitest.setup.ts .eslintrc.cjs .gitignore tests/sanity.test.ts
git commit -m "test: add vitest + jsdom + testing-library harness"
```

---

# PHASE 1 - Data layer (pure-data TDD)

### Task 2: Projects data - 9 cards, reordered, copy fixed

**Files:**
- Test: `tests/data/projects.test.ts`
- Modify: `src/data/projects.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/data/projects.test.ts`:
```ts
import { PROJECTS } from '../../src/data/projects'

describe('PROJECTS data', () => {
  it('has exactly 9 cards in the spec order', () => {
    expect(PROJECTS.map((p) => p.id)).toEqual([
      'icp-agent',
      'support-agent',
      'cv-tailor',
      'wiki-substrate',
      'gepa',
      'jobmap',
      'openclaw',
      'ministeru',
      'orb-bot',
    ])
  })

  it('every card has the required fields and a valid accent', () => {
    for (const p of PROJECTS) {
      expect(p.id).toBeTruthy()
      expect(p.name).toBeTruthy()
      expect(p.kind).toBeTruthy()
      expect(p.summary).toBeTruthy()
      expect(p.detail).toBeTruthy()
      expect(p.stack.length).toBeGreaterThan(0)
      expect(['signal', 'warm', 'cold']).toContain(p.accent)
      expect(Array.isArray(p.links)).toBe(true)
    }
  })

  it('every link has a label and an http(s) href', () => {
    for (const p of PROJECTS) {
      for (const l of p.links) {
        expect(l.label.length).toBeGreaterThan(0)
        expect(l.href).toMatch(/^https?:\/\//)
      }
    }
  })

  it('the three new cards carry a tiXor-code GitHub link', () => {
    const byId = Object.fromEntries(PROJECTS.map((p) => [p.id, p]))
    for (const id of ['cv-tailor', 'wiki-substrate', 'gepa']) {
      expect(
        byId[id].links.some((l) => l.href.includes('github.com/tiXor-code')),
      ).toBe(true)
    }
  })

  it('contains no em or en dashes in copy', () => {
    for (const p of PROJECTS) {
      expect(`${p.summary} ${p.detail} ${p.kind}`).not.toMatch(/[–—]/)
    }
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- tests/data/projects.test.ts`
Expected: FAIL - current file has 6 cards in a different order; the order and "3 new cards" assertions fail.

- [ ] **Step 3: Rewrite `src/data/projects.ts`**

Keep the `Project` interface unchanged. Replace the `PROJECTS` array so it is exactly these 9 entries in this order (icp/support/jobmap/openclaw/ministeru/orb copy is carried over verbatim from the current file; cv-tailor/wiki-substrate/gepa are new with em dashes removed):
```ts
export const PROJECTS: Project[] = [
  {
    id: 'icp-agent',
    name: 'icp-agent',
    kind: 'Autonomous lead-engagement agent',
    summary:
      'Takes a lead webhook, enriches it, decides on its own whether to research further, scores it against a six-criterion ICP, routes it Hot / Warm / Cold, and drafts the opening email.',
    detail:
      'A bounded ReAct loop: the model picks each next action from a closed enum until it has enough to score. Every decision is logged. 15 unit tests. This is the agent running in the panel above.',
    stack: ['TypeScript', 'Hono', 'Azure OpenAI', 'Hunter.io', 'SerpAPI'],
    accent: 'signal',
    isDemo: true,
    links: [
      { label: 'GitHub', href: 'https://github.com/tiXor-code/icp-agent' },
      { label: 'Live', href: 'https://icp-agent-ten.vercel.app' },
    ],
  },
  {
    id: 'support-agent',
    name: 'RAG support agent',
    kind: 'Support auto-responder with a confidence gate',
    summary:
      'Classifies a support ticket, retrieves from an indexed help centre, drafts a cited reply, self-grades it, then a three-lever confidence gate decides auto-send versus human review.',
    detail:
      '226 document chunks at 1536 dimensions in Supabase pgvector with an HNSW index. The gate uses a retrieval check and a self-grade check independently, so each failure mode is tunable on its own.',
    stack: ['Next.js', 'Supabase pgvector', 'Azure OpenAI', 'n8n'],
    accent: 'cold',
    links: [{ label: 'GitHub', href: 'https://github.com/tiXor-code/instantly-support-agent' }],
  },
  {
    id: 'cv-tailor',
    name: 'cv-tailor',
    kind: 'JD-to-CV generator with deterministic renderer',
    summary:
      'Takes a job description and a structured profile, returns a tailored PDF. A single Azure OpenAI call returns JSON that drives a deterministic Jinja/WeasyPrint renderer. No LLM in the layout. An honesty-guard prompt blocks fabricated experience.',
    detail:
      '33 tests across 9 modules, TDD-first. The CV you can download from the top of this page is generated by this pipeline.',
    stack: ['Python', 'Azure OpenAI', 'WeasyPrint', 'Jinja2'],
    accent: 'signal',
    links: [{ label: 'GitHub', href: 'https://github.com/tiXor-code/cv-tailor' }],
  },
  {
    id: 'wiki-substrate',
    name: 'Wiki substrate',
    kind: 'Knowledge graph + ingest workflow over markdown',
    summary:
      'A typed schema (entity / concept / synthesis) with status gates and an ingest pipeline over ~700 personal markdown pages. MCP-wired so agents can query the second brain directly in Claude Code sessions. Built on top of Tobi Lütke\'s qmd for the underlying BM25 + vector + rerank.',
    detail:
      'The substrate, schema, and ingest workflow are mine. The hybrid-search engine is qmd. Public repo contains the schema and tooling. The vault itself stays private.',
    stack: ['TypeScript', 'MCP', 'qmd', 'Obsidian'],
    accent: 'cold',
    links: [{ label: 'GitHub', href: 'https://github.com/tiXor-code/wiki-substrate' }],
  },
  {
    id: 'gepa',
    name: 'GEPA Prompt Lab',
    kind: 'Genetic prompt evolution with eval scoring',
    summary:
      'Iteratively optimises prompts driving JobMap\'s admin and ingestion pipelines. GEPA-style mutation loop with per-prompt eval scoring. Measurable lift on enrichment accuracy and corrective-protocol output quality.',
    detail:
      'The eval set is the hard part. Hit, run, score, mutate.',
    stack: ['Python', 'Azure OpenAI', 'GEPA', 'eval design'],
    accent: 'warm',
    links: [{ label: 'GitHub', href: 'https://github.com/tiXor-code/gepa-prompt-lab' }],
  },
  {
    id: 'jobmap',
    name: 'JobMap',
    kind: 'Job-search SaaS, co-founder',
    summary:
      'A paid product that indexes thousands of jobs, maps the skills behind them, and scores roles against a user profile. 9,300 jobs and 504 skills mapped.',
    detail:
      'Runs on Azure. An AI pipeline classifies each role and builds the skill graph that powers the match score. Co-founded and shipped to paying users.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Azure'],
    accent: 'warm',
    links: [{ label: 'Site', href: 'https://how-to-get-a-job.com' }],
  },
  {
    id: 'openclaw',
    name: 'OpenClaw stack',
    kind: 'Self-hosted agent operations',
    summary:
      'A personal AI operations stack running 24/7 on a Mac mini M4: an agent runtime, n8n workflows, a trading bot, and a Cloudflare tunnel.',
    detail:
      'The home base behind most of the work here. Real uptime, real workloads, no managed platform underneath it.',
    stack: ['n8n', 'Docker', 'Cloudflare Tunnel', 'Mac mini M4'],
    accent: 'signal',
    links: [{ label: 'GitHub', href: 'https://github.com/tiXor-code/openclaw' }],
  },
  {
    id: 'ministeru',
    name: 'Ministeru Creativ',
    kind: 'Creative + automation studio, founder',
    summary:
      'A studio I founded, four people plus contractors, live since March 2026. It runs its own lead-enrichment pipeline.',
    detail:
      'Where the agent and automation work meets paying clients. The pipeline that feeds it is the production sibling of icp-agent.',
    stack: ['n8n', 'TypeScript', 'Automation'],
    accent: 'warm',
    links: [{ label: 'Site', href: 'https://ministerucreativ.com' }],
  },
  {
    id: 'orb-bot',
    name: 'ORB trading bot',
    kind: 'Algorithmic trading system',
    summary:
      'An opening-range-breakout bot on Interactive Brokers, backtested across five years and running micro-futures on a paper account.',
    detail:
      'The non-agent end of the range: strict rules, strict risk, fully automated execution. Proof that the automation instinct is not limited to LLMs.',
    stack: ['Python', 'IBKR API', 'Backtesting'],
    accent: 'cold',
    links: [],
  },
]
```
Note two link changes vs the current file: `openclaw` now points at `https://github.com/tiXor-code/openclaw` (was the bare `tiXor-code` profile) - the `openclaw` repo README refresh in Section K must complete before merge. `orb-bot` keeps `links: []` (the spec's documented fallback); Section K adds the link in a follow-up only if the sanitized repo ships in time.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test -- tests/data/projects.test.ts`
Expected: PASS - all five cases green.

- [ ] **Step 5: Commit**

```bash
git add src/data/projects.ts tests/data/projects.test.ts
git commit -m "feat(projects): 9 cards, spec order, add cv-tailor/wiki-substrate/gepa"
```

### Task 3: Journey data - 5 stops, founder last, EA "Present"

**Files:**
- Test: `tests/data/journey.test.ts`
- Modify: `src/data/journey.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/data/journey.test.ts`:
```ts
import { JOURNEY } from '../../src/data/journey'

describe('JOURNEY data', () => {
  it('has 5 stops ending with Ministeru\' Creativ', () => {
    expect(JOURNEY).toHaveLength(5)
    expect(JOURNEY[JOURNEY.length - 1].org).toBe("Ministeru' Creativ")
  })

  it('marks EA as ongoing (Present), not 2025', () => {
    const ea = JOURNEY.find((j) => j.org === 'Electronic Arts')
    expect(ea).toBeDefined()
    expect(ea!.period).toBe('2024 - Present')
  })

  it('uses no em or en dashes in any period range', () => {
    for (const j of JOURNEY) {
      expect(j.period).not.toMatch(/[–—]/)
    }
  })

  it('every stop has period, org, role, note', () => {
    for (const j of JOURNEY) {
      expect(j.period).toBeTruthy()
      expect(j.org).toBeTruthy()
      expect(j.role).toBeTruthy()
      expect(j.note).toBeTruthy()
    }
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- tests/data/journey.test.ts`
Expected: FAIL - last org is "Independent", EA period is "2024 - 2025".

- [ ] **Step 3: Rewrite the `JOURNEY` array in `src/data/journey.ts`**

Keep the `JourneyStop` interface. Replace the array (note hyphen ranges, not en dashes):
```ts
export const JOURNEY: JourneyStop[] = [
  {
    period: '2017 - 2022',
    org: 'University of Worcester',
    role: 'BSc Computer Games Design & Development',
    note: 'Dissertation on AI in games, written before the LLM wave. The interest started early.',
  },
  {
    period: '2023 - 2024',
    org: 'Play For Democracy / Arden',
    role: 'Producer & Game Designer',
    note: 'Shipped a mobile game with a team of eight. The work was invited to the European Parliament in Brussels.',
  },
  {
    period: '2024',
    org: 'Ubisoft',
    role: 'QA, Rainbow Six Siege',
    note: 'The foot in the door of a major studio. Learned what shipping at scale actually demands.',
  },
  {
    period: '2024 - Present',
    org: 'Electronic Arts',
    role: 'Assistant Content Producer, EA FC Ultimate Team',
    note: 'Data-driven content timing for a live game played by millions. On-time delivery, every cycle.',
  },
  {
    period: '2026 - Present',
    org: "Ministeru' Creativ",
    role: 'Founder · AI automation engineer',
    note: 'Four-person studio plus contractors, live since March 2026. Where the AI automation work meets paying clients. Co-founded JobMap on the side.',
  },
]
```
`Journey.tsx` highlights only the last stop's dot in `bg-accent`, so Ministeru' is visually "now" and EA stays `bg-line-2` - no component change needed for that.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test -- tests/data/journey.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/journey.ts tests/data/journey.test.ts
git commit -m "feat(journey): founder stop, EA marked Present, hyphen ranges"
```

---

# PHASE 2 - Components (jsdom + RTL TDD)

### Task 4: Nav - GitHub icon link

**Files:**
- Test: `tests/components/Nav.test.tsx`
- Modify: `src/components/Nav.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/components/Nav.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import Nav from '../../src/components/Nav'

describe('Nav', () => {
  it('renders a GitHub link with an accessible label and correct href', () => {
    render(<Nav />)
    const gh = screen.getByLabelText('GitHub')
    expect(gh).toHaveAttribute('href', 'https://github.com/tiXor-code')
    expect(gh).toHaveAttribute('target', '_blank')
  })

  it('still shows the AVAILABLE FOR WORK pill', () => {
    render(<Nav />)
    expect(screen.getByText('AVAILABLE FOR WORK')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- tests/components/Nav.test.tsx`
Expected: FAIL - `getByLabelText('GitHub')` finds nothing.

- [ ] **Step 3: Add the icon and wrap the right-side cluster in `src/components/Nav.tsx`**

Add a local (non-exported) `GitHubIcon` component above `export default function Nav()`:
```tsx
function GitHubIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 014 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}
```
Replace the current right-side `<a href="#contact" ...>AVAILABLE FOR WORK</a>` block (the one ending the `<nav>`) with a wrapped cluster:
```tsx
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/tiXor-code"
            target="_blank" rel="noreferrer"
            aria-label="GitHub"
            className="text-ink-dim transition-colors hover:text-ink"
          >
            <GitHubIcon className="h-4 w-4" />
          </a>
          <a href="#contact" className="mono flex items-center gap-2 text-[12px] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-blink" />
            <span className="hidden sm:inline">AVAILABLE FOR WORK</span>
          </a>
        </div>
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test -- tests/components/Nav.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Nav.tsx tests/components/Nav.test.tsx
git commit -m "feat(nav): add GitHub icon link"
```

### Task 5: Hero - stat band + CV download CTA

**Files:**
- Test: `tests/components/Hero.test.tsx`
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/components/Hero.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import Hero from '../../src/components/Hero'

describe('Hero', () => {
  it('shows the updated stat band', () => {
    render(<Hero />)
    expect(screen.getByText(/09 systems shipped/)).toBeInTheDocument()
    expect(screen.getByText(/~4 weeks notice/)).toBeInTheDocument()
    expect(screen.queryByText(/Est\. 2024/)).not.toBeInTheDocument()
  })

  it('has a CV download link that opens in a new tab with a base-aware href', () => {
    render(<Hero />)
    const cv = screen.getByRole('link', { name: /Download CV \(PDF\)/i })
    expect(cv).toHaveAttribute('target', '_blank')
    expect(cv.getAttribute('href')).toMatch(/cv\/teodor-lutoiu-cv\.pdf$/)
  })

  it('keeps the two existing primary CTAs', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /Run the live agent/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Selected work/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- tests/components/Hero.test.tsx`
Expected: FAIL - "06 systems shipped" / "Est. 2024" present, no CV link.

- [ ] **Step 3: Edit `src/components/Hero.tsx`**

(a) In the CTA row, add the CV link after the "Selected work" anchor (inside the same `motion.div` with `flex flex-wrap items-center gap-3`):
```tsx
          <a href="#work" className="rounded-full border border-line-2 px-6 py-3 text-sm text-ink backdrop-blur-sm transition-colors hover:border-ink-faint">
            Selected work
          </a>
          <a
            href={import.meta.env.BASE_URL + 'cv/teodor-lutoiu-cv.pdf'}
            target="_blank" rel="noreferrer"
            className="mono text-[12px] uppercase tracking-[0.12em] text-ink-dim transition-colors hover:text-ink"
          >
            Download CV (PDF) &#8599;
          </a>
```
(b) Replace the three stat-band `<span>`s (drop `hidden sm:inline` from the third):
```tsx
        <span>Bucharest &middot; remote, EU</span>
        <span>09 systems shipped &middot; 02 products</span>
        <span>Available &middot; ~4 weeks notice</span>
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test -- tests/components/Hero.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.tsx tests/components/Hero.test.tsx
git commit -m "feat(hero): stat band refresh + CV download CTA"
```

### Task 6: Contact - CV (PDF) as 4th channel

**Files:**
- Test: `tests/components/Contact.test.tsx`
- Modify: `src/components/Contact.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/components/Contact.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import Contact from '../../src/components/Contact'

describe('Contact', () => {
  it('renders four channel cards including CV (PDF)', () => {
    render(<Contact />)
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.getByText('CV (PDF)')).toBeInTheDocument()
  })

  it('the CV channel opens the PDF in a new tab with a base-aware href', () => {
    render(<Contact />)
    const cv = screen.getByRole('link', { name: /CV \(PDF\)/i })
    expect(cv).toHaveAttribute('target', '_blank')
    expect(cv.getAttribute('href')).toMatch(/cv\/teodor-lutoiu-cv\.pdf$/)
  })

  it('the email channel still opens in the same tab', () => {
    render(<Contact />)
    const email = screen.getByRole('link', { name: /contact@teodorlutoiu\.com/i })
    expect(email).not.toHaveAttribute('target', '_blank')
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- tests/components/Contact.test.tsx`
Expected: FAIL - only 3 channels, no CV.

- [ ] **Step 3: Edit `src/components/Contact.tsx`**

(a) Replace the `CHANNELS` const with a typed array that adds the CV channel and a `newTab` flag:
```ts
const CHANNELS: { label: string; value: string; href: string; newTab?: boolean }[] = [
  { label: 'Email', value: 'contact@teodorlutoiu.com', href: 'mailto:contact@teodorlutoiu.com' },
  { label: 'LinkedIn', value: 'in/teodorlc', href: 'https://www.linkedin.com/in/teodorlc' },
  { label: 'GitHub', value: 'tiXor-code', href: 'https://github.com/tiXor-code' },
  { label: 'CV (PDF)', value: 'teodor-lutoiu-cv.pdf', href: import.meta.env.BASE_URL + 'cv/teodor-lutoiu-cv.pdf', newTab: true },
]
```
(b) Widen the grid:
```tsx
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
```
(c) Make the anchor honour `newTab` (change only the `target` expression):
```tsx
              <a href={c.href} target={c.href.startsWith('http') || c.newTab ? '_blank' : undefined} rel="noreferrer"
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test -- tests/components/Contact.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Contact.tsx tests/components/Contact.test.tsx
git commit -m "feat(contact): add CV (PDF) channel, 4-col grid"
```

### Task 7: Services - ATS keyword strip

**Files:**
- Test: `tests/components/Services.test.tsx`
- Modify: `src/components/Services.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/components/Services.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import Services from '../../src/components/Services'

describe('Services ATS strip', () => {
  it('renders a definition list with the four stack categories', () => {
    render(<Services />)
    const terms = screen.getAllByRole('term').map((t) => t.textContent)
    expect(terms).toEqual(
      expect.arrayContaining(['Languages', 'AI / LLM', 'Frameworks', 'Infra']),
    )
    expect(screen.getAllByRole('definition').length).toBeGreaterThanOrEqual(4)
  })

  it('surfaces ATS keywords in the definitions', () => {
    render(<Services />)
    expect(screen.getByText(/Python · TypeScript · JavaScript · SQL · Node\.js/)).toBeInTheDocument()
    expect(screen.getByText(/MCP/)).toBeInTheDocument()
    expect(screen.getByText(/Vercel · Azure App Services/)).toBeInTheDocument()
  })

  it('keeps the existing capability tiles', () => {
    render(<Services />)
    expect(screen.getByText('Autonomous agents')).toBeInTheDocument()
    expect(screen.getByText('RAG systems')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- tests/components/Services.test.tsx`
Expected: FAIL - no `<dt>`/`<dd>` elements yet.

- [ ] **Step 3: Edit `src/components/Services.tsx`**

Inside the "What I actually build" panel, insert the `<dl>` block immediately after the closing `</div>` of the CAPS grid and before the panel's closing `</div>`:
```tsx
            <div className="mt-7 border-t border-line pt-5">
              <div className="mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">Stack</div>
              <dl className="mt-3 space-y-2 text-[12.5px] leading-relaxed">
                <div className="grid grid-cols-[88px_1fr] gap-3">
                  <dt className="mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">Languages</dt>
                  <dd className="text-ink-dim">Python · TypeScript · JavaScript · SQL · Node.js</dd>
                </div>
                <div className="grid grid-cols-[88px_1fr] gap-3">
                  <dt className="mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">AI / LLM</dt>
                  <dd className="text-ink-dim">Azure OpenAI · Claude API · RAG · embeddings · pgvector · agentic workflows · prompt engineering · eval design · MCP</dd>
                </div>
                <div className="grid grid-cols-[88px_1fr] gap-3">
                  <dt className="mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">Frameworks</dt>
                  <dd className="text-ink-dim">Next.js · React · Hono · Flask · FastAPI · n8n</dd>
                </div>
                <div className="grid grid-cols-[88px_1fr] gap-3">
                  <dt className="mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">Infra</dt>
                  <dd className="text-ink-dim">Vercel · Azure App Services · GitHub Actions (OIDC) · Docker · Cloudflare · Postgres · Supabase</dd>
                </div>
              </dl>
            </div>
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test -- tests/components/Services.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Services.tsx tests/components/Services.test.tsx
git commit -m "feat(services): add semantic ATS keyword strip"
```

### Task 8: Journey - lead copy + Brussels figure fills the column

**Files:**
- Test: `tests/components/Journey.test.tsx`
- Modify: `src/components/Journey.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/components/Journey.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import Journey from '../../src/components/Journey'

describe('Journey', () => {
  it('uses the refreshed lead copy', () => {
    render(<Journey />)
    expect(
      screen.getByText(/founding a studio and going full-time on AI/i),
    ).toBeInTheDocument()
  })

  it('renders all five stops, ending with Ministeru', () => {
    render(<Journey />)
    expect(screen.getByText("Ministeru' Creativ")).toBeInTheDocument()
    expect(screen.getByText('University of Worcester')).toBeInTheDocument()
  })

  it('the Brussels figure image stretches to fill the column', () => {
    render(<Journey />)
    const img = screen.getByAltText(/Brussels/i)
    expect(img.className).toMatch(/flex-1/)
    expect(img.className).toMatch(/lg:h-auto/)
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- tests/components/Journey.test.tsx`
Expected: FAIL - old lead text; image className is `h-72 w-full object-cover lg:h-[440px]` (no `flex-1`/`lg:h-auto`).

- [ ] **Step 3: Edit `src/components/Journey.tsx`**

(a) Replace the `SectionHead` `lead` prop value with:
```tsx
          lead="Five years from a games degree to producing at EA, then founding a studio and going full-time on AI. The shipping discipline is what the agents and pipelines run on."
```
(b) Change the grid wrapper column width:
```tsx
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_minmax(320px,_400px)]">
```
(c) Replace the entire `<Reveal delay={0.1}>...</Reveal>` figure block (the right column) with:
```tsx
          <Reveal delay={0.1} className="lg:h-full">
            <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel">
              <img
                src={import.meta.env.BASE_URL + 'images/journey/brussels-street.jpg'}
                alt="Teodor in Brussels during the Play For Democracy project"
                loading="lazy"
                className="h-72 w-full flex-1 object-cover lg:h-auto"
              />
              <figcaption className="border-t border-line px-4 py-3 text-[12px] text-ink-faint">
                Brussels, 2024. The Play For Democracy work, on its way to the European Parliament.
              </figcaption>
            </figure>
          </Reveal>
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test -- tests/components/Journey.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Journey.tsx tests/components/Journey.test.tsx
git commit -m "feat(journey): refreshed lead + full-height Brussels figure"
```

---

# PHASE 3 - Static HTML & SEO

### Task 9: index.html - meta description, og:description, expanded JSON-LD

**Files:**
- Test: `tests/static/html.test.ts`
- Modify: `index.html`

- [ ] **Step 1: Write the failing test**

Create `tests/static/html.test.ts`:
```ts
import { readFileSync } from 'node:fs'

const html = readFileSync('index.html', 'utf8')

describe('index.html meta + structured data', () => {
  it('meta description mentions TypeScript and Python and uses no em/en dash', () => {
    const m = html.match(/<meta name="description" content="([^"]*)"/)
    expect(m).not.toBeNull()
    expect(m![1]).toContain('TypeScript and Python')
    expect(m![1]).not.toMatch(/[–—]/)
  })

  it('og:description matches the new description text', () => {
    const m = html.match(/<meta property="og:description" content="([^"]*)"/)
    expect(m).not.toBeNull()
    expect(m![1]).toContain('TypeScript and Python')
  })

  it('JSON-LD Person is expanded with knowsAbout, worksFor, alumniOf', () => {
    expect(html).toContain('"knowsAbout"')
    expect(html).toContain('"worksFor"')
    expect(html).toContain('"alumniOf"')
    expect(html).toContain('Retrieval-Augmented Generation')
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- tests/static/html.test.ts`
Expected: FAIL - current description lacks "TypeScript and Python"; JSON-LD has no `knowsAbout`.

- [ ] **Step 3: Edit `index.html`**

(a) Replace the description meta (line ~7) - note ` - ` hyphen, NOT an em dash:
```html
  <meta name="description" content="Teodor-Cristian Lutoiu - AI automation engineer. Autonomous agents, RAG systems, and production automation in TypeScript and Python. Live agent demo on the page." />
```
(b) Replace the og:description meta (line ~11) with the same text:
```html
  <meta property="og:description" content="Teodor-Cristian Lutoiu - AI automation engineer. Autonomous agents, RAG systems, and production automation in TypeScript and Python. Live agent demo on the page." />
```
(c) Replace the JSON-LD `<script type="application/ld+json">...</script>` block (the minified one-liner) with:
```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Teodor-Cristian Lutoiu",
    "jobTitle": "AI Automation Engineer",
    "url": "https://teodorlutoiu.com",
    "email": "contact@teodorlutoiu.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bucharest",
      "addressCountry": "RO"
    },
    "knowsAbout": [
      "AI agents",
      "Retrieval-Augmented Generation",
      "LLM orchestration",
      "Prompt engineering",
      "Eval design",
      "n8n",
      "Azure OpenAI",
      "Anthropic Claude",
      "TypeScript",
      "Python",
      "Vector databases"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Ministeru' Creativ",
      "url": "https://ministerucreativ.com"
    },
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "University of Worcester"
    },
    "sameAs": [
      "https://www.linkedin.com/in/teodorlc",
      "https://github.com/tiXor-code"
    ]
  }
  </script>
```
Leave the Twitter card description, the gtag scripts, and everything else untouched.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test -- tests/static/html.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add index.html tests/static/html.test.ts
git commit -m "feat(seo): tighten meta description, expand JSON-LD Person"
```

### Task 10: SEO statics - robots.txt + sitemap.xml

**Files:**
- Test: `tests/static/seo.test.ts`
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`

- [ ] **Step 1: Write the failing test**

Create `tests/static/seo.test.ts`:
```ts
import { readFileSync, existsSync } from 'node:fs'

describe('SEO static files', () => {
  it('robots.txt allows all and points to the sitemap', () => {
    expect(existsSync('public/robots.txt')).toBe(true)
    const robots = readFileSync('public/robots.txt', 'utf8')
    expect(robots).toMatch(/User-agent:\s*\*/)
    expect(robots).toContain('Sitemap: https://teodorlutoiu.com/sitemap.xml')
  })

  it('sitemap.xml lists the homepage', () => {
    expect(existsSync('public/sitemap.xml')).toBe(true)
    const sitemap = readFileSync('public/sitemap.xml', 'utf8')
    expect(sitemap).toContain('<loc>https://teodorlutoiu.com/</loc>')
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- tests/static/seo.test.ts`
Expected: FAIL - neither file exists.

- [ ] **Step 3: Create the files**

`public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://teodorlutoiu.com/sitemap.xml
```
`public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://teodorlutoiu.com/</loc>
    <lastmod>2026-05-29</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test -- tests/static/seo.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add public/robots.txt public/sitemap.xml tests/static/seo.test.ts
git commit -m "feat(seo): add robots.txt and sitemap.xml"
```

---

# PHASE 4 - Full verification

### Task 11: Whole-suite gates + bundle budget

**Files:** none (verification only)

- [ ] **Step 1: Run the full test suite**

Run: `npm run test`
Expected: PASS - all data, component, and static test files green (≈8 files).

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: zero warnings/errors.

- [ ] **Step 3: Type-check + build**

Run: `npm run build`
Expected: zero TS errors; Vite emits `dist/`. Note the per-chunk sizes printed.

- [ ] **Step 4: Bundle budget check (≤ 5 KB gzipped growth, no new chunks)**

Establish the baseline once, from the prod tip, in a throwaway worktree so your working tree is untouched:
```bash
git worktree add /tmp/portfolio-baseline 90e3a64
cd /tmp/portfolio-baseline && npm ci && npm run build
```
Note the gzip sizes Vite prints for each `dist/assets/*.js`. Then back in the repo (`cd ~/repos/portfolio`), compare the refresh build's gzip sizes from Step 3. Expected: same chunk set (`vendor`, `motion`, plus the index/entry chunk), total gzipped JS growth < 5 KB. Clean up: `git worktree remove /tmp/portfolio-baseline`.
If growth exceeds 5 KB, stop and investigate (a stray dependency import is the usual cause) before proceeding.

- [ ] **Step 5: Commit (only if Step 4 required a fix; otherwise skip)**

```bash
git add -A
git commit -m "chore: keep bundle within budget"
```

---

# SECTION K - Prerequisite checklist (procedural, NOT TDD)

These are **gates that must be green before the refresh merges to `prod`** (spec section J + acceptance criteria). Repo creation, secret audits, and PDF generation are not test-first; track them as a checklist. Order: CV PDF → cv-tailor → wiki-substrate → gepa flip → openclaw README → orb-bot (optional) → link verification.

**Reusable secret-scan command** (run inside each repo dir before publishing):
```bash
grep -rInE '(api[_-]?key|secret|password|client[_-]?secret|bearer|sk-[A-Za-z0-9]|AKIA[0-9A-Z]{16}|AZURE_|OPENAI_API_KEY|ANTHROPIC_API_KEY|-----BEGIN [A-Z ]+PRIVATE KEY)' \
  --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=dist . ; \
find . -name '.env' -not -path '*/node_modules/*' -not -path '*/.git/*'
```
Any hit must be removed/gitignored (or confirmed already-public, e.g. `cv-tailor`'s `profile.yaml` contact info) before the repo goes public.

- [ ] **K1 - Generate the CV PDF.** In `~/repos/cv-tailor`, generate the AI-automation-engineer CV from `profile.yaml` per that repo's README. Copy the output to the portfolio repo:
  ```bash
  mkdir -p ~/repos/portfolio/public/cv
  cp <cv-tailor-output>.pdf ~/repos/portfolio/public/cv/teodor-lutoiu-cv.pdf
  cd ~/repos/portfolio && git add public/cv/teodor-lutoiu-cv.pdf && git commit -m "assets: add generated CV PDF"
  ```
  `.gitignore` does not exclude PDFs, so this commits normally. Regeneration is manual (re-run cv-tailor, re-copy) - the spec does not bind to a specific PDF version. **This must be committed before the `/wip5/` preview (Section L), or the CV link 404s.**
- [ ] **K2 - Create `tiXor-code/cv-tailor` (public, MIT).** Run the secret scan in `~/repos/cv-tailor`. Add an MIT `LICENSE` and a README (1-paragraph intro matching the projects.ts summary; "How it works": JD + profile → Azure OpenAI → JSON → Jinja → WeasyPrint → PDF; tests section; honesty-guard callout). Then:
  ```bash
  cd ~/repos/cv-tailor && gh repo create tiXor-code/cv-tailor --public --source=. --remote=origin --push
  ```
- [ ] **K3 - Create `tiXor-code/wiki-substrate` (public, MIT).** Assemble **schema + workflow tooling only** into the repo. **Do not commit any `~/wiki/` vault markdown.** Verify with the secret scan plus an explicit check that no vault content is staged. README must credit `@tobilu/qmd` as the underlying BM25+vector+rerank indexer and state the vault is not included. Create + push as in K2 with `tiXor-code/wiki-substrate`.
- [ ] **K4 - Flip `tiXor-code/gepa-prompt-lab` private → public.** Run the secret scan in `~/repos/gepa-prompt-lab` (it is wired to Azure App Service: `Dockerfile`, `Procfile`, `server.py` - watch for Azure connection strings, OpenAI/Anthropic keys, kanban-internal endpoints). Scrub any hits and push the cleanup commit. Add MIT `LICENSE`, reframe README from internal-tool to portfolio framing. Flip visibility:
  ```bash
  cd ~/repos/gepa-prompt-lab && gh repo edit tiXor-code/gepa-prompt-lab --visibility public --accept-visibility-change-consequences
  ```
- [ ] **K5 - Refresh `tiXor-code/openclaw` README.** The repo is not cloned locally (`~/repos/openclaw` missing). Clone, rewrite the README to describe the current Mac mini M4 stack (agent runtime + n8n + Cloudflare Tunnel + trading-bot orchestration), push. No code-visibility change.
  ```bash
  gh repo clone tiXor-code/openclaw ~/repos/openclaw
  # edit README.md, then:
  cd ~/repos/openclaw && git add README.md && git commit -m "docs: refresh README to current stack" && git push
  ```
  (The projects.ts `openclaw` card now links to `github.com/tiXor-code/openclaw`, so this repo must be public and present - confirm it exists/visible during K7.)
- [ ] **K6 - ORB bot (optional, fallback already shipped).** Source is on Teodor's Windows machine; `~/repos/orb-bot` does not exist on this Mac. **Default: ship with `orb-bot` `links: []` (already the state from Task 2).** If the source is transferred in time: create a sanitized repo (strategy doc + backtest framework + sample backtest output; **no IBKR keys, no live-trading hooks, no account numbers** - run the secret scan), `gh repo create tiXor-code/orb-bot --public`, then in a follow-up commit add `{ label: 'GitHub', href: 'https://github.com/tiXor-code/orb-bot' }` to the orb-bot card and update `tests/data/projects.test.ts` accordingly.
- [ ] **K7 - Verify every project GitHub/Site link returns 200.** After K2-K6:
  ```bash
  for u in \
    https://github.com/tiXor-code/icp-agent \
    https://github.com/tiXor-code/instantly-support-agent \
    https://github.com/tiXor-code/cv-tailor \
    https://github.com/tiXor-code/wiki-substrate \
    https://github.com/tiXor-code/gepa-prompt-lab \
    https://github.com/tiXor-code/openclaw \
    https://how-to-get-a-job.com https://ministerucreativ.com ; do
    echo "$(curl -so /dev/null -w '%{http_code}' -L "$u")  $u"; done
  ```
  Expected: 200 for each. (JobMap + Ministeru' use Site links by design; orb-bot intentionally has no link unless K6 completed.)

---

# SECTION L - Preview, acceptance, deploy

- [ ] **L1 - Add the `/wip5/` preview workflow.** Create `.github/workflows/deploy-wip5.yml` (copy of `deploy-wip2.yml`, Node 20, base `/wip5/`):
  ```yaml
  name: Deploy WIP5 to Hostinger
  on:
    push:
      branches:
        - wip5
  jobs:
    build-and-deploy:
      runs-on: ubuntu-latest
      steps:
        - name: Checkout code
          uses: actions/checkout@v4
        - name: Setup Node.js
          uses: actions/setup-node@v4
          with:
            node-version: '20'
        - name: Install dependencies
          run: npm ci
        - name: Build project (base /wip5/)
          run: npm run build
          env:
            VITE_BASE: /wip5/
        - name: Start SSH agent
          uses: webfactory/ssh-agent@v0.5.4
          with:
            ssh-private-key: ${{ secrets.HOSTINGER_KEY }}
        - name: Add Hostinger to known_hosts
          run: |
            mkdir -p ~/.ssh
            ssh-keyscan -p ${{ secrets.HOSTINGER_PORT }} ${{ secrets.HOSTINGER_HOST }} >> ~/.ssh/known_hosts
        - name: Deploy to /wip5/ subdirectory
          run: |
            rsync -avz --delete \
              -e "ssh -p ${{ secrets.HOSTINGER_PORT }}" \
              dist/ \
              ${{ secrets.HOSTINGER_USER }}@${{ secrets.HOSTINGER_HOST }}:/home/${{ secrets.HOSTINGER_USER }}/domains/teodorlutoiu.com/public_html/wip5/
  ```
  Commit on the refresh branch: `git add .github/workflows/deploy-wip5.yml && git commit -m "ci: add /wip5/ preview deploy"`.
- [ ] **L2 - Trigger the preview.** Push the refresh branch's content to the `wip5` branch (the workflow triggers on the `wip5` branch name):
  ```bash
  git push origin refresh/2026-05-29-content:wip5
  ```
  Watch it: `gh run watch` (or `gh run list --workflow=deploy-wip5.yml`). Expected: success.
- [ ] **L3 - Smoke-test the preview.**
  ```bash
  curl -so /dev/null -w '%{http_code}\n' https://teodorlutoiu.com/wip5/
  curl -so /dev/null -w '%{http_code}\n' https://teodorlutoiu.com/wip5/cv/teodor-lutoiu-cv.pdf
  curl -sL https://teodorlutoiu.com/wip5/ | grep -c 'knowsAbout'   # JSON-LD present (note: meta/JSON-LD are in index.html, served at the subpath)
  ```
  Expected: `200`, `200`, `1`.
- [ ] **L4 - Visual/behaviour acceptance (Playwright).** `playwright` is already a dependency. Write a throwaway check script `scripts/acceptance.mjs` (do not commit) that loads `https://teodorlutoiu.com/wip5/` and asserts: 9 project cards render; "Download CV (PDF)" link present and opens the PDF; Journey shows 5 stops with Ministeru' last; Hero stat band reads "09 systems shipped · 02 products" and "Available · ~4 weeks notice"; Nav GitHub link has `aria-label="GitHub"`; the ATS `<dl>` strip is visible; page is sane at viewport 375px (nav doesn't overflow, stat band wraps). Run with `node scripts/acceptance.mjs`. Expected: all assertions pass. (Manual visual confirmation in a browser at 375px and desktop is also acceptable in place of scripting.)
- [ ] **L5 - Lighthouse, no regression.** Capture baseline against current prod (the May 21 build) and compare to the preview:
  ```bash
  npx lighthouse https://teodorlutoiu.com/ --preset=desktop --quiet --chrome-flags="--headless" --output=json --output-path=/tmp/base-desktop.json
  npx lighthouse https://teodorlutoiu.com/wip5/ --preset=desktop --quiet --chrome-flags="--headless" --output=json --output-path=/tmp/wip5-desktop.json
  npx lighthouse https://teodorlutoiu.com/ --quiet --chrome-flags="--headless" --output=json --output-path=/tmp/base-mobile.json
  npx lighthouse https://teodorlutoiu.com/wip5/ --quiet --chrome-flags="--headless" --output=json --output-path=/tmp/wip5-mobile.json
  ```
  Expected: desktop performance ≥ baseline; mobile performance ≥ baseline − 2 pts; LCP/TBT not worse than baseline. If mobile drops more than 2 pts, investigate before merge.
- [ ] **L6 - Final pre-merge gate.** Confirm: `npm run test`, `npm run lint`, `npm run build` all green on the refresh branch (re-run; the `wip5` push didn't change the branch); Section K fully checked; L3-L5 pass.
- [ ] **L7 - Merge to `prod`.** Open a PR and merge, or fast-forward directly (refresh branched off the current `prod` tip):
  ```bash
  gh pr create --base prod --head refresh/2026-05-29-content --title "Portfolio refresh: content + SEO" --body "See docs/superpowers/plans/2026-05-29-portfolio-refresh-plan.md"
  # after review:
  gh pr merge --merge   # or: git push origin refresh/2026-05-29-content:prod  (ff)
  ```
  Pushing to `prod` triggers `deployHost.yml` (rsync to `public_html/`). **Expected side effect (not a bug):** the root `rsync --delete` wipes sibling preview dirs (`/wip/`, `/wip2/`, `/wip3/`, `/wip5/`) - re-push those branches later if you still want them.
- [ ] **L8 - Post-deploy production verification.**
  ```bash
  for u in \
    https://teodorlutoiu.com/ \
    https://teodorlutoiu.com/cv/teodor-lutoiu-cv.pdf \
    https://teodorlutoiu.com/robots.txt \
    https://teodorlutoiu.com/sitemap.xml ; do
    echo "$(curl -so /dev/null -w '%{http_code}' -L "$u")  $u"; done
  curl -sL https://teodorlutoiu.com/ | grep -o '<meta name="description"[^>]*>'
  curl -sL https://teodorlutoiu.com/ | grep -c 'knowsAbout'
  ```
  Expected: `200` for all four URLs; the fetched description contains "TypeScript and Python"; `knowsAbout` count is `1`.
- [ ] **L9 - Rollback (only if L8 fails).** Prod's last-good tip is `90e3a64`:
  ```bash
  git push origin 90e3a64:prod --force-with-lease
  ```
  Wait for `deployHost.yml`, re-run L8 against the rolled-back site. Then debug on a branch.

---

# SECTION M - Risks & watch-items

- **Prod build pins Node 18; Vite 7 wants Node 20.19+.** `deployHost.yml` uses `node-version: '18'`. The May 21 redesign (also Vite 7) deployed via this workflow, so it has worked, but if the prod build fails after L7, bump `deployHost.yml` to `node-version: '20'` and `setup-node@v4`. This touches the deploy workflow (spec lists deploy changes as out-of-scope), so flag it to Teodor before changing.
- **`rsync --delete` at the document root** wipes every sibling subdir on each prod deploy. Expected; not new damage. Do not try to "fix" it in this refresh (out of scope).
- **gepa-prompt-lab secret audit (K4)** may surface Azure connection strings / kanban endpoints that block the public flip until scrubbed. Budget time for it; do not flip public with unresolved hits.
- **ORB source is on Windows (K6).** Default to the `links: []` fallback (already shipped) rather than blocking the refresh on a cross-machine transfer.
- **Vitest/Vite peer compatibility (Task 1).** If `npm install` errors, pin `vitest@^3`. Re-run Task 1 Step 9 to confirm build/lint still pass after any version pin.
- **framer-motion under jsdom.** If component tests throw on `IntersectionObserver`/`matchMedia`, the Task 1 `vitest.setup.ts` mocks are missing or not loaded - confirm `setupFiles` path in `vite.config.ts`.

---

# SECTION N - Self-review (completed by plan author)

**Spec coverage** (every spec section A-J maps to a task):
- A Projects (9 cards, order, copy) → Task 2 (+ openclaw/orb link notes; openclaw repo K5, orb fallback K6)
- B Journey (data + lead + Brussels figure) → Task 3 (data) + Task 8 (lead + figure)
- C Hero (stat band + CV CTA) → Task 5
- D Nav (GitHub icon) → Task 4
- E Contact (4th channel) → Task 6
- F Services (ATS `<dl>`) → Task 7
- G index.html (meta + JSON-LD) → Task 9
- H SEO statics (robots/sitemap) → Task 10
- I CV asset → K1
- J GitHub repo work → K2-K7
- Non-functional (bundle, build, lint) → Task 11; Lighthouse/responsive/preview/prod-verify/rollback → Section L
- Open questions 1-4 (ORB transfer, gepa audit, repo sequencing, CV cadence) → K6, K4, K-ordering, K1 note

**Type consistency:** `Project`/`JourneyStop` interfaces unchanged; new `CHANNELS` type adds optional `newTab?: boolean` used only in Contact's `target` expression; `GitHubIcon` prop `{ className?: string }` matches its single call site. Test imports use relative paths from `tests/` into `src/`.

**Placeholder scan:** every code step contains complete code; every run step has an exact command and expected result; no "TBD"/"similar to"/"add error handling".

**Deliberate deviations** (Section "Decisions") are intentional and test-enforced (BASE_URL CV href; Contact `newTab`; no em/en dashes via assertions in Tasks 2/3/9; visible Hero third span).

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-29-portfolio-refresh-plan.md`. **Do not start coding until Teodor approves this plan** (per the session instruction).

Two execution options once approved:

1. **Subagent-Driven (recommended)** - dispatch a fresh subagent per task, review between tasks, fast iteration. Uses superpowers:subagent-driven-development.
2. **Inline Execution** - execute tasks in this session with checkpoints. Uses superpowers:executing-plans.
