# Build an Astro feature boundary

A real Astro + React companion to the Next.js task workspace lab. This is a product-style landing page with a small calculator and a saved-reading feature. The point is to see how a mostly readable document can contain independent browser features.

## Run it in VS Code / WSL

Install Node.js 24, extract the ZIP, and open a terminal in `astro-feature-lab`:

```bash
npm ci
code .
npm run dev
```

Open http://localhost:4321. No database, account, API key, or environment setup is needed.

```bash
npm test
npm run build
npm run preview
```

`npm run build` checks Astro/TypeScript and generates a static `dist/` directory. `npm run preview` serves those built files locally.

## The example

- Product story, layout, navigation, and FAQ are Astro-rendered HTML and CSS.
- `PricingCalculator.tsx` receives a $20 monthly seat price. It validates whole-number seats from 1 to 1,000 and computes an illustrative estimate. It hydrates with `client:load`.
- `SavedReading.tsx` owns one browser-local saved preference and storage feedback. It hydrates with `client:visible` when it enters the viewport.
- Neither island mounts the whole page or shares a React provider with the other. They use the same React runtime, which Astro can bundle as a shared dependency.
- The native `<details>` FAQ opens without React or JavaScript.
- Controls are initially disabled until their island has hydrated. HTML remains readable without JavaScript; a static estimate is visible and the pricing section includes a noscript explanation.

## Guided build with the learner — about 25 minutes

Keep the page and editor side by side. Ask the learner to predict an outcome, perform the change, then explain the code that caused it.

### 1. Start with the document

Read `src/pages/index.astro`. Its frontmatter runs at build time for this static site. Find the story, feature cards, and native FAQ.

Disable JavaScript in browser developer tools and reload. Read the product copy and open a FAQ. Notice that the calculator's default estimate remains readable, while controls are disabled.

**Learner change:** Add a fourth product benefit without adding a React component. Rebuild and find its text in `dist/index.html`.

**Check:** Does any of that content need browser state? What would hydration add here?

### 2. Draw the calculator boundary

Find this import and invocation in `index.astro`:

```astro
<PricingCalculator monthlyRate={monthlyRate} client:load />
```

Open `PricingCalculator.tsx`. Follow `seats` → `estimate()` → output. The feature owns its input, validation, and copy feedback; the product story remains outside it. `monthlyRate` is serializable public feature data, not a secret or an authoritative checkout price.

**Learner change:** Change the build-time seat price to 30. Try 25 seats and verify $750. Test 0, 1.5, and 1001. Each must display useful feedback.

**Check:** Why does this feature need JavaScript? Why doesn't the surrounding story need the same React tree?

### 3. Choose when another feature wakes

Find:

```astro
<SavedReading articleId="feature-boundary" client:visible />
```

Reload at the top and scroll to the field note. The second island activates when visible. In DevTools Network, filter for JS and compare loading near the top and after scrolling. The save component can load separately even though its React dependency may already be present for the calculator. Browser caching can affect what you see; use Disable cache when comparing.

**Learner change:** Temporarily replace `client:visible` with `client:load`. Explain the loading-priority change, then restore it.

**Check:** What experience needs immediate interaction? What can wait until the reader reaches it?

### 4. Decide what survives

Save the field note. Refresh. That preference survives in localStorage on this browser. Change the calculator to 25 seats, then refresh. It returns to the default 10 seats because this transient feature input is not persisted.

**Learner change:** Make the calculator use a `seats` URL parameter. Read it only after hydration, validate it, and preserve the existing hash when updating the URL. Test copying the URL into a new tab.

**Check:** Which state travels with a link? Which belongs to a device? Which would require an account and durable server storage?

### 5. Keep the features independent

Move between the calculator and save control. One feature's state never modifies the other. Now imagine adding a task board with shared filters, selection, optimistic edits, authorization, and conflict recovery—the Next.js companion's connected workflow.

**Learner challenge:** Add a yearly-cost toggle *inside* the calculator island. Keep the story and saved-reading component unchanged.

**Check:** If features constantly need each other's state, would one larger interactive island be clearer? Astro can use shared stores and larger islands; independence is a design choice, not an inability to coordinate state.

## Where to read the code

| File | Responsibility |
| --- | --- |
| `src/pages/index.astro` | Static document, public build-time props, hydration choices |
| `src/components/PricingCalculator.tsx` | One React feature: input, estimate, validation, feedback |
| `src/components/SavedReading.tsx` | Separate React feature: browser-local saved preference |
| `src/lib/pricing.ts` | Whole-number seat validation and illustrative math |
| `src/styles/global.css` | Responsive layout, island styling, keyboard focus, reduced-motion support |
| `astro.config.mjs` | Static output, React integration, optional site/base settings |
| `DEPLOY.md` | Public static hosting with Render or GitHub Pages |

## The boundary compared with Next.js

| Concern | This Astro lab | Next.js workspace lab |
| --- | --- | --- |
| Primary experience | Read a product story, use a few tools | Coordinate a task workflow |
| Browser state | Each island owns its own feature | Board, filters, selection, details, pending writes |
| Persistence | One browser-local preference | Server tasks and sessions, plus browser drafts |
| Server writes | None | Authenticated, authorized, version-checked mutations |
| Hosting | Static files | Node.js server |

These are example architecture choices. Astro can render on the server and host larger coordinated client features. Next.js can also produce content-driven pages and static exports for compatible routes. The lesson is to fit the boundary to the work, rather than assign absolute capabilities to either framework.

## Deliberate limitations

This is an estimate, not billing or checkout. Client-side prices and validation can be altered by the visitor; a real purchase needs server-side verification. “Saved reading” is not cross-device or multi-user data. Islands here do not require a shared state store. Clipboard access may be unavailable on insecure origins; the app explains how to copy manually.

## Primary references

- https://docs.astro.build/en/concepts/islands/
- https://docs.astro.build/en/reference/directives-reference/#client-directives
- https://docs.astro.build/en/guides/integrations-guide/react/
