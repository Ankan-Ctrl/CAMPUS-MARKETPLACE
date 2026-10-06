# Campus Marketplace

A student buy/sell marketplace. This is the frontend only, built against mock
data — see "Adding a backend later" below for where that plugs in.

## Stack

- React 18 + Vite
- React Router (`HashRouter`, so routing works with no server / as a static file)
- Tailwind CSS, themed to the existing design system (see `tailwind.config.js`)
- lucide-react for icons

## Getting started

```bash
npm install
npm run dev       # local dev server with hot reload
npm run build      # production build -> dist/
npm run preview    # serve the production build locally
```

## Project structure

```
src/
  data/mockData.js       All mock content: products, categories, conditions,
                          departments, hostel/meeting locations, conversations,
                          purchases, and the current mock user. This is the
                          file to replace with real API calls.
  context/AppContext.jsx  Global state: auth, listings CRUD, wishlist,
                          messages, purchases, toasts. Components call
                          useApp() and never touch mockData.js directly —
                          so swapping this context's internals for real
                          fetch()/API calls shouldn't require touching
                          any component.
  components/            Shared UI, organized by domain (layout, product,
                          home, browse, messages, profile, ui).
  pages/                  One file per route.
  App.jsx                 Route table.
```

## Adding a backend later

Everything currently reads/writes through `AppContext`. To wire in a real
API:

1. Replace the mock arrays in `mockData.js` with fetch calls (or move the
   fetching into `AppContext` directly).
2. The action functions in `AppContext` (`addProduct`, `updateProduct`,
   `deleteProduct`, `markAsSold`, `toggleWishlist`, `sendMessage`, `login`,
   `register`) are the seams — turn each into an API call, keep the same
   function signature, and no page or component needs to change.
3. `isAuthenticated` currently defaults to `true` with no real check —
   this is where a real session/token check goes once auth exists.
4. The Sell form's image upload uses `URL.createObjectURL` for instant
   local preview (no server). Swapping in real uploads means posting the
   files and using the returned URLs instead.

## Notes

- Product photos are placeholder icon-on-tint art (no stock photography),
  matching the anti-slop direction from the original design brief. Any
  listing that gets real uploaded photos (via the Sell form) shows those
  instead automatically.
- The hero background video is the approved background asset, compressed
  to a muted ~860KB web-sized loop.
