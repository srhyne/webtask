/**
* @param context {WebtaskContext}
*/
module.exports = function(ctx, cb) {
  var q = ctx.query || {};
  
  console.log(ctx)
  
  console.log(q);
 
  if( !q.host || !q.ip || !q.ns ){
    return ctx.storage.get(function(error, data){
     data = data || {};
     return cb(null, {
       status : 'ok',
       data : data
     });
     
   });
  }
  
  var name = q.host;
  var ip = q.ip;
  var ns = q.ns;
  var ts = (new Date().getTime()) / 10000;
  
  var key = [q.host, q.ns].join('.');
  
  
   ctx.storage.get(function (error, data) {
      if (error) return cb(error);
      data = data || {};
      
      data[key] = { name, ip, ns, ts };
      
      var attempts = 3;
      ctx.storage.set(data, function set_cb(error) {
        if (error) {
            if (error.code === 409 && attempts--) {
                // resolve conflict and re-attempt set
                data.counter = Math.max(data.counter, error.conflict.counter) + 1;
                return ctx.storage.set(data, set_cb);
            }
            return cb(error); 
        }
        
        cb(null, {
          status : 'ok',
          data : data
        });
        
      });
   });
  
  
};