const Adapter = require.main.require('hubot/src/adapter');

/**
 * Line bot adapter for Hubot.
 */
class Line extends Adapter {

  constructor(robot) {
    super(robot);
    this.robot.logger.info('Constructor');
  }

  run() {
    this.robot.logger.info('Run');
    this.emit('connected');
  }
}

module.exports = Line;
