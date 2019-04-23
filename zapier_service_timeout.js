var output = {
  cf_dns_zone : "53e71f7f39c61ff56184389c6733c1c6",
  ns : "vmc.conveyour.com",
  // CF ID for A record for vmc.conveyour.com
  ns_id : "1f7102a2a0c33621d6c6c01e85dbd7f2",
 
  test_ns : "ny-vmc.conveyour.com",
  
  // CF ID for A record for ny-vmc.conveyour.com
  test_ns_id : "a972e3a6155f63f12b12f7fb5b57f41a",
 
  //default IP address that vmc.conveyour.com points to
  proxy_primary : "vproxy",
  proxy_primary_ip : "107.170.194.18",
  
  //backup IP address that vmc.conveyour.com might point to
  proxy_secondary : "ny-vproxy1",
  proxy_secondary_ip : "67.205.134.242",
  
  //how many seconds can pass before we start the process of switching IP's
  proxy_timeout : 120
  
};

var i = inputData;
var m_proxy = (i.host == output.proxy_primary);
var m_ns = (i.ns == output.ns);
var m_ip = (i.ip == output.proxy_primary_ip);
var m_interval = (i.interval > output.proxy_timeout);

output.replace_proxy = m_proxy && m_ns && m_ip && m_interval;
