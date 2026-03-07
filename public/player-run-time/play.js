// play.js

import { renderLoop } from "taleem-pam";
import { useMath } from "./useMath.js";

export function startLoop({
  player,
  timer,
  duration,
  ui
}) {
  const {
    playBtn,
    pauseBtn,
    stopBtn,
    scrub,
    timeEl
  } = ui;

  // ----------------------------------
  // initial UI setup
  // ----------------------------------
  scrub.max = duration;

  const state = {
    currentTime: 0
  };

  // ----------------------------------
  // draw function
  // ----------------------------------
  function draw() {
    const t = state.currentTime;

    player.renderAt(t);

    // math rendering
    useMath(document.querySelector("#app"));

    timeEl.textContent = `${t.toFixed(1)}s`;
    scrub.value = t;
  }

  renderLoop.setDraw(draw);

  // ----------------------------------
  // render loop
  // ----------------------------------
  renderLoop.start(() => {
    const t = timer.now();

    if (t >= duration) {
      timer.pause();
      state.currentTime = duration;
      renderLoop.draw();
      return;
    }

    state.currentTime = t;
    renderLoop.draw();
  });

  // ----------------------------------
  // controls
  // ----------------------------------
  playBtn.onclick = () => {
    timer.play();
  };

  pauseBtn.onclick = () => {
    timer.pause();
  };

  stopBtn.onclick = () => {
    timer.pause();
    timer.seek(0);
    state.currentTime = 0;
    renderLoop.draw();
  };

  scrub.oninput = e => {
    timer.seek(+e.target.value);
    timer.pause();
  };
}
