window.addEventListener('DOMContentLoaded', () => {
  const sprite = document.querySelector('.pixel-art-sprite');
  if (!sprite) return;

  // Play row 1
  sprite.classList.add('play-row-1');

  // After row 1 animation (0.5s), play row 2 for 5s
  setTimeout(() => {
    sprite.classList.remove('play-row-1');
    sprite.classList.add('play-row-2');

    // After 5s, play row 3
    setTimeout(() => {
      sprite.classList.remove('play-row-2');
      sprite.classList.add('play-row-3');

      // After row 3 animation (0.5s), remove play-row-3 if you want to stop on last frame
      setTimeout(() => {
        // Optionally keep the last frame, or reset to idle
        // sprite.classList.remove('play-row-3');
      }, 500);
    }, 5000);
  }, 500);
});