import {
  createTaleemPlayer,
  resolveAssetPaths,
  resolveBackground,
  getDeckEndTime,
  createAudioTimer,
  createSilentTimer,
  startLoop
} from "/player/taleem-player-app.js";


function renderSyllabus(links){

  const list = document.getElementById("syllabus-list");
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


async function loadDeck(deckId){

  const res = await fetch(`/api/deck/${deckId}`);
  const presentation = await res.json();

  const imageBase = "/images/";
  const audioBase = "/audio/";

  resolveAssetPaths(presentation, imageBase);
  resolveBackground(presentation, imageBase);

  let timer;

  if(presentation.audio){
    timer = createAudioTimer(`${audioBase}${presentation.audio}`);
  } else {
    timer = createSilentTimer();
  }

  const player = createTaleemPlayer({
    mount: "#app",
    deck: presentation
  });

  const duration = getDeckEndTime(presentation);

  startLoop({
    player,
    timer,
    duration,
    ui:{
      playBtn: document.getElementById("play-btn"),
      pauseBtn: document.getElementById("pause-btn"),
      stopBtn: document.getElementById("stop-btn"),
      scrub: document.getElementById("scrub"),
      timeEl: document.getElementById("time")
    }
  });

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

  // ---- restore sidebar toggle ----

  const sidebar = document.getElementById("sidebar");

  document.getElementById("toggle-sidebar").onclick = () => {
    sidebar.classList.toggle("closed");
  };

}

init();