
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
    if(!links || links.length === 0) return;
  
    list.innerHTML = "";
  
    links.forEach(link => {
  
      const a = document.createElement("a");
      a.className = "video-card";
      a.href = `/player?v=${link.deck}`;
  
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
  
  
  function renderDiscussion(discussion){
  
    const container = document.getElementById("discussion-list");
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
  
  
  async function init(){
  
    const vid = document.getElementById("player-view").dataset.vid;
  
    const res = await fetch(`/api/presentation/${vid}`);
    const presentation = await res.json();
  
    const syllabus = presentation.syllabus;
    const discussion = presentation.discussion;
  
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
  
    renderSyllabus(syllabus);
    renderDiscussion(discussion);
    enableDiscussionAccordion();
    enableDiscussionSearch();
  
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
  
    const sidebar = document.getElementById("sidebar");
  
    document.getElementById("toggle-sidebar").onclick = () => {
      sidebar.classList.toggle("closed");
    };
  
    const backBtn = document.getElementById("back-to-player");
  
    if(backBtn){
      backBtn.onclick = () => {
        answersView.style.display = "none";
        playerView.style.display = "block";
      };
    }
  
  }
  
  init();