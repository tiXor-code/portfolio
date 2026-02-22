# Portfolio V2 - Design Brief

## Owner
Teodor-Cristian Lutoiu - Game Producer & Developer at EA (FC Ultimate Team)

## Goal
A portfolio that looks like it cost $50,000. Clean, premium, professional. Shows Teodor as both a creative leader and technical builder.

## Design References
- apple.com (typography, whitespace, confidence)
- linear.app (dark UI, smooth animations, developer aesthetic)
- stripe.com (gradients, depth, polish)
- bruno-simon.com (creative but not gimmicky)

## Tech Stack
- React + Vite + TypeScript + Tailwind CSS
- Framer Motion for animations
- No Three.js, no particles, no loading screens
- vite-env.d.ts must exist for import.meta.env types
- Router must use `basename={import.meta.env.BASE_URL}`

## Design System
- **Background:** Near-black (#0A0A0A or similar)
- **Text primary:** White (#FAFAFA)
- **Text secondary:** Gray (#888888)
- **Accent:** Electric blue (#0066FF) or similar - use sparingly
- **Font:** Inter for body, one display font for headings (e.g., Inter with heavy weight, or a premium sans like Satoshi)
- **Base font size:** 16-18px body, headings up to 72-96px
- **Max content width:** 1200px, centered
- **Section padding:** Generous (120-160px vertical)

## Sections (single page, scroll)
1. **Hero** - Full viewport. Name huge (72-96px). One-liner subtitle. Subtle scroll indicator. No buttons, no clutter. Maybe a subtle gradient or grain texture.
2. **About** - Brief bio (3-4 sentences max). Photo optional. Key stats in a minimal grid (years experience, projects shipped, etc.)
3. **Experience** - Timeline or cards. EA, Ubisoft, other roles. Clean, scannable.
4. **Projects** - Full-width cards with hover effects. Each project gets a large image/screenshot area, title, one-line description, tech tags. Click to expand or navigate to detail.
5. **Tech Stack** - Visual grid of tools/technologies. Icons preferred over text lists.
6. **Contact** - Minimal. Email, LinkedIn, GitHub. Maybe a simple contact form. No phone.

## Animation Guidelines
- Scroll-triggered reveals (fade up + slight translate)
- Stagger children elements (50-100ms between items)
- Smooth, eased transitions (0.6-0.8s duration)
- Parallax on hero elements (subtle, 10-20% offset)
- Hover states on all interactive elements
- NO: bouncing, spinning, flashing, or anything that screams "junior dev"

## Content (from existing projects.json + USER.md)
- EA: Assistant Content Producer on FC Ultimate Team
- Previous: Ubisoft, mobile games, Play For Democracy (Brussels/EU Commission)
- Skills: React, Next.js, TypeScript, Figma, Unity, n8n automation, Python
- Education: IT graduate

## Critical Rules
- No diacritics in any text
- No emojis anywhere
- No AI cliches in copy
- No "Lorem ipsum" - all real content
- Mobile-first responsive
- Performance: Lighthouse 90+ on all metrics
- All images must have alt text
- Semantic HTML throughout

## File Structure
Keep it clean:
```
src/
  components/
    Hero.tsx
    About.tsx
    Experience.tsx
    Projects.tsx
    TechStack.tsx
    Contact.tsx
    Navigation.tsx
    Footer.tsx
  data/
    projects.json
    experience.json
  styles/
    globals.css
  App.tsx
  main.tsx
```

## Deploy
- Branch: wip2
- Base path: /wip2/ (via VITE_BASE env var)
- Auto-deploys to teodorlutoiu.com/wip2 on push
