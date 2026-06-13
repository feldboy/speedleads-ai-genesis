# HANDOFF — Lovable SEO/AI-search scan fixes (2026-06-13 19:58, session bac4c4d2)

Branch: `feature/fable5-kinetic-redesign`. Goal: clear every code-fixable finding from Lovable's "SEO & AI search review" before publish. Production domain confirmed by owner: **https://www.speedleads-ai.com** (Lovable's domain-mismatch warnings are only because it scanned the `.lovable.app` preview — keep the real domain everywhere). Per-route meta uses **react-helmet-async** (owner-approved).

## Status: COMPLETE & VERIFIED — NOT committed yet
All work is in the working tree. Owner was asked "want me to commit?" — **commit only on request** (CLAUDE.md: conventional commits, branch only, never main, ask before merge).

## Done this session
1. **Single H1 / a11y** — `src/components/sections/About3.tsx`: h1→h2. `Header.tsx`: mobile menu button `aria-label` (פתח/סגור תפריט) + `aria-expanded`; descriptive logo `alt`. `Footer.tsx`: `aria-label` on 4 social links (פייסבוק/X (טוויטר)/אינסטגרם/לינקדאין), descriptive logo `alt`, + new guide link (`footer_link_ai_agents_guide`).
2. **Per-route meta** — added dep `react-helmet-async`; `src/App.tsx` wrapped in `<HelmetProvider>`; new `src/components/Seo.tsx` (title/description/canonical/OG/Twitter + optional jsonLd + noindex). `<Seo>` added to: `Index.tsx` (/), all `legal/*.tsx`, `NotFound.tsx` (noindex), `admin/AdminLayout.tsx` + `admin/AdminLogin.tsx` (noindex).
3. **CRITICAL fix** — removed route-variable SEO tags from `index.html` (description, robots, canonical, og:title/description/url/image, twitter:title/description/image). They were static-only and caused DUPLICATE/conflicting canonical+description+og:url once Helmet ran. Helmet is now the single source; only invariant tags remain (title fallback, author, theme-color, og:type/site_name/locale, twitter:card/site). A comment in index.html explains this.
4. **sitemap/robots** — `public/sitemap.xml`: added /guide/ai-agents (0.7), /privacy /terms /cookies /accessibility (0.4). `public/robots.txt`: added `Disallow: /admin`. Kept production domain.
5. **`public/llms.txt`** — new, llmstxt.org convention (He+En summary, services, pages, contact).
6. **FAQ schema** — `FAQPage` JSON-LD (5 Q&As) added to `@graph` in `index.html`; comment notes it mirrors `src/components/sections/FaqSection.tsx` — keep in sync.
7. **AI-agents guide** — new `src/pages/guides/AiAgentsGuide.tsx` (route `/guide/ai-agents` in App.tsx), full Hebrew SEO copy (סוכני AI / AI agents / אוטומציה עסקית), single H1, `Article` JSON-LD, CTA id `guide_ai_agents_cta_button` → `/#contact`, bg-abyss dark theme, reuses Header/Footer/glass-liquid.

## Verification done
- `npx tsc --noEmit` clean. `npm run build` succeeds; llms.txt/sitemap.xml/robots.txt emitted to dist/.
- Lint: 23 errors ALL pre-existing in untouched files (textarea, analytics, admin, tailwind.config, etc.) — none in changed files.
- Live browser check (vite preview :8088, prod build): / guide /privacy 404 → each has exactly 1 canonical/description/robots, single H1, correct per-route values; homepage JSON-LD = ProfessionalService+WebSite+FAQPage; aria-labels present; 404 + admin = noindex.

## Gotchas
- **node_modules corruption**: `npm install react-helmet-async` left `caniuse-lite` and `find-up` incompletely installed (missing dist/index.js), breaking build & lint. Fixed by `rm -rf node_modules/<pkg> && npm install <pkg>`. If build/lint suddenly errors "Cannot find module X", that's the cause.
- react-helmet-async REPLACES `<title>` but only manages meta/link tags IT renders — it does NOT dedupe pre-existing static tags. That's why static SEO tags had to be removed from index.html.

## Out of scope (manual — tell owner)
- **Google Search Console** (finding #2): owner must verify www.speedleads-ai.com in GSC and submit sitemap after publish. Not code.

## How to continue
- If owner says commit: stage all, conventional commit (e.g. `feat: per-route SEO meta, sitemap/llms.txt, FAQ schema, AI-agents guide; a11y fixes`), branch only.
- Pre-existing untracked junk in git status (`src/components/hero/HeroContent 3`, `src/pages/Index 3`) are Finder duplicate artifacts — NOT mine, leave alone / don't commit.
- Run port 8081 is occupied by an existing dev server; use a different port for preview.
