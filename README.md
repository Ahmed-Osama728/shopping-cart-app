# Shopping Cart App

A polished shopping experience for browsing, searching, and purchasing modern lifestyle products. The UI is built with Mantine and Tailwind utility classes, leverages React Query for async data flows, and uses Zustand for a lightweight in-memory cart. Code-splitting, infinite scrolling, and reserved media space keep the experience snappy and stable.

> Explore the live experience locally by running the dev server, then visit `http://localhost:5173`.

---

## Features
- **Product discovery at scale** – paginated catalog backed by `@tanstack/react-query` with on-demand fetching, infinite scroll, and cached responses.
- **Instant search** – debounced search results (`useSearch`) provide quick filtering without reloading or leaving the page.
- **Rich product pages** – detailed view with ratings, category badges, price highlights, and stock alerts.
- **Persistent cart UX** – global cart state handled by Zustand: quantity editing, total calculations, and checkout feedback notifications.
- **Responsive Mantine layout** – AppShell navigation with route-aware highlighting, cart badge counts, and light/dark theme toggle.

---

## Tech Stack
- **Runtime:** React 19 + TypeScript, Vite 7
- **UI:** Mantine Core & Notifications, Tailwind utility classes
- **State & Data:** Zustand cart store, React Query (infinite + single queries)
- **Routing:** React Router v7 with suspenseful lazy routes
- **Icons & Mock data:** Tabler Icons, Faker-powered catalog generator

---

## Project Structure
```
src/
├── components/         # UI pieces (cards, cart item, layout, loaders)
├── features/
│   ├── cart/           # Cart screen (list, totals, checkout modal)
│   └── products/       # Product listing & detail pages
├── hooks/              # Data hooks (React Query) and search helpers
├── stores/             # Zustand cart state
├── contexts/           # Theme provider and color scheme toggling
├── utils/fakeData.ts   # Faker-powered product generator used by hooks
└── api/                # Query keys and product fetch helpers
```

---

## Getting Started
### Prerequisites
- Node.js 18+ (tested with npm)
- npm (bundled with Node)

### Installation
```bash
npm install
```

### Development server
```bash
npm run dev
# open http://localhost:5173
```

### Production build
```bash
npm run build
npm run preview 
```

### Linting
```bash
npm run lint
```