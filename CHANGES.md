# Portfolio Changes - 2026-02-10

## Architecture Note
The app does NOT use Journey.tsx for the live build. It uses individual Screen components in `src/components/screens/`. Journey.tsx exists but is unused.

## Task 1: Play for Democracy image positioning (PlayForDemocracyScreen.tsx)
- Changed `bg-center` to no bg-center class
- Added `backgroundPosition: 'center 70%'` to show Teodor properly
- Verified in production build

## Task 2 & 3: Video backgrounds added to 4 screens
- **UniversityScreen.tsx** → `university-bg.mp4` (513KB, Mixkit #4669, campus/students)
- **UbisoftScreen.tsx** → `ubisoft-bg.mp4` (1.3MB, Mixkit #34559, gaming)
- **EAScreen.tsx** → `ea-bg.mp4` (513KB, Mixkit #43546, soccer/stadium)
- **WhatsNextScreen.tsx** → `ai-bg.mp4` (769KB, Mixkit #34745, tech/abstract)

Each screen now has:
- `<video>` element with autoPlay, muted, loop, playsInline
- Plays only when in viewport (useEffect on inView from react-intersection-observer)
- `bg-overlay` div on top for gradient overlay
- Fallback: if video doesn't load, overlay still renders

Videos compressed with ffmpeg: 1920px wide, 8s loop, CRF 28, no audio, faststart.

## Chapters unchanged (kept existing images)
- Ch2 Play for Democracy: image with center 70% positioning (fix only)
- Ch3 Brussels (BrusselsScreen): eu-parliament-group.jpg
- Ch5 Leadership School (LeadershipSchoolScreen): leadership-school-water.jpg

## Task 4: Deployed
- Built with Vite (npm), base path `/` (Vercel serves at root)
- Deployed: `vercel --prod --force`
- Production: https://portfolio-zeta-mauve-97.vercel.app
- All 4 video files confirmed accessible via HTTP 200
- JS bundle confirmed containing all 4 video references
