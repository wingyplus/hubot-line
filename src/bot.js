const { Adapter } = require.main.require('hubot');

/**
 * Line bot adapter for Hubot.
 */
class Line extends Adapter {

  constructor() {
    super();
    this.robot.logger.info('Constructor');
  }

  run() {
    this.robot.logger.info('Run');
    this.emit('connected');
  }
}

module.exports = { Line };
