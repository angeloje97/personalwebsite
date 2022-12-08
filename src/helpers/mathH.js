export const clamp = (value, min, max) => {
  let result = value;

  if (value < min) {
    result = min;
  }

  if (value > max) {
    result = max;
  }

  return result;
};
