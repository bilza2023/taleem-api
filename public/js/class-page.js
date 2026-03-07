
import {taleemPlayerApp,createSilentTimer} from "./taleem-player-app.esm.js";

import { renderDiscussion,enableDiscussionAccordion,enableDiscussionSearch } from "/js/discussion-ui.js";

import {createTaleemPlayer,resolveAssetPaths,resolveBackground,getDeckEndTime} from "/js/taleem-player.esm.js";

import { useMath } from "/js/useMath.js";
import { renderSyllabus } from "/js/syllabus-ui.js";

////////////////////////////////////////////////////////////
let player;
let duration = 0;
let audio = null;

async function loadDeck(deckId){

  const res = await fetch(`/api/deck/${deckId}`);
  const presentation = await res.json();

  const discussion = presentation.discussion || [];

  renderDiscussion(discussion);
  enableDiscussionAccordion();
  enableDiscussionSearch();

  const imageBase = "/images/";
  const audioBase = "/audio/";

  resolveAssetPaths(presentation, imageBase);
  resolveBackground(presentation, imageBase);

  player = createTaleemPlayer({
    mount: "#app",
    deck: presentation
  });

  duration = getDeckEndTime(presentation);

  if(presentation.audio){
    audio = new Audio(`${audioBase}${presentation.audio}`);
  }

  /* --------------------------
     PLAYER APP
  -------------------------- */

  const playBtn = document.getElementById("play-btn");
  const pauseBtn = document.getElementById("pause-btn");
  const stopBtn = document.getElementById("stop-btn");
  const scrub = document.getElementById("scrub");
  const timeEl = document.getElementById("time");

  const timer = audio
    ? {
        play(){ audio.play(); },
        pause(){ audio.pause(); },
        seek(t){ audio.currentTime = t; },
        now(){ return audio.currentTime || 0; }
      }
    : createSilentTimer();

  if (!window._taleemPlayerApp) {

    window._taleemPlayerApp = true;

    taleemPlayerApp({
      player,
      timer,
      duration,
      ui:{
        playBtn,
        pauseBtn,
        stopBtn,
        scrub,
        timeEl
      },
      afterRender(){
        const slide = document.querySelector("#app .slide");
        if(slide) useMath(slide);
      }
    });

  }

}

async function init(){

  const chapter = document.getElementById("player-view").dataset.chapter;

  const res = await fetch(`/api/chapter/${chapter}`);
  const data = await res.json();

  const links = data.links;

  renderSyllabus(links);

  if(links.length){

    const params = new URLSearchParams(window.location.search);
    const deckFromUrl = params.get("deck");

    const deck = deckFromUrl || links[0].deck;

    await loadDeck(deck);

  }

  const sidebar = document.getElementById("sidebar");

  document.getElementById("toggle-sidebar").onclick = () => {
    sidebar.classList.toggle("closed");
  };

  /* --------------------------
     ANSWER PANEL (ORIGINAL)
  -------------------------- */

  const answersView = document.getElementById("answers-view");
  const playerView = document.getElementById("player-view");

  const backBtn = document.getElementById("back-to-player");

  if(backBtn){
    backBtn.onclick = () => {
      answersView.style.display = "none";
      playerView.style.display = "block";
    };
  }

}

/* --------------------------
   START
-------------------------- */
/* --------------------------
   THEMES
-------------------------- */

function setTheme(bg, text){

  document.documentElement.style.setProperty("--backgroundColor", bg);
  document.documentElement.style.setProperty("--primaryColor", text);

  localStorage.setItem("taleem-bg", bg);
  localStorage.setItem("taleem-text", text);
}

const grayBtn = document.getElementById("theme-gray");
const blueBtn = document.getElementById("theme-blue");
const creamBtn = document.getElementById("theme-cream");

if(grayBtn){
  grayBtn.onclick = () => setTheme("#1f2933", "#e5e7eb");
}


if(creamBtn){
  creamBtn.onclick = () => setTheme("#fffaf0", "#3a2f1f");
}

if(blueBtn){
  blueBtn.onclick = () => setTheme("#798ded", "#010518");
}
/* restore saved theme */

const savedBg = localStorage.getItem("taleem-bg");
const savedText = localStorage.getItem("taleem-text");

if(savedBg && savedText){
  document.documentElement.style.setProperty("--backgroundColor", savedBg);
  document.documentElement.style.setProperty("--primaryColor", savedText);
}

init();