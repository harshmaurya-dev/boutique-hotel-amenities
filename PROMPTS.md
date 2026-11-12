# Prompt Traceability Log

**Ticket:** ENG-19777 — Core Infrastructure Overhaul  
**Project:** Boutique Hotel Amenities UI  
**Stack:** Semantic HTML5, vanilla CSS and vanilla JavaScript

## Prompt 1 — Tests first
Write acceptance tests before implementation using the Node built-in test runner. Cover valid starter records, malformed records, unsupported statuses and HTML-sensitive text sanitization.

## Prompt 2 — Core UI
Build a responsive boutique hotel amenities dashboard for floor staff. Include overview totals, a searchable and filterable amenity directory, locations, stock quantities, statuses, and add/edit flows. Keep the data structured and consistent.

## Prompt 3 — Edge cases
Show a loading indicator during asynchronous work. Show a friendly no-results state instead of a blank screen. Validate required fields and quantity values; highlight invalid fields and prevent invalid submissions.

## Prompt 4 — Accessibility and security
Use semantic landmarks, table headers, associated labels, keyboard-operable controls, visible focus, ARIA status announcements and a skip link. Render user text as text, never as executable HTML. Reject markup-like input.

## Prompt 5 — Quality and telemetry
Use a monochromatic corporate visual system and consistent spacing. Log a simulated analytics message after primary actions. Keep the project dependency-free.

## Notes
- No React, Tailwind, Bootstrap or third-party JavaScript libraries.
- `npm test` runs the acceptance tests.
- Browser localStorage is used for this front-end proof of concept.
