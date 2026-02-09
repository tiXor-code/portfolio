# Journey Section - Design & Content Brief

## Concept
Replace the standard "Experience" section with a visual narrative scroll called "The Journey" (or similar). Each milestone alternates photo left/right, with scroll-triggered reveals. Editorial magazine feel.

## Photos Available (in public/images/journey/)
- `play-for-democracy-banner.jpg` - Teodor at Play For Democracy event, blazer, professional
- `eu-parliament-group.jpg` - Group photo at European Parliament, "Use Your Vote" banner
- `brussels-street.jpg` - Teodor in Brussels streets, "Together For Democracy" hoodie, Grand Place behind
- `leadership-school-laughing.jpg` - Candid laughing with friends at Leaders event, outdoors
- `leadership-school-group.jpg` - Full group photo at Leaders Foundation, purple branding
- `leadership-school-speaking.jpg` - Teodor speaking/being interviewed outdoors, lanyard with name
- `leadership-school-water.jpg` - Teodor in water doing rescue exercise, intense moment

## Milestones (chronological order)

### 1. University
- BSc in Computer Games, Design and Development
- The starting point - where the interest in games became a career path
- NO PHOTO YET - use a subtle placeholder or skip image for this one

### 2. Play For Democracy
- **Role:** Producer & Game Designer
- **What:** Part of an EU-funded project (Erasmus+). Worked with 7 other students/graduates to develop one of two games aimed at increasing voter turnout among Gen Z
- **Partners visible in banner:** Arden University, Republica Funky, Amber, RGDA, MMC
- **Photos:** play-for-democracy-banner.jpg (professional, at the event)
- **Tone:** "My first real production role. Not in a studio - in a project that actually mattered."

### 3. Brussels / European Parliament
- **What:** Selected to represent the Play For Democracy project at the Leadership Academy in Brussels. The European Parliament convened young people from European countries to share ideas about increasing voter engagement ahead of the June 2024 elections
- **Photos:** eu-parliament-group.jpg, brussels-street.jpg
- **Tone:** "Got invited to Brussels to present our work to the European Parliament. Stood in rooms where policy gets made and talked about why games can change civic engagement."

### 4. Ubisoft
- **Role:** QA Tester on Rainbow Six Siege
- **What:** Started during Play For Democracy. First industry job at a major studio.
- **NO PHOTO** - use text-only or subtle icon
- **Tone:** "My foot in the door. I started by breaking games professionally."

### 5. The Leadership School
- **What:** Intensive week-long leadership program by Leaders Foundation Romania
- **Photos:** leadership-school-laughing.jpg, leadership-school-speaking.jpg, leadership-school-group.jpg, leadership-school-water.jpg
- **Tone:** "An intense week that pushed me out of every comfort zone I had. Including, apparently, into a river."

### 6. EA - Electronic Arts
- **Role:** Assistant Content Producer on EA FC (Ultimate Team)
- **What:** Current role. Shipping features to millions of players worldwide.
- **NO PHOTO** - use text/icon or EA logo treatment
- **Tone:** "Now I ship to millions. Every update, every feature - real players, real scale."

### 7. AI & What's Next
- **What:** Exploring AI, building prototypes, pushing into automation and new tech
- **NO PHOTO** - use abstract/forward-looking design element
- **Tone:** "Building things that didn't exist yesterday. That's where it gets interesting."

## Design Rules
- Photos should be large (at least 50% of section width on desktop)
- Alternate layout: photo left/text right, then photo right/text left
- Scroll-triggered fade-in + slight parallax on photos
- Staggered text reveals (heading first, then body, then tags/details)
- Timeline connector line running vertically between milestones
- Mobile: stack vertically, photo on top, text below
- Use the existing dark theme (#0A0A0A bg, #FAFAFA text, #0066FF accent)
- Keep the rest of the site sections (Hero, About, Projects, Tech Stack, Contact) but replace Experience with Journey
- No diacritics, no emojis in any text

## Technical
- Images referenced as `/wip2/images/journey/filename.jpg` in dev (via base path)
- Or use `import.meta.env.BASE_URL + 'images/journey/filename.jpg'`
- Optimize images: they're already reasonable size (170-315KB each)
- Add loading="lazy" to all journey images
- Alt text on every image
