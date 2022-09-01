FROM xzesstence/xzess-ubuntu:nodejs-16.0

MAINTAINER Tim Koepsel

# Create app directory
RUN cd /home && mkdir -p apiuser && cd apiuser && mkdir -p api && cd api && mkdir -p logs && \
mkdir -p dist && \
touch /home/apiuser/api/logs/server.log

#RUN useradd -u 8877 apiuser
# Change to non-root privilege
#USER apiuser

WORKDIR /home/apiuser/api
ADD prisma /home/apiuser/api/prisma

ADD dist /home/apiuser/api/dist
ADD public /home/apiuser/api/public
ADD package.json /home/apiuser/api/package.json
ADD pulldb.ts /home/apiuser/api/pulldb.ts
ADD tsconfig.json /home/apiuser/api/tsconfig.json
ADD config.ts /home/apiuser/api/config.ts
ADD build.ts /home/apiuser/api/build.ts
ADD .env /home/apiuser/api/.env
RUN mkdir -p /home/apiuser/api/uploads
ADD server /home/apiuser/api/server
ADD data /home/apiuser/api/data
ADD docker-entrypoint.sh /docker-entrypoint.sh
RUN cd /home/apiuser/api/ && npm install

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=3500

EXPOSE ${PORT}
RUN cd /home/apiuser/api/ && npm install

RUN cd / && chmod +x docker-entrypoint.sh
ENTRYPOINT /docker-entrypoint.sh