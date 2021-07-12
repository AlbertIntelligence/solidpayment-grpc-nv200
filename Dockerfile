FROM ubuntu:20.04
RUN  apt-get update \
  && apt-get install -y wget  xz-utils python3\
  && rm -rf /var/lib/apt/lists/*
RUN wget https://nodejs.org/dist/v11.0.0/node-v11.0.0-linux-x64.tar.xz
RUN tar -C /usr/local --strip-components 1 -xJf node-v11.0.0-linux-x64.tar.xz
WORKDIR /app/
COPY . /app/


RUN npm i encrypted-smiley-secure-protocol
RUN npm i @grpc/grpc-js
RUN npm install 

ENV PORT=50055
ENV COM_PORT=/dev/ttyACM0

EXPOSE 50055
CMD ["npm","run","start","--bind","0.0.0.0"]
