# Wedding Invitation Website

This is a simple static wedding invitation website built with HTML, CSS, and vanilla JavaScript. It is designed to work on GitHub Pages or Vercel without any backend or server-side code.

## Project structure

- `index.html` — opening surprise page
- `invitation.html` — main invitation page
- `css/style.css` — site styling and animations
- `js/config.js` — configuration values for names, date, venue, maps, and music
- `js/script.js` — page behavior and actions
- `js/countdown.js` — live countdown timer
- `assets/images/` — profile and background images
- `assets/music/wedding.mp3` — optional background music

## 1. How to replace names

Edit the `weddingConfig` object in `js/config.js`:

```js
const weddingConfig = {
  groomName: "Sundar S",
  brideName: "Harini S",
  weddingDate: "2026-11-13T00:00:00+05:30",
  venueName: "The Grand Palace",
  venueAddress: "MADURAI, TAMIL NADU",
  mapsUrl: "https://maps.google.com/?q=The+Grand+Palace+Madurai",
  coupleImage: "assets/images/couple.jpg",
  music: "assets/music/wedding.mp3"
};
```

## 2. How to replace photos

Replace the placeholder images in `assets/images/`:

- `couple.jpg`
- `couple2.jpg`
- `background.jpg`

Keep these exact filenames and put them directly in `assets/images/`. The opening page reads `couple.jpg`; the invitation page reads `couple2.jpg`. The names and paths are case-sensitive after deployment.

For mobile-friendly photos, export both as JPEG in sRGB with metadata removed, at 1200 pixels wide and quality 80 (roughly 75-82 is fine). Crop `couple.jpg` to portrait 4:5 (1200 x 1500 px) and `couple2.jpg` to portrait 3:4 (1200 x 1600 px) so they fit their display frames without extra cropping. Aim for 300-600 KB per photo; keep each below 700 KB. In an image optimizer such as Squoosh, choose JPEG, set the resize/crop dimensions above, quality 80, and enable metadata removal. Save the optimized files over the existing filenames in `assets/images/`.

The current `couple.jpg` and `couple2.jpg` files are about 8.5 MB and 7.2 MB, respectively, so they should be compressed. After replacing them, hard-refresh the page (`Ctrl+F5`) to bypass the browser cache.

## 3. How to replace the Google Maps URL

Update the `mapsUrl` field in `js/config.js` to your Google Maps link.

## 4. How to replace music

Place your audio file at `assets/music/wedding.mp3` and update the `music` path in `js/config.js` if needed.

Music is optional and only starts after the user interacts with the invitation.

## 5. How to change the wedding date

Update the `weddingDate` value in `js/config.js` to the correct time in ISO format, for example:

```js
weddingDate: "2026-11-13T00:00:00+05:30"
```

## 6. How to test locally

Open the project folder in a browser or serve it locally with a simple static server:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000/
```

## 7. How to upload to GitHub

1. Create a new GitHub repository.
2. Push all files to the repository.
3. Open the repository settings.
4. Go to Pages.
5. Select the main branch and root folder.
6. Save and wait for deployment.

## 8. How to deploy on Vercel

1. Import the repository into Vercel.
2. Choose the project root as the deployment folder.
3. No build step is needed for this static site.
4. Deploy.

## 9. How to connect a custom domain

In Vercel, open your project settings and add your custom domain. Then update your DNS records as instructed by Vercel. If using GitHub Pages, set the custom domain in the Pages settings and configure your DNS provider.

## Notes

- The site works without any backend.
- The music file is optional and won’t break the page if missing.
- The countdown uses Asia/Kolkata time.
- The WhatsApp message and calendar download are included automatically.
