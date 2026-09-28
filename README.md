# teodorlutoiu.com

The portfolio of Teodor-Cristian Lutoiu, AI engineer in Bucharest.

One static page that alternates between two looks: a loud poster (hot pink, giant type, HELLO! with my face as the O) and a hand-made scrapbook (index cards, sticky notes, polaroids). Every project is named by what it does for the reader, with the internal name on a small tag.

## Stack

- Vite + TypeScript, no framework and no runtime dependencies
- `index.html` holds the markup, `src/style.css` the styles, `src/main.ts` the interactions (card wall, count-up numbers, the story line, notes, copy button)
- Photos in `public/img/`, social preview image at `public/og.jpg`
- Deployed on Vercel; security headers live in `vercel.json`

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # type-check, then build to dist/
```

## Also served from this repo

- `api/rmm-clip.js`: a small video proxy for the Retro Many Money social accounts
- `public/retromanymoney/`: that project's privacy and terms pages, plus platform verification files
- `public/robots.txt` and `public/sitemap.xml`, maintained by hand
