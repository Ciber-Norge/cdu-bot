var Slack = require('node-slack');

var url = 'https://hooks.slack.com/services/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';


var slack = new Slack(url);


slack.send({
    text: 'Hei fra Danmark!',
    channel: '#general',
    username: 'Hilsen Alexks'
});