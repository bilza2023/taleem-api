function getTimer({ audioUrl }) {
    if (audioUrl) {
      return createHowlerTimer(audioUrl);
    }
    return new Timer();
  }
  