# AIESEC Culture & Connection Night — Badge Studio

A responsive Halloween story badge creator inspired by https://global-exchange-summit-2026-badge.netlify.app/ and the supplied event poster.

## Run locally

From this folder, run `python3 -m http.server 5173`, then open http://localhost:5173.

No package installation or build is needed. The app uses HTML, CSS, and browser Canvas. Fonts come from Google Fonts with local fallbacks. Photos are processed only in the browser; there is no photo upload server or analytics.

## Features

- Live 1080 × 1920 Instagram story badge
- Local portrait selection, zoom and horizontal/vertical positioning
- Name, optional role, pass type, headline and bottom-line customization
- Four accent colors and lossless PNG download
- Copyable suggested caption, image validation and accessible form controls
- Responsive mobile and desktop layout

## Files and deployment

`index.html`, `styles.css`, `app.js` and `assets/event-artwork.jpg` are the website. Deploy this folder to any static host such as Netlify; no build command is required and the publish directory is `.`. No deployment is performed by the local setup.

The user supplied the event artwork. No event date, venue or official social handle has been invented. Update the caption in `index.html` when confirmed event details are available.


## Host on Vercel

This is a plain static website. It needs no build step, backend, environment variables, or package installation.

1. Push this Git repository to your GitHub, GitLab, or Bitbucket account.
2. Sign in to [Vercel](https://vercel.com/new), choose **Add New → Project**, and import the repository.
3. Use these project settings:

   | Setting | Value |
   | --- | --- |
   | Framework Preset | **Other** |
   | Root Directory | The repository root (`./`) |
   | Build Command | Enable Override and leave the command empty |
   | Output Directory | Enable Override and enter `.` |
   | Install Command | Enable Override and leave the command empty |
   | Environment Variables | None |

4. Click **Deploy**. Open the resulting Vercel URL and try choosing a photo and downloading a badge.
5. Future pushes to the production branch (`main`) will automatically update the live website when the Git integration is enabled.

Keep `assets/event-artwork.jpg` in the repository so it is included in the deployment. The local Python preview server is not needed on Vercel. Visitor photos continue to be processed on their own devices.

Official guides: [Vercel build configuration](https://vercel.com/docs/builds/configure-a-build) and [Git deployments](https://vercel.com/docs/git).

## Credit

Made with 💜 by [Khine Khant](https://www.linkedin.com/in/knsxw).
