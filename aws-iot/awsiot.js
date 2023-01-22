// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
var awsIot = require('aws-iot-device-sdk');

//
// Replace the values of '<YourUniqueClientIdentifier>' and '<YourCustomEndpoint>'
// with a unique client identifier and custom host endpoint provided in AWS IoT.
// NOTE: client identifiers must be unique within your AWS account; if a client attempts
// to connect with a client identifier which is already in use, the existing
// connection will be terminated.
//
var device = awsIot.device({
   keyPath: "C:/Users/hazal/OneDrive/Masaüstü/Software/aws/aws-iot/aws-certificates/8a31adfb91f7629f41845c7bf94c366d9ad926f37ae50df7acb65cacdba794a5-private.pem.key",
  certPath: "C:/Users/hazal/OneDrive/Masaüstü/Software/aws/aws-iot/aws-certificates/8a31adfb91f7629f41845c7bf94c366d9ad926f37ae50df7acb65cacdba794a5-certificate.pem.crt",
    caPath: "C:/Users/hazal/OneDrive/Masaüstü/Software/aws/aws-iot/aws-certificates/AmazonRootCA1.pem",
  clientId: "hazal_javascript",
      host: "a1lhxt6uhfa5o7-ats.iot.eu-central-1.amazonaws.com"
});

device
  .on('connect', function() {
    console.log('connect');
    device.subscribe('Publish_Test');
    device.publish('Test', JSON.stringify({ test_data: 1}));
  });

device
  .on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
  });