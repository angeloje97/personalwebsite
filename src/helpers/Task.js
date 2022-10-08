export const Delay = (millis) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), millis);
  });
};
