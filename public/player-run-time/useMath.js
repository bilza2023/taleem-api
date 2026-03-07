import renderMathInElement from "katex/contrib/auto-render";

export function useMath(rootEl) {
  if (!rootEl) return;

  renderMathInElement(rootEl, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false }
    ],
    throwOnError: false
  });
}
