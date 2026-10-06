Merge notes: ZIP <-> working-folder merge

Summary of changes:

- Integrated UI/UX components from the ZIP into the working folder while preserving production-ready code patterns.

Changed files and highlights:
- src/components/layout/MainLayout.jsx
  - Added ClickSpark and HelpButton wrappers to preserve extra UI effects and help affordance.

- src/components/motion/MotionLink.jsx
  - Updated to use motion(Link) and motion(NavLink) (newer Framer Motion API).

- src/context/AppContext.jsx
  - Kept the working-folder API-backed implementation (api.*) for production-ready boundaries.

- src/lib/motion.js
  - Merged animation spec: adopted ZIP's button hover scale while keeping existing timings.

- src/main.jsx
  - Preserved working-folder HashRouter with future props for router compatibility.

- src/pages/Home.jsx
  - Restored CampusGallery component to enrich the Home UI.

- src/pages/MyListings.jsx
  - Wrapped action buttons in IconTooltip (tooltips) while preserving motion button behavior.

- src/pages/ProductDetails.jsx
  - Added Carousel usage when multiple images are present; falls back to ImageGallery.

- src/pages/Sell.jsx
  - Restored BubbleButton publish UI and loader; added publishing UX state and delay to show feedback.

- tailwind.config.js
  - Added danger color token (danger: '#A8412E').

Notes:
- Merge strategy: where ZIP had additional UI/UX components they were merged into the working copy. Where the working folder had production-ready patterns (API calls, router features), those were preserved.
- Please run a local build (npm ci && npm run build) and test the app in preview mode (npm run preview) after pulling the branch.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>

Auto-deploy test triggered by Copilot CLI at 2026-09-12T12:12:57.3643443+05:30

