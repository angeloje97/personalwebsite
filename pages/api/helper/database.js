const cluster = process.env.cluster;
const username = process.env.username;
const password = process.env.password;
const name = process.env.name;

export const database = {
  url: `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`,
  name: name,
};
