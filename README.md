# Divyansh — Video Editor Portfolio

A dark, cinematic one-page portfolio built with **Next.js 16 (App Router)**, **React 19** and **Tailwind CSS v4**.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Other scripts: `npm run lint`, `npm run typecheck`.

## Editing content

Everything visible on the site lives in **`src/config/site.ts`**:

| Key            | What it controls                                                        |
| -------------- | ----------------------------------------------------------------------- |
| `name`, `role`, `location`, `description` | Identity, page title and SEO               |
| `hero`         | Headline (wrap a word in `*asterisks*` for the italic accent), intro, background video, stats |
| `showreel`     | The video opened by **Play showreel**                                   |
| `about`        | Statement, paragraphs, highlights                                       |
| `projects`     | Portfolio items (see below)                                             |
| `categories`   | Filter tabs (empty categories are hidden automatically)                 |
| `skills`, `tools`, `process`, `testimonials` | Their respective sections                  |
| `contact`      | Email, phone, WhatsApp number + prefilled message, optional Instagram handle, availability |

### Adding a project

```ts
{
  id: "my-film",                       // unique slug
  title: "My Film",
  client: "Client name",
  category: "Commercial",              // one of `categories`
  year: 2026,
  role: "Edit · Colour",
  description: "One or two sentences shown in the player.",
  poster: "https://cdn.example.com/my-film.jpg",
  orientation: "landscape",            // or "portrait" for 9:16 work
  video: { type: "file", src: "https://cdn.example.com/my-film.mp4", preview: "https://cdn.example.com/my-film-360p.mp4" },
  // or: video: { type: "youtube", id: "dQw4w9WgXcQ" }
  // or: video: { type: "vimeo", id: "76979871" }
}
```

- **Posters** are served through `next/image` (AVIF/WebP, responsive sizes). Add any new image host to `images.remotePatterns` in `next.config.ts`, or put files in `public/` and use paths like `/posters/my-film.jpg`.
- **`preview`** should be a small (≈360p, a few MB) muted clip. It is only downloaded the first time someone hovers a card, so the grid stays fast.
- The demo footage is free stock from [Pexels](https://www.pexels.com/license/); the projects, clients and testimonials are sample content. Replace all of it with your real work before launch.

## Contact & themes

The contact section shows large tap targets for **email**, **phone (call)** and **WhatsApp**, with copy buttons for email and phone. Set `contact.instagram` in the config to add an Instagram card and footer link.

The site has **light and dark modes**. It follows the visitor's system setting by default; the sun/moon button in the header switches it and remembers the choice. Colours are CSS variables in `src/app/globals.css` (`[data-theme="light"]` / dark), and sections that sit on video (hero, project cards, player) always use the dark palette.

## Project structure

```
src/
  app/                 layout (theme script), page, global styles, robots/sitemap, icon
  config/site.ts       all content
  lib/                 helpers (link builders, timecode)
  components/
    layout/            Navbar (scroll-spy, mobile menu, theme toggle), Footer
    sections/          Hero, About, Portfolio, Skills, Tools, Process, Testimonials, Contact
    portfolio/         VideoCard (hover preview), VideoModal (player + playlist navigation)
    contact/           CopyButton
    ui/                Reveal (scroll animation), SectionHeading, Emphasis, ThemeToggle, Icons
```

## Notes

- Animations respect `prefers-reduced-motion`; the hero video doesn't play for reduced-motion or data-saver users and pauses when scrolled out of view.
- The video player supports Esc to close, ←/→ to move between projects, and keeps keyboard focus inside the dialog.
