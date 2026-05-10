# HSF EMS Protocols — PWA Deployment Guide

## Files to deploy (keep all 4 together in the same folder)
- HSF_EMS_Protocols.html
- manifest.json
- sw.js
- icon-192.png
- icon-512.png

---

## Option A — GitHub Pages (Free, Recommended)

1. Create a free account at github.com
2. Create a new repository — name it anything (e.g. `hsf-ems-protocols`)
3. Click "uploading an existing file" and drag all 5 files in
4. Commit the files
5. Go to Settings → Pages → Source: select "Deploy from a branch" → branch: main → folder: / (root)
6. Click Save — your app will be live at:
   `https://YOUR-USERNAME.github.io/hsf-ems-protocols/HSF_EMS_Protocols.html`
7. Share that URL with providers

---

## Option B — Netlify (Free, Drag & Drop)

1. Go to netlify.com — create a free account
2. From the dashboard click "Add new site" → "Deploy manually"
3. Drag the folder containing all 5 files onto the deploy area
4. Done — you get a URL like `https://random-name.netlify.app`
5. You can set a custom subdomain (e.g. `hsf-ems.netlify.app`) in Site Settings

---

## How providers install it on their phone

### Android
1. Open Chrome and go to the app URL
2. Tap the 3-dot menu (top right)
3. Tap "Add to Home screen"
4. Tap "Add" — the HSF EMS icon appears on the home screen
5. The app now works fully offline

### iPhone / iPad
1. Open Safari and go to the app URL
2. Tap the Share button (box with arrow, bottom center)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add" — the HSF EMS icon appears on the home screen
5. The app works offline (Safari must have loaded it once first)

---

## Updating the protocols

To update protocol content:
1. Edit HSF_EMS_Protocols.html
2. In sw.js, change `const CACHE_NAME = 'hsf-ems-v1'` to `'hsf-ems-v2'` (increment the number)
3. Re-upload both files to your host
4. On next open, providers get the update automatically

---

## Notes
- HTTPS is required for service workers — both GitHub Pages and Netlify provide this automatically
- The app caches everything on first load, so it works in airplane mode after that
- No app store account or developer fee required
