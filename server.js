require("dotenv").config();
const path = require("path");
const grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');

const {
    StartNV2000,
    EnableNV200,
    DisableNV200,
    DisconnectNV200,
    MonitorEvent
} = require("./controller/NV200");

const PROTO_PATH = path.resolve(__dirname, "./protos/nv200.proto");
const HOSTPORT = "0.0.0.0:" + process.env.PORT;

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const newsProto = grpc.loadPackageDefinition(packageDefinition);


function main() {
    const server = new grpc.Server();
    server.addService(newsProto.NV200Service.service, {
        StartNV2000:StartNV2000,
        EnableNV200:EnableNV200,
        DisableNV200:DisableNV200,
        DisconnectNV200:DisconnectNV200,
        MonitorEvent:MonitorEvent
    });
    server.bindAsync(HOSTPORT, grpc.ServerCredentials.createInsecure(),
        () => {
            server.start();
            console.log(`NV200 GRPC service running @ ${HOSTPORT}`);
        })
}

main();
