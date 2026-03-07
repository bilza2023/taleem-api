import { build } from "esbuild";
import fs from "fs";
import path from "path";

const dist = "dist";

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

// JS bundle
await build({
  entryPoints: ["src/index.js"],
  outfile: "dist/index.js",
  bundle: true,
  format: "esm",
  platform: "browser"
});

// Copy CSS
fs.mkdirSync("dist/css/themes", { recursive: true });
fs.mkdirSync("dist/css/app", { recursive: true });

// Copy themes
fs.readdirSync("src/css/themes").forEach(file => {
  fs.copyFileSync(
    path.join("src/css/themes", file),
    path.join("dist/css/themes", file)
  );
});

// Copy app.css
fs.copyFileSync(
  "src/css/app/app.css",
  "dist/css/app/app.css"
);

console.log("✔ taleem-player-app build complete");
