const config = require("../config.json");

export const database = {
  url: `mongodb+srv://${config.username}:${config.password}@${config.cluster}/?retryWrites=true&w=majority`,
};
