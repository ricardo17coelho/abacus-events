import confetti from 'canvas-confetti';

function basic() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

function randomDirection() {
  confetti({
    angle: randomInRange(55, 125),
    spread: randomInRange(50, 70),
    particleCount: randomInRange(50, 100),
    origin: { y: 0.6 }
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
      colors: colors
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
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

export default function useConfetti() {
  return { basic, randomDirection, makeItRain, randomInRange };
}
