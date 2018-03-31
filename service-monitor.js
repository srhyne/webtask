var request = require('request@2.85.0');

/**
* @param context {WebtaskContext}
*/
module.exports = function(context, cb) {
  
  var q = context.query || {}
  var _2min = 60 * 60 * 2;
  var timeout = q.timeout || _2min;
  
  var url = 'https://wt-983c23213f4e911f6f4b0a243568b6d5-0.run.webtask.io/service-registry';
  
  request(url, function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
  
    body = JSON.parse(body);
    if( !body ){
      return cb(null, { status : 'failed', message : 'cannot retrieve hosts' });
    }
    
    hosts = body.data;
    
    var current_ts = ( new Date().getTime() ) / 1000;
  
    var stale = {};
  
    Object.keys(hosts).forEach( (key) => {
      var host = hosts[key];
      var ts = host.ts || 0;
      var _timeout = (current_ts - ts);
      
      if( _timeout > timeout  ){
        host.timeout = _timeout;
        stale[key] = host;
      }
    });
    
    cb(null, stale);
  
    
    // cb(null,  );
    
 });

};