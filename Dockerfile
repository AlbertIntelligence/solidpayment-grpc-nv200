FROM node:10
WORKDIR /app/piggycoin-exchange-grpc-nv200
COPY package*.json /app/piggycoin-exchange-grpc-nv200/
RUN npm install -g npm
RUN npm install 
RUN npm i @grpc/grpc-js
RUN npm i encrypted-smiley-secure-protocol

COPY . /app/piggycoin-exchange-grpc-nv200/

ENV PORT=50055
ENV COM_PORT=COM1

EXPOSE 50055
CMD ["npm","run","start","--bind","0.0.0.0"]
