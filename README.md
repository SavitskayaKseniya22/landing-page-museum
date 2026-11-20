# Museum

React landing page for the Louvre with a masonry gallery, video player, virtual tours, and a demo ticket form.

## Stack

React 19, TypeScript 6, Vite 8, React Router, Redux Toolkit, React Hook Form, Sass, ESLint, Stylelint, and Prettier.
Roboto and Forum are bundled locally through Fontsource. No Next.js runtime or Google Fonts build request is required.

## Development

Use Node.js 24 LTS (`.nvmrc`), then run:

```bash
npm ci
npm run dev
```

```bash
npm run check
npm run build
npm run preview
```

`check` runs Prettier, ESLint (including FSD import rules), Stylelint, TypeScript, and the production build.
`npm start` is an alias for Vite preview, intended for checking the built site locally.
Build output is generated in `dist/`.

Use `npm run format` for formatting, `npm run lint:styles` for SCSS checks,
and `npm run lint:styles:fix` for fixes and RECESS property sorting.

## Feature-Sliced Design

```text
src/
  app/       # Entry point, router, providers, Redux store setup
  pages/     # Home, order, tour, and not-found pages
  widgets/   # Composed homepage sections and footer
  features/  # Select tickets, book tickets, view tour
  entities/  # Ticket selection state, pricing, counters, tour data
  shared/    # UI components, generic helpers, styles
```

Dependencies point down: `app -> pages -> widgets -> features -> entities -> shared`.
Slices on the same layer do not import each other. Cross-slice imports use public `index.ts` APIs.
Inside a slice, imports are relative. The `@/` alias points to `src/`.
ESLint enforces layer direction, slice isolation, and public APIs for pages, widgets, features, and entities.

- Ticket state, quantities, prices, and types belong to `entities/ticket`.
- Tour records and lookup belong to `entities/tour`.
- Booking form fields and validation belong to `features/book-tickets`.
- Redux initialization belongs to `app/providers`; features do not import application infrastructure.
- Component styles stay beside their components as `Component.module.scss`.
- CSS follows BEM: `block__element--modifier`, with kebab-case names.

## Navigation and deployment

React Router handles `/`, `/order`, and `/map/:name`.
Links from the homepage open orders and tours as dialogs over the existing page.
Direct links and full-page reloads show a standalone detail page.
Missing tours and unknown routes show the client-side not-found page.

Deploy `dist/` to a static host with an SPA fallback to `index.html` for application routes.
`vercel.json` includes this rewrite for Vercel. On another host, configure the equivalent fallback.
A client-side not-found page does not set an HTTP 404 status; that requires hosting/server routing support.
Images and video are served directly from `public/`, without a server-side image optimizer.
The booking form is a frontend demo: it does not create reservations or process payments.

## Maintenance notes

[Maintenance audit](MAINTENANCE.md) and [code review](CODE_REVIEW.md) record earlier cleanup work.
The current architecture and commands are documented above.
