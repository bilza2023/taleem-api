


export 
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