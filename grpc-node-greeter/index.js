const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const proto = protoLoader.loadSync(path.join(__dirname, "..", "greeter.proto"));
const definition = grpc.loadPackageDefinition(proto);

const greetMee = (call, callback) => {
  callback(null, { reply: `Heyss ${call.request.name}!` });
};

const server = new grpc.Server();
server.addService(definition.GreeterService.service, { greetMee });
server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), port => {
  server.start();
});
