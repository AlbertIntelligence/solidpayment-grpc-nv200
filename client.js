var path = require("path");
const protoLoader = require("@grpc/proto-loader");
const grpc = require("grpc");

const PROTO_PATH = path.resolve(__dirname, "./protos/nv200.proto");

const pd = protoLoader.loadSync(PROTO_PATH);
const loaded = grpc.loadPackageDefinition(pd);
const hello_nv200 = loaded.nv200;

function main() {
  var client = new hello_nv200.NV200Service(
    "localhost:50055",
    grpc.credentials.createInsecure()
  );
  

    client.StartNV2000(
        {},
          function (err, response) {
            console.log(response);
          }
    );
    
    client.MonitorEvent(
        {},
          function (err, response) {
            console.log(response);
          }
  );
    
  /*
  client.CreateUserInterac(
    {
      firstName: "monsieru",
      lastName: "rater",
      companyName: null,
      email: "samuel@gmail.com"
      },
      metadata,
    function (err, response) {
      console.log(response);
    }
  );
  /*
    client.CreateUserEFT(
      {
        firstName: "GOGO",
        lastName: "SAME",
        companyName: null,
        email: "TEST@gmail.com",
        institutionNumber: "111",
        transitNumber: "54432",
        accountNumber: "1234567",
      },
      function (err, response) {
        console.log(response);
      }
    );*/
  /*
    client.GetUser(
      {
        //implementation not finish but working
        key: "654321",
        userId: "ceb0fb9d-9012-4afc-acb7-47bb3ac9bac5",
      },
      function (err, response) {
        console.log(response);
      }
    );*/
  /*
  client.CreateTransactionInterac(
    {
      ZumRailsType: "AccountsReceivable",
      TransactionMethod: "Interac",
      Amount: 105.52,
      Memo: "Memo description",
      Comment: "This transaction is just a test from an user to wallet",
      companyName: "Example Company",
      email: "ddsadasdadsad@gmail.com",
      WalletId: "32363f11-85b8-4fd1-a031-c3a5cca97197",
      InteracHasSecurityQuestionAndAnswer: true,
      InteracSecurityQuestion: "you know gfff",
      InteracSecurityAnswer: "zofdsfsdfsd",
    },
    function (err, response) {
      console.log(response);
    }
  );*/
  /*
    client.GetWallet(
      {
        walletNumber: 0,
      },
      function (err, response) {
          console.log(response);
      }
    );*/
}

main();
