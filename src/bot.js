const Adapter = require.main.require('hubot/src/adapter');
const { validateSignature } = require('@line/bot-sdk');

/**
 * Line bot adapter for Hubot.
 */
class Line extends Adapter {

  constructor(robot, config) {
    super(robot);
    this.robot.logger.info('Constructor');

    this.config = config;
    this.listenWebhook();
  }

  run() {
    this.robot.logger.info('Run');
    this.emit('connected');
  }

  listenWebhook() {
    this.robot.router.post('/hubot/webhook',  (req, res) => {
      if (validateSignature(JSON.stringify(req.body), this.config.channelSecret, this.config.channelAccessToken)) {
        res.send(401, 'invalid signature');
        return;
      }
      console.log(req.body.events);
      res.sendStatus(200);
    });
  }
}

module.exports = Line;
