const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const letters = "abcdefghijklmnopqrstuvwxyz";

export const randomString = (length = 10) => {
  let result = "";

  for (let i = 0; i < length; i++) {
    const list = Math.random() > 0.5 ? numbers : letters;

    const index = Math.floor(Math.random() * list.length);

    if (typeof list[index] === "number") {
      result += list[index];
      continue;
    }

    result += Math.random() > 0.5 ? list[index] : list[index].toUpperCase();
  }

  return result;
};
