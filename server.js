require("dotenv").config();
const auth = require("@malijs/metadata-auth");
const path = require("path");
const Mali = require("mali");

const {
    StartNV2000,
    DisableNV200,
    DisconnectNV200,
    MonitorEvent
} = require("./controller/NV200");


const PROTO_PATH = path.resolve(__dirname, "./protos/nv200.proto");
const HOSTPORT = "localhost:" + process.env.PORT;

let app;

function main() {
  app = new Mali(PROTO_PATH, "NV200Service");
    app.use({
        StartNV2000,
        DisableNV200,
        DisconnectNV200,
        MonitorEvent
    });
  app.start(HOSTPORT);
  console.log(`NV200 GRPC service running @ ${HOSTPORT}`);
}
/*
async function shutdown(err) {
  if (err) console.error(err);
  await app.close();
  process.exit();
}

process.on("uncaughtException", shutdown);
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
*/
main();
