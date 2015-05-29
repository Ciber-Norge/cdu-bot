var Slack = require('node-slack');
var getSchedule = require('./getSchedule');

var url = 'https://hooks.slack.com/services/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';


var slack = new Slack(url);




getSchedule(function(error, schedule){
    
  schedule.filter(function(talk){
    return talk.date > new Date();
  }).forEach(function(talk){
    
    setTimeout(function(){
      slack.send({
          text: talk.time+': *'+talk.title+'* (_'+talk.speaker+'_)',
          channel: '#general'
      });
    }, talk.date - new Date());
  });
  
});