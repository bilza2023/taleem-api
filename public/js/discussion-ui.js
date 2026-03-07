


export function renderDiscussion(discussion){

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
  
export   function enableDiscussionAccordion(){
  
    const questions = document.querySelectorAll(".discussion-question");
  
    questions.forEach(q => {
  
      q.onclick = () => {
  
        const all = document.querySelectorAll(".discussion-item");
        all.forEach(item => item.classList.remove("open"));
  
        q.parentElement.classList.add("open");
  
      };
  
    });
  
  }
  
export   function enableDiscussionSearch(){
  
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
  