FROM ubuntu:20.04
RUN  apt-get update \
  && apt-get install -y wget  xz-utils python build-essential make g++ \
  && rm -rf /var/lib/apt/lists/*
RUN wget https://nodejs.org/dist/v16.0.0/node-v16.0.0-linux-x64.tar.xz
RUN tar -C /usr/local --strip-components 1 -xJf node-v16.0.0-linux-x64.tar.xz
WORKDIR /app/
COPY . /app/

RUN npm install -g npm@7.19.1
RUN npm i serialport
RUN npm i @grpc/grpc-js
RUN npm i aes-js
RUN npm i chalk
RUN npm install 

ENV PORT=50055
ENV COM_PORT=/dev/ttyACM0

EXPOSE 50055
CMD ["npm","run","start","--bind","0.0.0.0"]
