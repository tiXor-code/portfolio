# Portfolio Changes - 2026-02-10

## Journey Section - Background Images

### Added background images to all chapters:
1. **Chapter 1 "University"** - Added `university-worcester.jpg` (Unsplash campus image, 1920x1257)
2. **Chapter 4 "Ubisoft"** - Added `rainbow-six-siege.jpg` (Unsplash gaming/esports image, 1920x1280)  
3. **Chapter 6 "EA"** - Added `ea-fc.jpg` (Unsplash football stadium image, 1920x1280)
4. **Chapter 7 "What's Next"** - Added `ai-future.jpg` (Unsplash AI/futuristic image, 1920x1080)

All images use `from-black/70 via-black/50 to-black/70` gradient overlay for text readability.

### Fixed Play for Democracy image positioning:
- Changed background-position from `center` to `center 70%` to show more of the lower part of the image where Teodor appears
- Added `imagePosition` property to the JourneyChapter interface for per-chapter positioning control

### Technical:
- Added `imagePosition?: string` to JourneyChapter interface
- Background div now uses `style.backgroundPosition` from chapter data (defaults to 'center')
- Images sourced from Unsplash (free/public domain)
- Deployed via GitHub Actions auto-deploy on push to `wip2` branch → rsync to Hostinger
