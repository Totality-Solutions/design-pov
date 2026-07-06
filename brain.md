# Brain — Gallery Page Requirements

## Page Structure
- `app/(marketing)/gallery/page.tsx` composes components only, no business logic
- All components live in `components/gallery/`
- Types in `types.ts`, data in `galleryData.ts`

## Loading Experience
- Show loading skeleton when Gallery Page opens
- After 2–2.5 seconds, smooth transition (fade) to Gallery Page
- Loading screen should render in normal page flow (below the Navbar), not fixed/overlaying
- Use AnimatePresence

## Header (Default State)
- Black bar with "Gallery" text + icon from `/icon/gallery.svg` (just reference path)
- Plus icon (Lucide) on the right
- Filter tabs below: All, Core, Brand, Partners, Circle, Objects, Artist
- Active tab has black bottom border, inactive tabs at 50% opacity
- Header should be sticky

## Header (Selected Image State)
- Gallery icon only (no "Gallery" text)
- Then "Project name" text with semi-transparent background, separated by border-left
- At end of "Project name": close button — rotated 42° diagonal line (42x42 circle, line width 19.77px, height 1px, outline 2px white)
- Plus icon on the far right
- No back arrow icon — use the rotated diagonal line as the close button

## Gallery Grid
- True masonry/Pinterest layout using CSS Columns (`columns-1 sm:columns-2 lg:columns-3 xl:columns-4`)
- NOT a fixed CSS Grid — no same-height rows, no reserved vertical space
- Images automatically flow upward, no empty gaps beneath shorter cards
- Every image positioned in the shortest available column
- Dense and compact regardless of image dimensions
- Responsive: 4 cols desktop, 3 laptop, 2 tablet, 1 mobile
- Card width fixed by column, height determined by image aspect ratio

## Cards
- Render via `galleryData.map()`
- Use `next/image` with `loading="lazy"`, `object-fit: cover`, rounded corners
- Smooth hover animation: lift up slightly (translateY negative)
- Click handler to open featured/expanded view
- Each card has image, title, three-dot kebab menu

## Featured/Expanded View
- Clicking a card opens it as a featured card
- Featured card takes ~70% width of the container
- Right ~30% should be filled with related images from the same category
- Below featured card: remaining items in masonry columns layout
- No empty spaces in the layout
- Tabs should NOT switch when an image is clicked — stay on user's selected tab
- Displayed items below the featured card are from the currently active tab
- Sidebar/related items are from the selected item's category

## Category Tabs
- Tabs never switch automatically when clicking an image
- Tabs only change when the user clicks a different tab
- Tab changes filter the items below the featured card

## Back/Close
- Clicking the rotated diagonal line close button closes the featured view
- Returns to the default gallery state (no featured card)

## Styling
- Use Tailwind CSS (project convention)
- CSS Modules are NOT used in this project

## Images
- Use `next/image` always — never `<img>` tags
- Every image must include width, height, alt
- Images from placehold.co for demo
