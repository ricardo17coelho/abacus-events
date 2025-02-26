import confetti from 'canvas-confetti';

function basic() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    zIndex: 900,
  });
}

function randomDirection() {
  confetti({
    angle: randomInRange(55, 125),
    spread: randomInRange(50, 70),
    particleCount: randomInRange(50, 100),
    origin: { y: 0.6 },
    zIndex: 900,
  });
}

function makeItRain() {
  const end = Date.now() + 2 * 1000;

  // go Buckeyes!
  const colors = ['#bb0000', '#ffffff'];

  function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
      zIndex: 900,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
      zIndex: 900,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }
  frame();
}

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function fireworks() {
  const duration = 15 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
}

export default function useConfetti() {
  return { basic, randomDirection, makeItRain, randomInRange, fireworks };
}
