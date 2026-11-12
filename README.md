# Boutique Hotel Amenities UI

A responsive staff-facing amenity directory built with semantic HTML5, vanilla CSS and vanilla JavaScript.

## Features
- Overview totals for amenities, available items, attention-needed items and locations.
- Search by amenity name or location; filter by status and location.
- Add and edit amenities with field-level validation.
- Loading and empty states.
- Local browser persistence using localStorage.
- Simulated analytics console messages.
- Accessible landmarks, labels, table headers, skip link and live status messages.
- User-entered values are rendered through DOM text nodes; markup-like input is rejected.

## Run locally
No install step is required. Run `python3 -m http.server 8080` and open `http://localhost:8080`.

## Tests
Requires Node.js. Run `npm test` (uses Node's built-in test runner).

## Static deployment
Import this repository into Vercel or Netlify. Framework preset: Other. Build command: empty. Output directory: `.`.

## Scope
This is a front-end proof of concept. Data is stored in the current browser only and is not shared across staff devices or connected to a hotel backend.
