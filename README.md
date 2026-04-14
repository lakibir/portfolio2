# Developer Portfolio

Production-ready developer portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, React Hook Form, Nodemailer, markdown blog content, GitHub API integration, a light/dark theme toggle, and a local admin dashboard for project overrides.

## Features

- Responsive portfolio landing page with hero, about, skills, projects, experience, blog preview, and contact sections
- 3D interactive hero built with Three.js via `@react-three/fiber`
- Animated cursor, smooth section reveals, and motion-driven UI with Framer Motion
- Markdown blog with static routes and SEO metadata
- Contact form validated on the client and server, sent through Gmail SMTP with Nodemailer
- Spam protection using a honeypot field and simple rate limiting in `/api/contact`
- GitHub repository feed fetched from the public GitHub API
- Local admin dashboard at `/admin` for project overrides stored in `localStorage`
- Optional Contentful project ingestion via environment variables
- `sitemap.xml`, `robots.txt`, manifest, Open Graph image, Twitter image, and custom 404 page

## Folder Structure

```text
app/
	admin/page.tsx
	api/contact/route.ts
	blog/[slug]/page.tsx
	blog/page.tsx
	globals.css
	layout.tsx
	loading.tsx
	manifest.ts
	not-found.tsx
	opengraph-image.tsx
	page.tsx
	robots.ts
	sitemap.ts
	twitter-image.tsx
components/
	layout/
		footer.tsx
		header.tsx
	sections/
		about-section.tsx
		admin-dashboard.tsx
		blog-preview-section.tsx
		contact-section.tsx
		experience-section.tsx
		hero-canvas.tsx
		hero-section.tsx
		projects-section.tsx
		skills-section.tsx
	ui/
		animated-cursor.tsx
		button.tsx
		reveal.tsx
		section-heading.tsx
		theme-provider.tsx
		theme-toggle.tsx
		toaster.tsx
content/
	blog/
		shipping-fast-without-debt.md
		the-case-for-motion-with-restraint.md
		why-portfolio-sites-should-have-real-systems.md
hooks/
	use-local-storage.ts
	use-mounted.ts
lib/
	blog.ts
	cms.ts
	github.ts
	mail.ts
	portfolio.ts
	utils.ts
	validations/contact.ts
public/
	icon.svg
	resume.pdf
	projects/
		project-analytics.svg
		project-commerce.svg
		project-hiring.svg
styles/
	prose.css
.env.local.example
.prettierignore
.prettierrc.json
eslint.config.mjs
next.config.ts
package.json
tsconfig.json
```

## Install Dependencies

```bash
npm install
```

## Run Locally

1. Copy `.env.local.example` to `.env.local`.
2. Fill in your email credentials and optional CMS/GitHub values.
3. Start the dev server:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

Useful scripts:

```bash
npm run lint
npm run typecheck
npm run build
npm run format
```

## Environment Variables

Create `.env.local` with:

```env
EMAIL_USER=
EMAIL_PASS=
ADMIN_USERNAME=
ADMIN_PASSWORD=
GITHUB_TOKEN=
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
CONTENTFUL_ENVIRONMENT=master
```

Notes:

- `EMAIL_USER` should be the Gmail address receiving contact form messages.
- `EMAIL_PASS` should be a Gmail App Password, not your normal account password.
- `ADMIN_USERNAME` and `ADMIN_PASSWORD` protect the `/admin` route with HTTP Basic Auth in production.
- `GITHUB_TOKEN` is optional but helps avoid GitHub API rate limits.
- Contentful variables are optional and only needed if you want CMS-managed projects.

## Gmail App Password Setup

1. Sign in to the Google account you want to receive portfolio email on.
2. Open Google Account settings and enable 2-Step Verification.
3. Search for `App Passwords` in the security settings.
4. Create a new app password for `Mail`.
5. Copy the generated 16-character password into `EMAIL_PASS`.
6. Put the Gmail address into `EMAIL_USER`.

## Customize Content

- Update personal profile data, social links, skills, experience, and curated projects in `lib/portfolio.ts`.
- Add or edit markdown posts in `content/blog`.
- Replace `public/avatar-placeholder.svg` with your own photo (or update `siteConfig.heroImage` in `lib/portfolio.ts`) to show your image in the 3D hero.
- Replace `public/resume.pdf` with your real resume before deploying.
- Replace the SVG project artwork in `public/projects` with real screenshots or exported previews.

## Admin Dashboard

Visit `/admin` to manage local project overrides in the browser. In production deployments, this route is protected by HTTP Basic Auth when `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set. If they are missing in production, requests to `/admin` are redirected to `/`.

## Deploy to Vercel

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Import the project into Vercel.
3. Add the same environment variables from `.env.local` in the Vercel project settings.
4. Deploy with the default Next.js build settings.

Recommended pre-deploy check:

```bash
npm run lint
npm run typecheck
npm run build
```

## Performance Notes

- The app uses server rendering where appropriate, static generation for blog content, optimized images, and revalidated GitHub/CMS fetches.
- The 3D scene is isolated to the hero section and loaded in a client-only boundary to keep the rest of the page efficient.
- The project currently builds successfully in production mode and is structured for strong Lighthouse performance.
