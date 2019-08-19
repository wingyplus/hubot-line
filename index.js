const { Line } = require("./src/bot");

module.exports = {
  use(robot) { return new Line(robot); }
};
