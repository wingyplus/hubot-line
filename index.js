const Line = require("./src/bot");

const config = {
  channelAccessToken: process.env.HUBOT_LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.HUBOT_LINE_CHANNEL_SECRET,
};

module.exports.use = (robot) => new Line(robot, config);
