
import { useMath } from "/js/useMath.js";

import {
  createTaleemPlayer,
  resolveAssetPaths,
  resolveBackground,
  getDeckEndTime
} from "/js/taleem-player.esm.js";

let player;
let duration = 0;

let playing = false;
let startTime = 0;
let currentTime = 0;

let audio = null;


/* --------------------------
   SYLLABUS
-------------------------- */

function renderSyllabus(links){

  const list = document.getElementById("syllabus-list");
  if(!list || !links) return;

  list.innerHTML = "";

  links.forEach(link => {

    const a = document.createElement("a");
    a.className = "video-card";
    a.href = `/class?chapter=${link.anchor}&deck=${link.deck}`;

    const img = document.createElement("img");
    img.className = "thumb";
    img.src = `/images/${link.image}`;

    const info = document.createElement("div");
    info.className = "info";

    const title = document.createElement("div");
    title.className = "video-title";
    title.textContent = link.title;

    info.appendChild(title);
    a.appendChild(img);
    a.appendChild(info);

    list.appendChild(a);

  });

}



/* --------------------------
   DISCUSSION
-------------------------- */

function renderDiscussion(discussion){

  const container = document.getElementById("discussion-list");
  if(!container) return;

  container.innerHTML = "";

  discussion.forEach(item => {

    const block = document.createElement("div");
    block.className = "discussion-item";

    const q = document.createElement("div");
    q.className = "discussion-question";
    q.textContent = item.question;

    const a = document.createElement("div");
    a.className = "discussion-answer";
    a.textContent = item.answer;

    block.appendChild(q);
    block.appendChild(a);

    if(item.links && item.links.length){

      const linksBox = document.createElement("div");
      linksBox.className = "discussion-links";

      item.links.forEach(link => {

        const tag = document.createElement("a");
        tag.className = "discussion-link";
        tag.href = link.url;
        tag.textContent = link.title;

        linksBox.appendChild(tag);

      });

      block.appendChild(linksBox);
    }

    container.appendChild(block);

  });

}



function enableDiscussionAccordion(){

  const questions = document.querySelectorAll(".discussion-question");

  questions.forEach(q => {

    q.onclick = () => {

      const all = document.querySelectorAll(".discussion-item");
      all.forEach(item => item.classList.remove("open"));

      q.parentElement.classList.add("open");

    };

  });

}



function enableDiscussionSearch(){

  const search = document.getElementById("discussion-search");
  if(!search) return;

  search.addEventListener("input", () => {

    const term = search.value.toLowerCase();
    const items = document.querySelectorAll(".discussion-item");

    items.forEach(item => {

      const text = item.innerText.toLowerCase();
      item.style.display = text.includes(term) ? "block" : "none";

    });

  });

}



/* --------------------------
   PLAYER LOOP
-------------------------- */

function loop(){

  if(playing){

    if(audio){
      currentTime = audio.currentTime;
    }else{
      currentTime = (performance.now() - startTime) / 1000;
    }

    if(currentTime > duration){
      playing = false;
      currentTime = duration;
    }

    player.renderAt(currentTime);


    const slide = document.querySelector("#app .slide");
    useMath(slide);

    const scrub = document.getElementById("scrub");
    const timeEl = document.getElementById("time");

    if(scrub) scrub.value = currentTime;
    if(timeEl) timeEl.textContent = currentTime.toFixed(1) + "s";

  }

  requestAnimationFrame(loop);

}



/* --------------------------
   NAVBAR CONTROLS
-------------------------- */

function wireControls(){

  const playBtn = document.getElementById("play-btn");
  const pauseBtn = document.getElementById("pause-btn");
  const stopBtn = document.getElementById("stop-btn");
  const scrub = document.getElementById("scrub");

  playBtn.onclick = () => {

    if(audio){
      audio.play();
    }else{
      startTime = performance.now() - currentTime * 1000;
    }

    playing = true;

  };

  pauseBtn.onclick = () => {

    playing = false;

    if(audio){
      audio.pause();
    }

  };

  stopBtn.onclick = () => {

    playing = false;
    currentTime = 0;

    if(audio){
      audio.pause();
      audio.currentTime = 0;
    }

    player.renderAt(0);

  };

  scrub.oninput = e => {

    currentTime = Number(e.target.value);

    if(audio){
      audio.currentTime = currentTime;
    }else{
      startTime = performance.now() - currentTime * 1000;
    }

    player.renderAt(currentTime);

  };

}



/* --------------------------
   LOAD DECK
-------------------------- */

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

  const scrub = document.getElementById("scrub");
  if(scrub) scrub.max = duration;

  wireControls();

}



/* --------------------------
   INIT
-------------------------- */

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

init();
loop();