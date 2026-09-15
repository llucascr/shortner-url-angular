# Frontend Agent Notes

## Project And Design

- Read `PROJECT.md` for product context: this Angular URL shortener will consume an already-built Spring Boot API; its visual reference is Supabase Sage on https://21st.dev/.
- Whenever components, colors, templates, or other UI references are needed, delegate research on https://21st.dev/ to an agent before implementation. Ask for source links, adapt examples to Angular/Tailwind v4, and report unavailable references rather than inventing them.

## Commands

- Run commands from `frontend/`; this directory is the Angular workspace, not the repository root.
- Use npm (`packageManager: npm@11.19.0`) and `npm ci`. The locked Angular tooling requires Node `^22.22.3 || ^24.15.0 || >=26.0.0`.
- `npm start` serves the development configuration; `npm run build` builds production, including Angular template compilation and bundle budgets.
- `npm test -- --watch=false` runs the suite once. For one file: `npm test -- --watch=false --include=src/app/app.spec.ts`. Add `--filter='test name'` to select tests by name.
- Tests use `@angular/build:unit-test` with Vitest and jsdom, not Karma. Use the Angular CLI wrapper rather than invoking Vitest directly; it builds Angular code and initializes TestBed.
- No lint, standalone typecheck, or E2E target is configured. The README's `ng e2e` example is boilerplate, not a working project command.
- Formatting has no npm script: use `npx prettier --check <files>` or `npx prettier --write <files>`. `.prettierrc` selects single quotes, width 100, and the Angular parser for HTML.

## Wiring And Constraints

- `src/main.ts` bootstraps standalone `App` with providers from `src/app/app.config.ts`; there is no root NgModule. Component tests import components into TestBed rather than declaring them.
- Router providers exist, but `app.routes.ts` is empty and `app.html` currently renders only the header, with no router outlet. Adding routes alone will not display routed pages.
- Tailwind v4 is wired through `@tailwindcss/postcss` in `.postcssrc.json` and `@import 'tailwindcss'` in `src/styles.css`; do not assume a Tailwind v3 configuration.
- Static assets are copied from `public/`, not `src/assets/`.
- Production budgets in `angular.json`: initial bundle warns at 500 kB and errors at 1 MB; each component stylesheet warns at 4 kB and errors at 8 kB.

## Existing Test Caveat

- `src/app/app.spec.ts` still expects an `h1` containing `Hello, shortner-url-angular`, but the current UI no longer renders it. The baseline suite has one failure (`should render title`); do not restore the starter UI merely to satisfy this stale assertion.
