# Workforce Risk Watch

An installable web app that shows natural disasters, armed conflicts, civil unrest and health alerts worldwide that could affect our people. It is an alerting tool only: no sign-in, no tracking, no database, no personal data.

## How it works

- `index.html` is the whole app (map, filters, event list). `sw.js` and `manifest.webmanifest` make it installable and keep the last event list available offline.
- `data/events.json` is the only data. A scheduled Claude task rewrites it every morning from public sources (GDACS, USGS, UN OCHA, WHO, ECDC, embassy advisories, major news) and commits the change.
- Hosting is GitHub Pages, served from the `main` branch root.

## Event format

`data/events.json` holds `updatedAt` (ISO 8601, UTC) and an `events` array. Each event has:
`id`, `title`, `category` (conflict, unrest, earthquake, storm, flood, wildfire, health, other), `severity` (3 severe, 2 elevated, 1 monitor), `country`, `place`, `lat`, `lon`, `started`, `updated` (YYYY-MM-DD), `summary`, `advice`, `source`, `source_url`.

Severity is an editorial assessment of risk to people on the ground, not an official rating. The app does not replace government travel advice.

## Install

Open the site in Chrome or Edge and choose "Install" in the address bar or browser menu.

Working draft built on the Didomi Design System.
