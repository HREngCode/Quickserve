# QuickServe — local dev

Minimal local dev scaffold (Vite) for the QuickServe front-end.

Prereqs: Node.js >= 18 and npm or yarn

Quick start

```bash
npm install
npm run dev
# opens at http://localhost:5173 by default
```

Notes

- The project uses the `@` import alias pointing to the repo root (configured in `vite.config.js`).
- A small in-memory mock of the `quickServeClient` lives at `api/quickServeClient.js` — replace with your real client when available.
- Entrypoint: `index.html` → `src/main.jsx` → `src/App.jsx`

Tailwind tokens & examples
-- The project extends Tailwind with a `brand` color palette and extra spacing tokens.
-- Example usage:

```html
<button class="btn-primary">Add to cart</button>
<div class="text-brand-600">$4.99</div>
<div class="bg-brand-50 p-4 rounded">Card content</div>
<div class="h-72">Tall hero</div>
```

You can also use Tailwind utilities directly: `bg-brand-500`, `text-brand-600`, `h-72`, etc.
