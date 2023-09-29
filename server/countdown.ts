let countdownId: NodeJS.Timeout;
let active = true;

export function startCountdown(time: number) {
  if (countdownId) {
    clearTimeout(countdownId);
    active = true;
  }

  countdownId = setTimeout(() => {
    active = false;
  }, time);

  console.log(`Set countdown to ${time / 1000} seconds.`);
}

export function getIsCountdownActive() {
  return active;
}
