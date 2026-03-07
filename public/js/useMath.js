
export function useMath(rootEl) {

  if (!rootEl) return;

  if (typeof renderMathInElement !== "function") return;

  renderMathInElement(rootEl, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false }
    ],
    throwOnError: false
  });

}