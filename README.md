# AIESEC Culture & Connection Night — Badge Studio

A responsive Halloween story badge creator inspired by https://global-exchange-summit-2026-badge.netlify.app/ and the supplied event poster.

## Run locally

From this folder, run `python3 -m http.server 5173`, then open http://localhost:5173.

No package installation or build is needed. The app uses HTML, CSS, and browser Canvas. Fonts come from Google Fonts with local fallbacks. Photos are processed only in the browser; there is no photo upload server or analytics.

## Features

- Live 1080 × 1920 Instagram story badge
- Local portrait selection, zoom and horizontal/vertical positioning
- Name, role, entity, pass type, headline and bottom-line customization
- Four accent colors and lossless PNG download
- Copyable suggested caption, image validation and accessible form controls
- Responsive mobile and desktop layout

## Files and deployment

`index.html`, `styles.css`, `app.js` and `assets/event-artwork.jpg` are the website. Deploy this folder to any static host such as Netlify; no build command is required and the publish directory is `.`. No deployment is performed by the local setup.

The user supplied the event artwork. No event date, venue or official social handle has been invented. Update the caption in `index.html` when confirmed event details are available.
