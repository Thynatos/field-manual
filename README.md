# Field Manual — hosted copy

This folder is what gets published (GitHub Pages). It makes the app an
installable, offline-capable PWA on Android.

- `index.html` — a straight copy of `../summer-field-manual.html` (the source of
  truth). **After editing the source, refresh it:**
  `cp ../summer-field-manual.html index.html`
- `sw.js` — offline cache. Only registered when served over https; ignored when
  the single file is opened directly from disk.
- `manifest.webmanifest` + `icon-*.png` — what makes Chrome on Android offer
  "Install app" (standalone window, home-screen icon).

Progress data is NOT in these files — it lives in each device's browser
storage. Use the app's Export/Import buttons to move data between devices.
