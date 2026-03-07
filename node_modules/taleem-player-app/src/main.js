// ----------------------------------
// Global styles (bundled into build)
// ----------------------------------
// import "./app.css";        // controls UI only
import "taleem-player/css";
// import "taleem-player/css/app";
import "taleem-player/css/light";
import "taleem-player/css/dark";
import "taleem-player/css/paper";
import "katex/dist/katex.min.css";



// ----------------------------------
// Public Engine Re-Exports
// ----------------------------------
export {
  createTaleemPlayer,
  resolveAssetPaths,
  resolveBackground,
  getDeckEndTime
} from "taleem-player";

// ----------------------------------
// Timer Adapters
// ----------------------------------
export { createAudioTimer } from "./createAudioTimer.js";
export { createSilentTimer } from "./createSilentTimer.js";

// ----------------------------------
// Orchestration
// ----------------------------------
export { startLoop } from "./play.js";
