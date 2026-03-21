import { createSilentTimer, createAudioTimer } from "/js/taleem-player-app.esm.js";

export async function getTimer(deckSlug, deck) {

  async function exists(url){
    try{
      const res = await fetch(url, { method: "HEAD" });
      return res.ok;
    }catch{
      return false;
    }
  }

  const opus = `/content/audio/${deckSlug}.opus`;
  const ogg  = `/content/audio/${deckSlug}.ogg`;   // ✅ added
  const mp3  = `/content/audio/${deckSlug}.mp3`;

  if(await exists(opus)){
    return createAudioTimer({ url: opus, Howl });
  }

  if(await exists(ogg)){   // ✅ added
    return createAudioTimer({ url: ogg, Howl });
  }

  if(await exists(mp3)){
    return createAudioTimer({ url: mp3, Howl });
  }

  if(deck && deck.audio){
    return createAudioTimer({ url: deck.audio, Howl: window.Howl });
  }

  return createSilentTimer();
}