export function getRandomNumberUnique(length) {
  const randomNumber = Math.random();
  const dateNow = Date.now();
  const numeroServicio = randomNumber + dateNow;
  const reducedNumber = numeroServicio.toFixed(0).slice(0, length);

  return reducedNumber;
}
