export function getDeckEndTime(deck) {
  if (!deck?.deck?.length) return 0;

  const last = deck.deck[deck.deck.length - 1];
  return typeof last.end === "number" ? last.end : 0;
}
