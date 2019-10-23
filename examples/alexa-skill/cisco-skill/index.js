// -*- coding: utf-8 -*-

// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.

// Licensed under the Amazon Software License (the "License"). You may not use this file except in
// compliance with the License. A copy of the License is located at

//    http://aws.amazon.com/asl/

// or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific
// language governing permissions and limitations under the License.

'use strict';

// Replace with the serial number of your Cisco Room kit.
let serialNumber = "FOC1825N8G4";

let request = require("request-promise");
let AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});

let AlexaResponse = require("./alexa/skills/smarthome/AlexaResponse");


exports.handler = async function(event, context) {

    // Dump the request for logging - check the CloudWatch logs
    console.log("index.handler request  -----");
    console.log(JSON.stringify(event));

    if (context !== undefined) {
        console.log("index.handler context  -----");
        console.log(JSON.stringify(context));
    }

    // Validate we have an Alexa directive
    if (!('directive' in event)) {
        let aer = new AlexaResponse({
            "name": "ErrorResponse",
            "payload": {
                "type": "INVALID_DIRECTIVE",
                "message": "Missing key: directive, Is request a valid Alexa directive?"
            }
        });
        return sendResponse(aer.get());
    }

    // Check the payload version
    if (event.directive.header.payloadVersion !== "3") {
        let aer = new AlexaResponse({
            "name": "ErrorResponse",
            "payload": {
                "type": "INTERNAL_ERROR",
                "message": "This skill only supports Smart Home API version 3"
            }
        });
        return sendResponse(aer.get())
    }

    let namespace = ((event.directive || {}).header || {}).namespace;

    if (namespace.toLowerCase() === 'alexa.authorization') {
        let aar = new AlexaResponse({
            "namespace": "Alexa.Authorization",
            "name": "AcceptGrant.Response",
        });
        return sendResponse(aar.get());
    }

    if (namespace.toLowerCase() === 'alexa.discovery') {

        let token = event.directive.payload.scope.token;

        console.log("index.webex API request -----");

        var optionsgetmsg = {
            url: 'https://api.ciscospark.com/v1/devices?serial=' + serialNumber,
            method: 'GET', // do GET
            headers: {
                Authorization: 'Bearer ' + token
            }
        };

        try {
            var result = await request(optionsgetmsg);
        } catch (err) {
            console.log(err);
            return err;
        }

        var jsonObject = JSON.parse(result);
        let deviceId = jsonObject.items[0].id;

        let adr = new AlexaResponse({
            "namespace": "Alexa.Discovery",
            "name": "Discover.Response"
        });
        let capability_alexa = adr.createPayloadEndpointCapability();
        let capability_alexa_powercontroller = adr.createPayloadEndpointCapability({
            "interface": "Alexa.PowerController",
            "supported": [{
                "name": "powerState"
            }]
        });
        adr.addPayloadEndpoint({
            "friendlyName": "cisco room kit",
            "endpointId": deviceId,
            "capabilities": [capability_alexa, capability_alexa_powercontroller]
        });
        return sendResponse(adr.get());
    }

    if (namespace.toLowerCase() === 'alexa.powercontroller') {
        let power_state_value = "OFF";
        let command = 'Standby.Activate';

        let endpoint_id = event.directive.endpoint.endpointId;
        let token = event.directive.endpoint.scope.token;
        let correlationToken = event.directive.header.correlationToken;

        if (event.directive.header.name === "TurnOn") {
            command = 'Standby.Deactivate';
            power_state_value = "ON";
        }

        var optionsgetmsg = {
            url: 'https://api.ciscospark.com/v1/xapi/command/' + command,
            method: 'POST', // do POST
            json: true,
            body: {
                "arguments": {},
                "deviceId": endpoint_id
            },
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        try {
            var result = await request(optionsgetmsg);
        } catch (err) {
            console.log(err);
            return err;
        }

        let ar = new AlexaResponse({
            "correlationToken": correlationToken,
            "token": token,
            "endpointId": endpoint_id
        });
        
        ar.addContextProperty({
            "namespace": "Alexa.PowerController",
            "name": "powerState",
            "value": power_state_value
        });

        // Check for an error when setting the state
        let state_set = sendDeviceState(endpoint_id, "powerState", power_state_value);
        if (!state_set) {
            return new AlexaResponse({
                "name": "ErrorResponse",
                "payload": {
                    "type": "ENDPOINT_UNREACHABLE",
                    "message": "Unable to reach endpoint database."
                }
            }).get();
        }

        return sendResponse(ar.get());
    }

};

function sendResponse(response) {
    // TODO Validate the response
    console.log("index.handler response -----");
    console.log(JSON.stringify(response));
    return response
}

function sendDeviceState(endpoint_id, state, value) {
    let dynamodb = new AWS.DynamoDB({
        apiVersion: '2012-08-10'
    });

    let key = state + "Value";
    let attribute_obj = {};
    attribute_obj[key] = {
        "Action": "PUT",
        "Value": {
            "S": value
        }
    };

    let request = dynamodb.updateItem({
        TableName: "SampleSmartHome",
        Key: {
            "ItemId": {
                "S": endpoint_id
            }
        },
        AttributeUpdates: attribute_obj,
        ReturnValues: "UPDATED_NEW"
    });

    console.log("index.sendDeviceState request -----");
    console.log(request);

    let response = request.send();

    console.log("index.sendDeviceState response -----");
    console.log(response);
    return true;
}
