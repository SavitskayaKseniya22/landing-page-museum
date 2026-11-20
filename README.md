# [Museum](https://landing-page-museum.netlify.app/)

Landing page of the Louvre, one of the largest and most popular art museums in the world.

## Features

- Masonry gallery
- Burger menu
- Custom video player with playback, volume, fullscreen controls, and a playlist carousel
- Ticket booking and virtual tour dialogs with standalone pages for direct links
- Demo ticket booking form with validation and ticket price calculation
- Parallax effect
- 360° virtual tours
- Image explore slider
- Responsive layout

The ticket form is a frontend demo: it does not create reservations or process payments.

## Tech Stack

- React 19
- TypeScript 6
- Vite 8
- React Router
- Sass / CSS Modules
- ESLint
- Stylelint
- Prettier
- React Hook Form
- Redux Toolkit
- Fontsource (locally bundled Roboto and Forum fonts)

The project follows Feature-Sliced Design: `app`, `pages`, `widgets`, `features`, `entities`, and `shared`.
The `@/` alias points to `src/`. Cross-slice imports use public `index.ts` APIs, with layer boundaries checked by ESLint.
Styles use BEM naming; shared typography is defined in `src/shared/styles/globals.scss`.

## How to use

Use Node.js 24.15 or newer within the 24.x release line (see `.nvmrc` and `package.json`).

1. Clone the repo

```bash
git clone https://github.com/SavitskayaKseniya22/museum.git
```

2. Change directory

```bash
cd museum
```

3. Install dependencies

```bash
npm ci
```

4. Start the dev server

```bash
npm run dev
```

Run `npm run check` to check formatting, ESLint rules, SCSS styles, TypeScript types, and the production build.
Use `npm run format` to format files and `npm run lint:styles:fix` to fix SCSS issues and sort style declarations with RECESS ordering.

To build and preview the site locally:

```bash
npm run build
npm run preview
```

The production build is generated in `dist/`. `npm start` also runs the local preview and requires a build first.

React Router handles `/`, `/order`, and `/map/:name`. Opening an order or tour from the homepage shows a dialog;
opening its URL directly shows a standalone page. Unknown routes show a client-side not-found page.

Static hosting requires an SPA fallback to `index.html` so direct links and page reloads work.
The repository also includes a Vercel configuration in `vercel.json`.

### Screenshots

![Museum landing page](https://raw.githubusercontent.com/SavitskayaKseniya22/projects-photos/main/photos/museum/screenshots/museum-1280px.png)
