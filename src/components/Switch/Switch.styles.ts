const pxToRem = (px, oneRemPx = 17) => `${px / oneRemPx}rem`;

export const useCustomSwitch = (theme, color) => {
  const heightInPX = 25;
  const sizeInPX = 15;
  const width = pxToRem(56);
  const height = pxToRem(heightInPX);
  const size = pxToRem(sizeInPX);
  const gap = (heightInPX - sizeInPX) / 2;
  return {
    root: {
      width,
      height,
      padding: 0,
      margin: theme.spacing(1),
      overflow: "unset",
    },
    switchBase: {
      padding: pxToRem(gap),
      "&$checked": {
        color: "#fff",
        transform: `translateX(calc(${width} - ${size} - ${pxToRem(2 * gap)}))`,
        "& + $track": {
          backgroundColor: "#fff",
          opacity: 1,
          border: "none",
        },
        "& $thumb": {},
      },
    },
    track: {
      borderRadius: 40,
      backgroundColor: "#fff",
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
    },
    thumb: {
      boxShadow: "none",
      backgroundColor: color,
      width: size,
      height: size,
    },
    checked: {},
  };
};
