// node_modules/taleem-pam/dist/taleem-pam.esm.js
var i = null;
var r = {
  setDraw(t) {
    i = t;
  },
  start(t) {
    function s() {
      t(), requestAnimationFrame(s);
    }
    requestAnimationFrame(s);
  },
  draw(t) {
    i && i(t);
  }
};
var e = class {
  constructor() {
    this._start = null, this._offset = 0, this._playing = false;
  }
  play() {
    this._playing || (this._playing = true, this._start = performance.now());
  }
  pause() {
    this._playing && (this._offset += performance.now() - this._start, this._playing = false);
  }
  seek(s) {
    this._offset = s * 1e3, this._playing && (this._start = performance.now());
  }
  now() {
    return this._playing ? (this._offset + (performance.now() - this._start)) / 1e3 : this._offset / 1e3;
  }
};

// src/taleemPlayerApp.js
function taleemPlayerApp({
  player,
  timer,
  duration,
  ui,
  afterRender
}) {
  const {
    playBtn,
    pauseBtn,
    stopBtn,
    scrub,
    timeEl
  } = ui;
  scrub.max = duration;
  const state = {
    currentTime: 0
  };
  function draw() {
    const t = state.currentTime;
    player.renderAt(t);
    if (afterRender) {
      afterRender({
        time: t,
        player,
        state
      });
    }
    timeEl.textContent = `${t.toFixed(1)}s`;
    scrub.value = t;
  }
  r.setDraw(draw);
  r.start(() => {
    const t = timer.now();
    if (t >= duration) {
      timer.pause();
      state.currentTime = duration;
      r.draw();
      return;
    }
    state.currentTime = t;
    r.draw();
  });
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
    r.draw();
  };
  scrub.oninput = (e2) => {
    timer.seek(+e2.target.value);
    timer.pause();
  };
}

// src/createAudioTimer.js
import { Howl } from "howler";
function createAudioTimer(url) {
  const sound = new Howl({
    src: [url],
    html5: true
  });
  return {
    play() {
      sound.play();
    },
    pause() {
      sound.pause();
    },
    seek(t) {
      sound.seek(t);
    },
    now() {
      const position = sound.seek();
      return typeof position === "number" ? position : 0;
    }
  };
}

// src/createSilentTimer.js
function createSilentTimer() {
  const timer = new e();
  return {
    play() {
      timer.play();
    },
    pause() {
      timer.pause();
    },
    seek(t) {
      timer.seek(t);
    },
    now() {
      return timer.now();
    }
  };
}
export {
  createAudioTimer,
  createSilentTimer,
  taleemPlayerApp
};
