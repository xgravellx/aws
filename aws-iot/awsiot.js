// AWS IoT SDK for JavaScript'i dahil edin

var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
    keyPath: <YourPrivateKeyPath>,
   certPath: <YourCertificatePath>,
     caPath: <YourRootCACertificatePath>,
   clientId: <YourUniqueClientIdentifier>,
       host: <YourCustomEndpoint>
 });
 
 device.on('connect', function() {
    console.log('connect')
    device.subscribe('topic_1'),
    device.publish('topic_2', JSON.stringify({ test_data: 1})),
});

device
  .on('message', function(topic, payload) {
    console.log('message', topic payload.toString())
  });
