export default (color) => {
  if(color.length == 9) return formatRgba(color);
  return formatRgb(color);
}

const formatRgba = (rgba) => {
  const r = rgba.slice(1, 3);
  const g = rgba.slice(3, 5);
  const b = rgba.slice(5, 7);
  const a = rgba.slice(7, 9);
  const opacity = parseInt(a, 16) / 255;

  return {
    color: `#${r}${g}${b}`,
    opacity: opacity
  };
}

const formatRgb = (rgb) => {
  return {
    color: rgb,
    opacity: 1
  };
}
