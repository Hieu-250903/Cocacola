# CLAUDE.md

Guidelines and commands for working with the Coca-Cola Landing Page application.

## Build and Development Commands

*   **Start development server**: `npm run dev` (runs Vite dev server on local port)
*   **Build production bundle**: `npm run build` (compiles TypeScript and builds production assets via Vite)
*   **Preview production build**: `npm run preview` (previews locally built production assets)

## Coding Conventions

### React & TypeScript
*   Use TypeScript for all components and utilities. Define clear interfaces/types for props.
*   Prefer functional components with hooks (`useState`, `useEffect`, custom hooks).
*   Use React 19 standard APIs.
*   File structure:
    *   Components in `src/components/` grouped by feature/concern (e.g. `common/`, `layout/`).
    *   Pages in `src/pages/` under named folders (e.g. `Home/index.tsx`, `Discover/index.tsx`, `Brands/index.tsx`).
    *   Styles in `src/styles/` or colocated as CSS modules/vanilla CSS files (e.g., `ScrollCokeBottle.css` next to `ScrollCokeBottle.tsx`).
*   Exports: Use named exports or default exports consistently based on the folder structure (e.g. default export for page index files, named exports for common components).

### CSS & Styling
*   Use Vanilla CSS for custom components. Avoid utility classes (like Tailwind) unless explicitly requested.
*   Organize selectors clean and nested where appropriate, utilizing modern CSS features (custom properties, flexbox/grid, CSS animations, scroll-driven animations).
*   Follow clean UI design aesthetics: smooth transitions, custom scroll effects, Coca-Cola brand colors (Red `#E60012` or variations, dark modes, modern typography).

### State & Routing
*   Use `react-router-dom` for routing.
*   Manage state locally via React hooks or via a global store (`src/store/`) if state needs sharing across pages.
