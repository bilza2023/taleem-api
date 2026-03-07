
# 📘 Taleem Player — Usage Guide (v2)

Taleem Player lets you run Taleem slide decks in the browser using a simple HTML template and a built JS file.

After building the project, everything needed to run the player is inside:

```
dist/
```

You deploy or serve the **dist folder only**.

---

# 📂 Final Folder Structure (After Build)

```
dist/
  index.html
  taleem-player-app.js
  taleem-player-app.css
  css/
    app/
      app.css
    themes/
      default.css
  assets/
    decks/
      demo.json
    images/
    audio/
      music.mp3
```

`dist/` is your website root.

You must open or serve from inside `dist`.

---

# ▶️ How To Run

### Option 1 — Simple Local Server

```bash
cd dist
npx serve .
```

or

```bash
cd dist
npx http-server .
```

Then open the displayed URL.

---

### Option 2 — Deploy

Upload the **contents of dist** to your hosting root.

Do NOT upload `src/`, `public/`, or project files.

---

# 🧩 The HTML Template

Your `dist/index.html` is the official template.

Important:

• Do not remove `#app`
• Do not change element IDs
• Only edit the ENVIRONMENT CONFIG block

---

# 🔵 Environment Configuration

Inside `index.html`:

```js
const CONTENT_BASE = "./assets";
const deckUrl = `${CONTENT_BASE}/decks/demo.json`;
const audioUrl = `${CONTENT_BASE}/audio/music.mp3`;
const useAudio = true;
```

This is the only section you should edit.

---

# 📦 Assets Folder Contract

The player expects:

```
assets/
  decks/
  images/
  audio/
```

### Required

• `assets/decks/` must contain your deck JSON

### Required if deck uses images

• `assets/images/`

### Required only if `useAudio = true`

• `assets/audio/`

If you do not want audio:

```js
const useAudio = false;
```

Then the audio folder is not required.

---

# 🎨 CSS Order (Important)

Keep this order exactly:

```html
<link rel="stylesheet" href="./css/app/app.css" />
<link rel="stylesheet" href="./taleem-player-app.css" />
<link rel="stylesheet" href="./css/themes/default.css" />
```

Why:

1. app.css → layout
2. taleem-player-app.css → core slide styles
3. theme → visual overrides

Changing order may break styling.

---

# 🔁 To Use Your Own Deck

1. Place your JSON file inside:

```
dist/assets/decks/
```

2. Update:

```js
const deckUrl = `${CONTENT_BASE}/decks/your-file.json`;
```

3. Reload the page.

---

# 🔊 To Use Your Own Audio

1. Place audio inside:

```
dist/assets/audio/
```

2. Update:

```js
const audioUrl = `${CONTENT_BASE}/audio/your-audio.mp3`;
```

3. Reload.

---

# 🧠 Important Architecture Notes

• `src/` is development only
• `public/` is input
• `dist/` is production output
• You always run from `dist/`
• Never reference `/dist/...` in runtime URLs

`dist` is the final app.

---

# ✅ Summary

Build project
Serve dist
Edit ENV block
Place deck in assets
Place images/audio if needed

Done.
