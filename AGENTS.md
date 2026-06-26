# AGENTS.md

## Cursor Cloud specific instructions

BotWeb is a single-product **Next.js 14 (App Router) + TypeScript** marketing site (one public landing page at `/` with a contact form). There is no backend, database, or internal API — the only external integration is a client-side `fetch` POST to a hosted **Formspree** endpoint.

Standard commands live in `package.json` (`dev`, `build`, `start`, `lint`); run them with `npm`.

- Dev server: `npm run dev` → http://localhost:3000.
- Lint: `npm run lint`. Build: `npm run build`.

### Contact form / Formspree (non-obvious)
- The contact form reads `NEXT_PUBLIC_FORMSPREE_URL` at build/runtime via `process.env`. Because it is a `NEXT_PUBLIC_*` var, it is inlined into the client bundle, so **changing it requires restarting `npm run dev`** (hot reload alone does not always pick up env changes).
- If `NEXT_PUBLIC_FORMSPREE_URL` is unset, the form degrades gracefully: submitting shows an "email us directly" error and the rest of the site works. So the env var is OPTIONAL for running/most testing.
- To exercise the full submit → "Thanks — we got your request." success flow without a real Formspree account, point `NEXT_PUBLIC_FORMSPREE_URL` (in a gitignored `.env.local`) at a tiny local mock HTTP server that returns `200 {"ok":true}` with permissive CORS headers, then restart the dev server.
