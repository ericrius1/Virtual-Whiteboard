//
//  whiteboardSpawner.js
//  examples/homeContent/whiteboardV2
//
//  Created by Eric Levina on 2/17/16
//  Copyright 2016 High Fidelity, Inc.
//
//  Run this script to spawn a whiteboard, markers, and an eraser.
//  To draw on the whiteboard, equip a marker and hold down trigger with marker tip pointed at whiteboard 
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
var ERASER_SCRIPT_URL = "https://hifi-public.s3.amazonaws.com/eric/whiteboard/eraserEntityScript.js";

var MARKER_SCRIPT_URL = "https://hifi-public.s3.amazonaws.com/eric/whiteboard/markerEntityScript.js";

Whiteboard = function(spawnPosition) {

    var orientation = MyAvatar.orientation;
    var spawnRotation = Quat.safeEulerAngles(orientation);
    var markers = [];
    var markerRotation = Quat.fromVec3Degrees({
        x: spawnRotation.x + 10,
        y: spawnRotation.y - 90,
        z: spawnRotation.z
    });
    var whiteboardPosition = spawnPosition;
    var whiteboardRotation = orientation;
   
    var WHITEBOARD_MODEL_URL = "https://hifi-public.s3.amazonaws.com/eric/whiteboard/assets/Whiteboard-6.fbx";
    var WHITEBOARD_COLLISION_HULL_URL = "https://hifi-content.s3.amazonaws.com/eric/models/whiteboardCollisionHull.obj";
   
    var whiteboard = Entities.addEntity({
        type: "Model",
        name: "home_model_whiteboard",
        modelURL: WHITEBOARD_MODEL_URL,
        position: whiteboardPosition,
        rotation: whiteboardRotation,
        shapeType: 'compound',
        compoundShapeURL: WHITEBOARD_COLLISION_HULL_URL,
        lifetime: 3600,
        dimensions: {
            x: 1.86,
            y: 2.7,
            z: 0.4636
        },
        userData: JSON.stringify({
            'hifiHomeKey': {
                'reset': true
            }
        }),
    });





    var whiteboardSurfacePosition = Vec3.sum(whiteboardPosition, {
        x: 0.0,
        y: 0.45,
        z: 0.0
    });
    whiteboardSurfacePosition = Vec3.sum(whiteboardSurfacePosition, Vec3.multiply(-0.02, Quat.getRight(whiteboardRotation)));
    var moveForwardDistance = 0.02;
    whiteboardFrontSurfacePosition = Vec3.sum(whiteboardSurfacePosition, Vec3.multiply(-moveForwardDistance, Quat.getFront(whiteboardRotation)));
    var WHITEBOARD_SURFACE_NAME = "home_box_whiteboardDrawingSurface";
    var whiteboardSurfaceSettings = {
        type: "Box",
        name: WHITEBOARD_SURFACE_NAME,
        dimensions: {
            x: 1.82,
            y: 1.8,
            z: 0.01
        },
        lifetime: 3600,
        color: {
            red: 200,
            green: 10,
            blue: 200
        },
        position: whiteboardFrontSurfacePosition,
        rotation: whiteboardRotation,
        visible: false,
        parentID: whiteboard,
        userData: JSON.stringify({
            'hifiHomeKey': {
                'reset': true
            }
        }),
    }
    var whiteboardFrontDrawingSurface = Entities.addEntity(whiteboardSurfaceSettings);

    var scriptURL = "https://hifi-public.s3.amazonaws.com/eric/whiteboard/spawnMarkerEntityScript.js"
    var buttonPosition = Vec3.sum(whiteboardPosition, {x: 0, y: 1.2, z: 0});
    var markerSpawnButton = Entities.addEntity({
        type: "Box",
        dimensions: {x: 0.3, y: 0.2, z: 0.07},
        color: {red: 200, green: 0, blue: 200},
        position: buttonPosition,
        userData: JSON.stringify({grabbableKey: {wantsTrigger: true}}),
        parentID: whiteboardFrontDrawingSurface,
        script: scriptURL
    });

    whiteboardBackSurfacePosition = Vec3.sum(whiteboardSurfacePosition, Vec3.multiply(moveForwardDistance, Quat.getFront(whiteboardRotation)));
    whiteboardSurfaceSettings.position = whiteboardBackSurfacePosition;

    var whiteboardBackDrawingSurface = Entities.addEntity(whiteboardSurfaceSettings);
    var WHITEBOARD_RACK_DEPTH = 1.9;



    // ************ ERASER ************************************************
    var ERASER_MODEL_URL = "http://hifi-content.s3.amazonaws.com/alan/dev/eraser-2.fbx";



    var eraserProps = {
        type: "Model",
        name: "home_model_whiteboardEraser",
        modelURL: ERASER_MODEL_URL,
        position: eraserPosition,
        script: ERASER_SCRIPT_URL,
        shapeType: "box",
        dimensions: {
            x: 0.0858,
            y: 0.0393,
            z: 0.2083
        },
        lifetime: 3600,
        rotation: eraserRotation,
        dynamic: true,
        gravity: {
            x: 0,
            y: -10,
            z: 0
        },
        velocity: {
            x: 0,
            y: -0.1,
            z: 0
        },
        userData: JSON.stringify({
            'hifiHomeKey': {
                'reset': true
            },
            originalPosition: eraserPosition,
            originalRotation: eraserRotation,
            wearable: {
                joints: {
                    RightHand: [{
                        x: 0.020,
                        y: 0.120,
                        z: 0.049
                    }, {
                        x: 0.1004,
                        y: 0.6424,
                        z: 0.717,
                        w: 0.250
                    }],
                    LeftHand: [{
                        x: -0.005,
                        y: 0.1101,
                        z: 0.053
                    }, {
                        x: 0.723,
                        y: 0.289,
                        z: 0.142,
                        w: 0.610
                    }]
                }
            }
        })
    }


 // ************************************************************************************************* 



    function cleanup() {
        Entities.deleteEntity(whiteboard);
        Entities.deleteEntity(whiteboardFrontDrawingSurface);
        Entities.deleteEntity(whiteboardBackDrawingSurface);
        Entities.deleteEntity(markerSpawnButton);
        Entities.deleteEntity(eraser);
        markers.forEach(function(marker) {
            Entities.deleteEntity(marker);
        });
    }

    this.cleanup = cleanup;

}