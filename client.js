const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./protos/nv200.proto";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const NV200Service = grpc.loadPackageDefinition(packageDefinition).NV200Service;


const client = new NV200Service(
    "localhost:50055",
    grpc.credentials.createInsecure()
);
  
/*
client.StartNV2000({}, (error, deviceStatus) => {
    if (!error) throw error
      console.log(deviceStatus);
  });*/
  /*
  client.EnableNV200({}, (error, deviceStatus) => {
    if (!error) throw error
      console.log(deviceStatus);
  });
  /*
client.DisableNV200({}, (error, deviceStatus) => {
    if (!error) throw error
    console.log(deviceStatus);
});*/