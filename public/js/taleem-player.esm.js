// src/slides/templates/TitleAndSubtitleSlide.js
var TitleAndSubtitleSlide = {
  type: "titleAndSubtitle",
  fromJSON(raw) {
    const title = raw.data?.find((d) => d.name === "title")?.content;
    const subtitle = raw.data?.find((d) => d.name === "subtitle")?.content;
    if (!title) {
      throw new Error("titleAndSubtitle: requires title");
    }
    return Object.freeze({
      type: "titleAndSubtitle",
      render() {
        return `
          <section class="slide titleAndSubtitle">
            <h1>${title}</h1>
            ${subtitle ? `<h2>${subtitle}</h2>` : ``}
          </section>
        `;
      }
    });
  }
};

// src/slides/templates/TitleAndParaSlide.js
var TitleAndParaSlide = {
  type: "titleAndPara",
  fromJSON(raw) {
    const title = raw.data?.find((d) => d.name === "title")?.content;
    const para = raw.data?.find((d) => d.name === "para")?.content;
    if (!title && !para) {
      throw new Error("titleAndPara: requires at least title or para");
    }
    return Object.freeze({
      type: "titleAndPara",
      render() {
        return `
          <section class="slide titleAndPara">
            ${title ? `<h1>${title}</h1>` : ``}
            ${para ? `<p>${para}</p>` : ``}
          </section>
        `;
      }
    });
  }
};

// src/slides/templates/BulletListSlide.js
var BulletListSlide = {
  type: "bulletList",
  fromJSON(raw) {
    const bullets = raw.data?.filter((d) => d.name === "bullet").map((d) => d.content);
    if (!bullets || bullets.length === 0) {
      throw new Error("bulletList: requires at least one bullet");
    }
    return Object.freeze({
      type: "bulletList",
      bullets,
      render({ visibleCount = bullets.length, activeIndex = null } = {}) {
        return `
          <section class="slide bulletList">
            <ul>
              ${bullets.map((text, i) => {
          if (i >= visibleCount) return "";
          const cls = i === activeIndex ? "is-active" : activeIndex !== null && i < activeIndex ? "is-dim" : "";
          return `<li class="${cls}">${text}</li>`;
        }).join("")}
            </ul>
          </section>
        `;
      }
    });
  }
};

// src/slides/templates/TwoColumnTextSlide.js
var TwoColumnTextSlide = {
  type: "twoColumnText",
  fromJSON(raw) {
    const left = raw.data?.filter((d) => d.name === "left").map((d) => d.content);
    const right = raw.data?.filter((d) => d.name === "right").map((d) => d.content);
    if (!left?.length || !right?.length) {
      throw new Error("twoColumnText: requires left and right");
    }
    return Object.freeze({
      type: "twoColumnText",
      render() {
        return `
          <section class="slide twoColumnText">
            <div class="col left">
              ${left.map((v) => `<div>${v}</div>`).join("")}
            </div>
            <div class="col right">
              ${right.map((v) => `<div>${v}</div>`).join("")}
            </div>
          </section>
        `;
      }
    });
  }
};

// src/slides/templates/ImageSlide.js
var ImageSlide = {
  type: "imageSlide",
  fromJSON(raw) {
    const src = raw.data?.find((d) => d.name === "image")?.content;
    if (!src) throw new Error("imageSlide: image required");
    return Object.freeze({
      type: "imageSlide",
      src,
      render() {
        return `
          <section class="slide imageSlide">
            <img src="${src}" alt="" />
          </section>
        `;
      }
    });
  }
};

// src/slides/templates/FillImageSlide.js
var FillImageSlide = {
  type: "fillImage",
  fromJSON(raw) {
    const image = raw.data?.find((d) => d.name === "image")?.content;
    if (!image) {
      throw new Error("fillImage: image required");
    }
    return Object.freeze({
      type: "fillImage",
      image,
      render() {
        return `
          <section class="slide fillImage">
            <img src="${image}" alt="" />
          </section>
        `;
      }
    });
  }
};

// src/slides/templates/ImageWithTitleSlide.js
var ImageWithTitleSlide = {
  type: "imageWithTitle",
  fromJSON(raw) {
    const src = raw.data?.find((d) => d.name === "image")?.content;
    const title = raw.data?.find((d) => d.name === "title")?.content;
    if (!src || !title) {
      throw new Error("imageWithTitle: image and title required");
    }
    return Object.freeze({
      type: "imageWithTitle",
      src,
      title,
      render() {
        return `
          <section class="slide imageWithTitle">
            <h1>${title}</h1>
            <img src="${src}" alt="" />
          </section>
        `;
      }
    });
  }
};

// src/slides/templates/ImageWithCaptionSlide.js
var ImageWithCaptionSlide = {
  type: "imageWithCaption",
  fromJSON(raw) {
    const src = raw.data?.find((d) => d.name === "image")?.content;
    const caption = raw.data?.find((d) => d.name === "caption")?.content;
    if (!src || !caption) {
      throw new Error("imageWithCaption: image and caption required");
    }
    return Object.freeze({
      type: "imageWithCaption",
      src,
      caption,
      render() {
        return `
          <figure class="slide imageWithCaption">
            <img src="${src}" alt="" />
            <figcaption>${caption}</figcaption>
          </figure>
        `;
      }
    });
  }
};

// src/slides/templates/ImageLeftBulletsRightSlide.js
var ImageLeftBulletsRightSlide = {
  type: "imageLeftBulletsRight",
  fromJSON(raw) {
    const image = raw.data?.find((d) => d.name === "image")?.content;
    const bullets = raw.data?.filter((d) => d.name === "bullet").map((d) => d.content);
    if (!image || !bullets || bullets.length === 0) {
      throw new Error("imageLeftBulletsRight: image and bullets required");
    }
    return Object.freeze({
      type: "imageLeftBulletsRight",
      image,
      bullets,
      render({ visibleCount = bullets.length } = {}) {
        return `
          <section class="slide imageLeftBulletsRight">
            <img src="${image}" alt="" />
            <ul>
              ${bullets.map(
          (text, i) => i < visibleCount ? `<li>${text}</li>` : ""
        ).join("")}
            </ul>
          </section>
        `;
      }
    });
  }
};

// src/slides/templates/ImageRightBulletsLeftSlide.js
var ImageRightBulletsLeftSlide = {
  type: "imageRightBulletsLeft",
  fromJSON(raw) {
    const image = raw.data?.find((d) => d.name === "image")?.content;
    const bullets = raw.data?.filter((d) => d.name === "bullet").map((d) => d.content);
    if (!image || !bullets || bullets.length === 0) {
      throw new Error("imageRightBulletsLeft: image and bullets required");
    }
    return Object.freeze({
      type: "imageRightBulletsLeft",
      image,
      bullets,
      render({ visibleCount = bullets.length } = {}) {
        return `
          <section class="slide imageRightBulletsLeft">
            <ul>
              ${bullets.map(
          (text, i) => i < visibleCount ? `<li>${text}</li>` : ""
        ).join("")}
            </ul>
            <img src="${image}" alt="" />
          </section>
        `;
      }
    });
  }
};

// src/slides/templates/TableSlide.js
var TableSlide = {
  type: "table",
  fromJSON(raw) {
    const rows = raw.data;
    if (!Array.isArray(rows) || rows.length === 0) {
      console.warn("Empty table skipped", raw);
      return null;
    }
    return Object.freeze({
      type: "table",
      render() {
        return `
        <section class="slide table">
          <table>
            <tbody>
              ${rows.map(
          (row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`
        ).join("")}
            </tbody>
          </table>
          </section>
        `;
      }
    });
  }
};

// src/slides/templates/BarChartSlide.js
var BarChartSlide = {
  type: "barChart",
  fromJSON(raw) {
    const bars = (raw.data || []).filter((d) => d.name === "bar");
    if (!bars.length) {
      throw new Error("barChart requires bar items");
    }
    const maxValue = Math.max(...bars.map((b) => b.value));
    return Object.freeze({
      type: "barChart",
      render({ visibleCount = bars.length, activeIndex = -1 } = {}) {
        return `
          <section class="slide barChart">
            <div class="bar-chart">
              ${bars.map((bar, i) => {
          if (i >= visibleCount) return "";
          const width = bar.value / maxValue * 100;
          return `
                  <div class="bar-row">
                    <div class="bar-label">${bar.label}</div>

                    <div class="bar-track">
                      <div
                        class="bar-fill"
                        style="width: ${width}%"
                      ></div>
                    </div>

                    <div class="bar-value">${bar.value}</div>
                  </div>
                `;
        }).join("")}
            </div>
          </section>
        `;
      }
    });
  }
};

// src/slides/templates/Progressbar.js
var Progressbar = {
  type: "progressbar",
  fromJSON(raw) {
    const bars = raw.data?.filter((d) => d.name === "bar").map((d) => ({
      label: d.label,
      value: Math.max(0, Math.min(100, Number(d.value)))
    }));
    if (!bars || bars.length === 0) {
      throw new Error("progressbar requires at least one bar");
    }
    return Object.freeze({
      type: "progressbar",
      bars,
      render({ visibleCount = bars.length } = {}) {
        return `
          <section class="slide progressbar">
            ${bars.map((b, i) => {
          if (i >= visibleCount) return "";
          return `
                <div class="progressbar-item">
                  <div class="progressbar-label">${b.label}</div>
                  <div class="progressbar-track">
                    <div 
                        class="progressbar-fill"
                        style="width:${b.value}%"
                        data-value="${b.value}"
                      ></div>

                  </div>
                </div>
              `;
        }).join("")}
          </section>
        `;
      }
    });
  }
};

// src/slides/templates/QuoteSlide.js
var QuoteSlide = {
  type: "quoteSlide",
  fromJSON(raw) {
    const quote = raw.data?.find((d) => d.name === "quote")?.content;
    const author = raw.data?.find((d) => d.name === "author")?.content;
    if (!quote) {
      throw new Error("quoteSlide: quote required");
    }
    return Object.freeze({
      type: "quoteSlide",
      quote,
      author,
      render() {
        return `
          <blockquote class="slide quoteSlide">
            <p>${quote}</p>
            ${author ? `<footer>${author}</footer>` : ""}
          </blockquote>
        `;
      }
    });
  }
};

// src/slides/templates/KeyIdeasSlide.js
var KeyIdeasSlide = {
  type: "keyIdeasSlide",
  fromJSON(raw) {
    const cards = raw.data?.filter((d) => d.name === "card").map((d) => ({ icon: d.icon, label: d.label }));
    if (!cards || cards.length === 0) {
      throw new Error("keyIdeasSlide requires at least one card");
    }
    return Object.freeze({
      type: "keyIdeasSlide",
      cards,
      render({ visibleCount = cards.length } = {}) {
        return `
          <section class="slide keyIdeasSlide">
            ${cards.map((c, i) => {
          if (i >= visibleCount) return "";
          return `
                <div class="key-idea">
                  <div class="icon">${c.icon}</div>
                  <div class="label">${c.label}</div>
                </div>
              `;
        }).join("")}
          </section>
        `;
      }
    });
  }
};

// src/slides/templates/EqSlide.js
var EqSlide = {
  type: "eq",
  fromJSON(raw) {
    const lines = raw.data ?? [];
    const maxVisible = 3;
    return Object.freeze({
      type: "eq",
      lines,
      render({ activeIndex = -1 } = {}) {
        let start = 0;
        if (activeIndex >= maxVisible) {
          start = activeIndex - (maxVisible - 1);
        }
        const visibleLines = lines.slice(start);
        const activeLine = activeIndex >= 0 && activeIndex < lines.length ? lines[activeIndex] : null;
        const spItems = activeLine?.spItems ?? [];
        return `
          <section class="slide eq">
            
            <ul class="eq-lines">
              ${visibleLines.map((line, index) => {
          const realIndex = start + index;
          return `
                  <li class="eq-line ${realIndex === activeIndex ? "highlighted" : ""}">
                    ${line.content}
                  </li>
                `;
        }).join("")}
            </ul>

            <div class="eq-side-panel">
              ${spItems.map((item) => {
          if (item.type === "spImage") {
            return `
                    <div class="eq-explain-item eq-explain-image">
                      <img src="${item.content}" alt="" />
                    </div>
                  `;
          }
          return `
                  <div class="eq-explain-item">
                    ${item.content}
                  </div>
                `;
        }).join("")}
            </div>

          </section>
        `;
      }
    });
  }
};

// src/slides/registry.js
var SlideRegistry = {
  titleAndSubtitle: TitleAndSubtitleSlide,
  titleAndPara: TitleAndParaSlide,
  bulletList: BulletListSlide,
  twoColumnText: TwoColumnTextSlide,
  imageSlide: ImageSlide,
  fillImage: FillImageSlide,
  imageWithTitle: ImageWithTitleSlide,
  imageWithCaption: ImageWithCaptionSlide,
  imageLeftBulletsRight: ImageLeftBulletsRightSlide,
  imageRightBulletsLeft: ImageRightBulletsLeftSlide,
  table: TableSlide,
  barChart: BarChartSlide,
  progressbar: Progressbar,
  quoteSlide: QuoteSlide,
  keyIdeasSlide: KeyIdeasSlide,
  eq: EqSlide
};

// src/slides/getSlideTemplate.js
function getSlideTemplate(type) {
  const template = SlideRegistry[type];
  if (!template) {
    throw new Error(`Unknown slide template type "${type}"`);
  }
  return template;
}

// src/slides/registerSlide.js
function registerSlide(type, renderer) {
  if (SlideRegistry[type]) {
    throw new Error(`Slide type "${type}" is already registered`);
  }
  SlideRegistry[type] = renderer;
}

// src/engines/player/stage.js
function createStage(mount, background = {}) {
  if (!mount) throw new Error("taleem-player: mount is required");
  const root = typeof mount === "string" ? document.querySelector(mount) : mount;
  if (!root) throw new Error("taleem-player: mount element not found");
  root.innerHTML = "";
  const stage = document.createElement("div");
  stage.className = "taleem-player-stage";
  stage.style.position = "relative";
  stage.style.width = "100%";
  stage.style.height = "100%";
  stage.style.overflow = "hidden";
  const bgLayer = document.createElement("div");
  bgLayer.className = "taleem-player-bg";
  bgLayer.style.position = "absolute";
  bgLayer.style.inset = "0";
  bgLayer.style.zIndex = "0";
  bgLayer.style.backgroundRepeat = "no-repeat";
  bgLayer.style.backgroundSize = "cover";
  bgLayer.style.backgroundPosition = "center";
  if (background.backgroundColor) {
    bgLayer.style.backgroundColor = background.backgroundColor;
  }
  if (background.backgroundImage) {
    bgLayer.style.backgroundImage = `url("${background.backgroundImage}")`;
  }
  if (typeof background.backgroundImageOpacity === "number" && background.backgroundImageOpacity < 1) {
    bgLayer.style.opacity = String(background.backgroundImageOpacity);
  }
  const slideLayer = document.createElement("div");
  slideLayer.className = "taleem-player-slides";
  slideLayer.style.position = "relative";
  slideLayer.style.zIndex = "1";
  slideLayer.style.width = "100%";
  slideLayer.style.height = "100%";
  stage.appendChild(bgLayer);
  stage.appendChild(slideLayer);
  root.appendChild(stage);
  function clear() {
    slideLayer.innerHTML = "";
  }
  function destroy() {
    root.innerHTML = "";
  }
  return {
    el: slideLayer,
    clear,
    destroy
  };
}

// src/engines/player/player.js
function createTaleemPlayer({ mount, deck }) {
  const stage = createStage(mount, deck.background);
  let lastSlide = null;
  let lastRenderedKey = null;
  function getSlideAtTime(deck2, time) {
    const slides = deck2.deck;
    for (let i = slides.length - 1; i >= 0; i--) {
      const s = slides[i];
      if (time >= s.start && time < s.end) return s;
    }
    return null;
  }
  function computeRenderState(slide, time) {
    if (!Array.isArray(slide.data)) {
      return {};
    }
    let visibleCount = 0;
    let activeIndex = -1;
    slide.data.forEach((item, index) => {
      if (typeof item.showAt === "number" && time >= item.showAt) {
        visibleCount++;
        activeIndex = index;
      }
    });
    return {
      visibleCount,
      activeIndex
    };
  }
  function renderAt(time) {
    const slide = getSlideAtTime(deck, time);
    if (!slide) {
      stage.clear();
      lastSlide = null;
      lastRenderedKey = null;
      return;
    }
    const renderState = computeRenderState(slide, time);
    const renderKey = `${slide.start}-${renderState.visibleCount}-${renderState.activeIndex}`;
    if (slide !== lastSlide) {
      stage.clear();
      lastSlide = slide;
      lastRenderedKey = null;
    }
    if (renderKey === lastRenderedKey) {
      return;
    }
    const Template = getSlideTemplate(slide.type);
    const slideInstance = Template.fromJSON(slide);
    const html = slideInstance.render(renderState);
    stage.el.innerHTML = html;
    lastRenderedKey = renderKey;
  }
  function destroy() {
    stage.destroy();
  }
  return {
    renderAt,
    destroy
  };
}

// src/engines/browser/browser.js
function createTaleemBrowser({ mount, deck }) {
  if (!mount) {
    throw new Error("taleem-browser: mount is required");
  }
  if (!deck || !Array.isArray(deck.deck)) {
    throw new Error("taleem-browser: valid deck-v1 required");
  }
  const root = typeof mount === "string" ? document.querySelector(mount) : mount;
  if (!root) {
    throw new Error("taleem-browser: mount not found");
  }
  root.innerHTML = `
    <div class="taleem-browser-bg"></div>
    <div class="taleem-browser-slide"></div>
  `;
  const bgEl = root.querySelector(".taleem-browser-bg");
  const slideEl = root.querySelector(".taleem-browser-slide");
  applyBackground(bgEl, deck.background);
  const slides = deck.deck.map((slideJSON, i) => {
    if (!slideJSON.type) {
      throw new Error(`taleem-browser: slide ${i} missing type`);
    }
    const Template = getSlideTemplate(slideJSON.type);
    if (!Template) {
      throw new Error(`taleem-browser: unknown slide type "${slideJSON.type}"`);
    }
    return Template.fromJSON(slideJSON);
  });
  const total = slides.length;
  function render(index, renderState = {}) {
    if (index < 0 || index >= total) return;
    const slide = slides[index];
    slideEl.innerHTML = slide.render(renderState);
  }
  return {
    render,
    getTotal() {
      return total;
    }
  };
}
function applyBackground(el, bg = {}) {
  el.style.position = "absolute";
  el.style.inset = "0";
  el.style.zIndex = "0";
  el.style.backgroundColor = bg.backgroundColor || "#000";
  el.style.backgroundImage = bg.backgroundImage ? `url(${bg.backgroundImage})` : "none";
  el.style.backgroundSize = "cover";
  el.style.backgroundPosition = "center";
  el.style.opacity = bg.backgroundImageOpacity !== void 0 ? bg.backgroundImageOpacity : 1;
}

// src/utils/assignMockTimings.js
function assignMockTimings(goldenDeck, slideDuration = 5) {
  if (!goldenDeck || !Array.isArray(goldenDeck.deck) || typeof slideDuration !== "number") {
    throw new Error("assignMockTimings: invalid deck or slideDuration");
  }
  let currentTime = 0;
  const deckWithTimings = {
    ...goldenDeck,
    deck: goldenDeck.deck.map((slide) => {
      const start = currentTime;
      const end = start + slideDuration;
      currentTime = end;
      const data = Array.isArray(slide.data) ? slide.data.map((item) => ({
        ...item,
        showAt: start + (typeof item.showAt === "number" ? item.showAt : 0)
      })) : slide.data;
      return {
        ...slide,
        start,
        end,
        data
      };
    })
  };
  return deckWithTimings;
}

// src/utils/resolveAssetPaths.js
function resolveAssetPaths(deck, IMG_BASE) {
  if (deck.background?.backgroundImage && typeof deck.background.backgroundImage === "string") {
    deck.background.backgroundImage = IMG_BASE + deck.background.backgroundImage.split("/").pop();
  }
  deck.deck.forEach((slide) => {
    slide.data?.forEach((item) => {
      if (item.name === "image" && typeof item.content === "string") {
        item.content = IMG_BASE + item.content.split("/").pop();
      }
      if (Array.isArray(item.spItems)) {
        item.spItems.forEach((sp) => {
          if (sp.type === "spImage" && typeof sp.content === "string") {
            sp.content = IMG_BASE + sp.content.split("/").pop();
          }
        });
      }
    });
  });
  return deck;
}

// src/utils/resolveBackground.js
function resolveBackground(deck, ASSET_BASE) {
  if (!deck || !deck.background) return deck;
  const bg = deck.background;
  if (typeof bg.backgroundImage === "string" && bg.backgroundImage.length > 0) {
    bg.backgroundImage = ASSET_BASE + bg.backgroundImage.split("/").pop();
  }
  if (bg.backgroundImageOpacity === void 0) {
    bg.backgroundImageOpacity = 1;
  }
  return deck;
}

// src/utils/getDeckEndTime.js
function getDeckEndTime(deck) {
  if (!deck || !deck.deck || deck.deck.length === 0) {
    return 0;
  }
  return deck.deck[deck.deck.length - 1].end;
}
export {
  assignMockTimings,
  createTaleemBrowser,
  createTaleemPlayer,
  getDeckEndTime,
  registerSlide,
  resolveAssetPaths,
  resolveBackground
};
