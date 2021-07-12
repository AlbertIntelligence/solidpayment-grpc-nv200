
docker build -t piggycoin-exchange-grpc-nv200 .
docker run -t -i --device=/dev/ttyACM0 -p 50055:50055 piggycoin-exchange-grpc-nv200
