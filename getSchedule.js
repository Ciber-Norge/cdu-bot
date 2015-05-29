var request = require('request-promise');
var co = require('co');

module.exports = co.wrap(function * (){
  var body = yield request('http://cdu.herokuapp.com/api/talks/tracks');
  var json = JSON.parse(body);
  var program = json.Fredag.program;

  var times = Object.keys(program);

  var talks = times.map(function(time){
    var talk = program[time];
    talk.time = time;
    talk.date = new Date('2015-05-29T'+time+':00+0200');
    return talk;
  }).sort(function(a, b){
    return a.date.toISOString().localeCompare(b.date.toISOString());
  });

  return talks;  
});