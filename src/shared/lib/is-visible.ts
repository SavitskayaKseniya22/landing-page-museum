export default function isVisible(elem: HTMLElement | null) {
  if (!elem) return false;
  const coords = elem.getBoundingClientRect();
  const windowHeight = document.documentElement.clientHeight;
  return coords.bottom > 0 && coords.top < windowHeight;
}
