import socket
import sys
import os
import time
import random

def report():
  ns = sys.argv[1];
  host = socket.gethostname();
  ip = socket.gethostbyname(host)
  url = 'https://wt-983c23213f4e911f6f4b0a243568b6d5-0.run.webtask.io/service-registry'

  url += "?ns=%s&host=%s&ip=%s" % (ns, host, ip)

  print(url);
  os.system("curl '%s'" % (url) )
  print("\n")

  return

while True:
  report()
  sleep_interval = random.uniform(0, 15)
  time.sleep(sleep_interval)
