
import { renderDiscussion, enableDiscussionAccordion, enableDiscussionSearch } from "/js/discussion-ui.js";
import { taleemPlayerApp, createSilentTimer } from "./taleem-player-app.esm.js";
import { createTaleemPlayer, resolveAssetPaths, resolveBackground, getDeckEndTime } from "/js/taleem-player.esm.js";

import { useMath } from "/js/useMath.js";
import { renderSyllabus } from "/js/syllabus-ui.js";

import { loadSyllabus, getSyllabus } from "/js/syllabusObject.js";

////////////////////////////////////////////////////////////
// 🔷 LOAD DECK DATA (pure)
////////////////////////////////////////////////////////////

async function loadDeckData(deckId){

  const res = await fetch(`/api/deck/${deckId}`);
  if(!res.ok){
    console.error("Deck not found:", deckId);
    return null;
  }

  const presentation = await res.json();

  const discRes = await fetch(`/api/discussion/deck/${deckId}`);
  const discData = await discRes.json();

  const discussion = discData.discussion || [];

  return { presentation, discussion };
}

////////////////////////////////////////////////////////////
// 🔷 AUDIO / TIMER RESOLVER
////////////////////////////////////////////////////////////

async function getTimer(deckSlug){

  async function exists(url){
    try{
      const res = await fetch(url, { method: "HEAD" });
      return res.ok;
    }catch{
      return false;
    }
  }

  const base = "/content/audio/";
  const opus = `${base}${deckSlug}.opus`;
  const ogg  = `${base}${deckSlug}.ogg`;
  const mp3  = `${base}${deckSlug}.mp3`;

  if(await exists(opus)){
    return new Audio(opus);
  }

  if(await exists(ogg)){
    return new Audio(ogg);
  }

  if(await exists(mp3)){
    return new Audio(mp3);
  }

  return null;
}

////////////////////////////////////////////////////////////
// 🔷 PLAYER BOOT (one-time per page)
////////////////////////////////////////////////////////////

async function bootPlayer(deckId, presentation){

  const imageBase = "/images/";

  resolveAssetPaths(presentation, imageBase);
  resolveBackground(presentation, imageBase);

  const player = createTaleemPlayer({
    mount: "#app",
    deck: presentation
  });

  const duration = getDeckEndTime(presentation);
  debugger;
  // 🔊 audio
  const audio = await getTimer(deckId);

  const timer = audio
    ? {
        play(){ audio.play(); },
        pause(){ audio.pause(); },
        seek(t){ audio.currentTime = t; },
        now(){ return audio.currentTime || 0; }
      }
    : createSilentTimer();

  // 🎛 UI
  const playBtn = document.getElementById("play-btn");
  const pauseBtn = document.getElementById("pause-btn");
  const stopBtn = document.getElementById("stop-btn");
  const scrub = document.getElementById("scrub");
  const timeEl = document.getElementById("time");

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

////////////////////////////////////////////////////////////
// 🔷 INIT (orchestrator only)
////////////////////////////////////////////////////////////

async function init(){

  const chapterSlug = document.getElementById("player-view").dataset.chapter;

  await loadSyllabus();
  const syllabus = getSyllabus();

  const chapter = syllabus.getChapter(chapterSlug);

  if(!chapter){
    console.error("chapter not found:", chapterSlug);
    return;
  }

  const links = chapter.decks;

  renderSyllabus(links);

  if(!links.length) return;

  // 🔷 resolve deck
  const params = new URLSearchParams(window.location.search);
  let deck = params.get("deck");

  if(!deck){
    deck = links[0].deck;

    // ✅ fix URL silently
    const url = new URL(window.location.href);
    url.searchParams.set("deck", deck);
    window.history.replaceState({}, "", url);
  }

  // 🔷 load data
  const data = await loadDeckData(deck);
  if(!data) return;

  const { presentation, discussion } = data;

  // 🔷 discussion
  renderDiscussion(discussion);
  enableDiscussionAccordion();
  enableDiscussionSearch();

  // 🔷 ask button
  const askBtn = document.querySelector(".ask-question-btn");
  if(askBtn){
    askBtn.href = `/ask?contentType=deck&contentSlug=${deck}`;
  }

  // 🔷 player
  await bootPlayer(deck, presentation);

  // 🔷 sidebar toggle
  const sidebar = document.getElementById("sidebar");
  document.getElementById("toggle-sidebar").onclick = () => {
    sidebar.classList.toggle("closed");
  };

  // 🔷 answer panel
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

////////////////////////////////////////////////////////////
// 🔷 THEMES (unchanged)
////////////////////////////////////////////////////////////

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

const savedBg = localStorage.getItem("taleem-bg");
const savedText = localStorage.getItem("taleem-text");

if(savedBg && savedText){
  document.documentElement.style.setProperty("--backgroundColor", savedBg);
  document.documentElement.style.setProperty("--primaryColor", savedText);
}

////////////////////////////////////////////////////////////

init();