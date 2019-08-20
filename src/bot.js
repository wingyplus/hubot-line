const Adapter = require.main.require('hubot/src/adapter');
const { TextMessage } = require.main.require('hubot/src/message');
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

    this.robot.on("event", (event) => {
      // TODO: huge refactor!
      this.robot.logger.info('[on event] receive event');
      if (event.type !== 'message') {
        this.robot.logger.info('[on event] this is not our interesting now.');
        return;
      }
      const message = event.message;
      if (message.type === 'text') {
        this.robot.logger.info('[on event] receive text message')
        this.robot.receive(new TextMessage(event.source.userId, message.text, message.id));
      }
    });
    this.emit('connected');
  }

  listenWebhook() {
    this.robot.router.post('/hubot/webhook',  (req, res) => {
      if (validateSignature(JSON.stringify(req.body), this.config.channelSecret, this.config.channelAccessToken)) {
        res.send(401, 'invalid signature');
        return;
      }
      console.log(req.body.events);

      req.body.events.forEach((event) => this.robot.emit("event", event));
      res.sendStatus(200);
    });
  }
}

module.exports = Line;
