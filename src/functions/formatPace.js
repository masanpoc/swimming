export default function formatPace(duration) {
  let minutes = Math.floor(duration / 60);
  let seconds =
    (duration % 60).toString().length > 1 ? duration % 60 : `0${duration % 60}`;
  return `${minutes}:${seconds}`;
}
