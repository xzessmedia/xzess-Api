#!/bin/sh
echo Launching API Server
cd /home/apiuser/api/ && pm2 start dist/server/server.js
pm2 logs 0