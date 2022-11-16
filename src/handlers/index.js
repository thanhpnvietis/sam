const AWS = require("aws-sdk");

exports.handler = async (event, context, callback) => {
  const ec2 = new AWS.EC2({ region: event.instanceRegion });
  const rds = new AWS.RDS();
  let instanceIdRDS = "database-1";
  let instanceIdEC2 = "i-0018b520ef528d28d";
  if (event.action === "start") {
    ec2
      .startInstances({ InstanceIds: [instanceIdEC2] })
      .promise()
      .then(() => `Successfully started ${instanceIdEC2}`)
      .catch((err) => console.log(err));
    rds.stopDBInstance(
      { DBInstanceIdentifier: instanceIdRDS },
      function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
      }
    );
  } else if (event.action === "stop") {
    ec2
      .stopInstances({ InstanceIds: [instanceIdEC2] })
      .promise()
      .then(() => `Successfully stopped ${instanceIdEC2}`)
      .catch((err) => console.log(err));
    rds.stopDBInstance(
      { DBInstanceIdentifier: instanceIdRDS },
      function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log(data);
      }
    );
  }
};
