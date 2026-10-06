# Share the static Astro lab

This project needs static hosting only. It does not need Render's Node web service, SQLite, or Neon.

## Simplest Render setup

1. Push the project source to a GitHub repository.
2. In Render choose **New → Static Site** and connect the repository.
3. Set Root Directory to the folder containing `package.json` (for example `astro-feature-lab` if you pushed its enclosing folder).
4. Build command: `npm ci && npm run build`.
5. Publish directory: `dist`.
6. Set `NODE_VERSION` to `24.19.0` if needed for the build.
7. Deploy and open the public HTTPS URL.

The deployed pages are static files; there is no application database or running Node server to sleep. Build/hosting plan limits still apply.

## GitHub Pages

Build for the repository subpath before publishing:

```bash
ASTRO_SITE=https://YOUR_USERNAME.github.io ASTRO_BASE=/YOUR_REPOSITORY npm run build
```

For this repository, `site` and `base` are already configured in `astro.config.mjs`. After enabling GitHub Pages with **Deploy from a branch** and selecting `gh-pages` / `/ (root)`, publish with:

```bash
npm run deploy
```

This runs the build and publishes `dist/` to the `gh-pages` branch, including `.nojekyll`. Run it from a checkout with permission to push to the repository. Alternatively, replace both placeholders above and publish the contents of `dist/` using another Pages workflow. Keep the source and package files on `main`.

For a username site (`YOUR_USERNAME.github.io` repository) or root custom domain, omit `ASTRO_BASE`; it defaults to `/`.

## Verify the built site locally

```bash
npm ci
npm test
npm run build
npm run preview
```

Open http://localhost:4321. Check the 1–1,000 seat range, the saved preference after refresh, keyboard focus, the native FAQ, and a narrow/mobile layout. Disable JavaScript and verify the story remains readable and the default estimate is visible.
