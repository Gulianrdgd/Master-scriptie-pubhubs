#!/usr/bin/env bash

# Note that the irma (yivi) server will not be publicly accessible (only through a proxy hosted by the hub), so using --allow-unsigned-callbacks should be safe
irma server --issue-perms "*" --production --no-email --no-tls --sse --allow-unsigned-callbacks --no-auth -l 0.0.0.0 -p 8089 --client-listen-addr 0.0.0.0 --client-port 8088 -vvvvvvvvv &

# TODO: The pip part is an ugly hack, should be fixed in the future
pip install livekit livekit-api
livekit-server --config /conf/livekit.yaml &


if [ $DONT_START_HUB -eq 1 ]
then
  echo 'Will not start the hub. Do so manually by running ./start.py from inside the container'
  sleep infinity
  exit 0
fi


./start.py
