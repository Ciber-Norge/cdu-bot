const Slack = require('node-slack');
const getSchedule = require('./getSchedule');
const co = require('co');
const express = require('express');

const url = process.env['SLACK_URL'];


const slack = new Slack(url);



co(function*(){
  const schedule = yield getSchedule();
    
  schedule
  .filter(talk => talk.date > new Date())
  .forEach(function(talk){
    
    setTimeout(function(){
      slack.send({
          text: `${talk.time}: *${talk.title}* (_${talk.speaker}_)`,
          channel: '#general'
      });
    }, talk.date - new Date());
  });
  
  const app = express();
  
  app.use(require('body-parser').urlencoded({extended:true}));
  
  app.get('/', function(req, res){
    res.end('hello');
  });
  
  app.post('/slack', function(req, res){
    var json = JSON.parse(req.body);
    
    const sentence = json.text.split(/\s+/);
    
    const trigger = sentence.shift();
    const keyword = sentence.shift();
    
    if(keyword == 'program'){
        res.end(JSON.stringify({
          text: schedule.map(talk => `${talk.time}: *${talk.title}* (_${talk.speaker}_)`).join('\n')
        }));
    }else{
        res.end(JSON.stringify({
          text: 'whut?'
        }));
    }
    
  });
  
  app.listen(8080);
});


process.on('SIGINT', () => process.exit());