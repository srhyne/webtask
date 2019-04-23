import socket
import sys
import os
import time
import random

def arg( index, default ):
  try:
    a = sys.argv[index]
  except IndexError:
    a = default
  return a

print( arg(1, 'nothing') )


def report():
  ns = arg(1, '')

  if not ns:
    print("Must provide a namespace like example.com")
    return

  ip = arg(2, '')

  if not ip:
    print("Must provide this host's public IP")
    return

  host = socket.gethostname();
  url = 'https://wt-983c23213f4e911f6f4b0a243568b6d5-0.run.webtask.io/service-registry'

  url += "?ns=%s&host=%s&ip=%s" % (ns, host, ip)

  print(url);
  os.system("curl '%s'" % (url) )
  print("\n")

  return

report()

mode = arg(3, '')

if( mode == 'worker' ):
  while True:
    sleep_interval = random.uniform(0, 15)
    time.sleep(sleep_interval)
    report()

