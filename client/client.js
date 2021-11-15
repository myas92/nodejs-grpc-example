const path = require("path");
const PROTO_PATH = path.join(__dirname,'..','greeter.proto')
// const PROTO_PATH = __dirname + '/proto/employee.proto';

const grpc = require("@grpc/grpc-js");
const protoLoader = require('@grpc/proto-loader');

const proto =protoLoader.loadSync(path.join(__dirname,'..','greeter.proto'))
const packageDefinition = grpc.loadPackageDefinition(proto)

// const packageDefinition = grpc.loadPackageDefinition(PROTO_PATH);
// let packageDefinition = protoLoader.loadSync(
//     PROTO_PATH,
//     {keepCase: true,
//      longs: String,
//      enums: String,
//      defaults: true,
//      oneofs: true
//     });

let employee_proto = grpc.loadPackageDefinition(packageDefinition).employee;

function main() {
  let client = new employee_proto.Employee('localhost:4500',
                                       grpc.credentials.createInsecure());
  let employeeId;
  if (process.argv.length >= 3) {
    employeeId = process.argv[2];
  } else {
    employeeId = 1;
  }
  client.getDetails({id: employeeId}, function(err, response) {
    console.log('Employee Details for Employee Id:',employeeId,'\n' ,response.message);
  });
}

main();