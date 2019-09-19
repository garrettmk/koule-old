export function daysBack(count = 1) {
  const days = 1000 * 60 * 60 * 24 * count;
  const timestamp = Math.floor(Date.now() / days) * days;
  return new Date(timestamp);
}