(function() {

    var _this;
    var MARKER_SCRIPT_URL = "https://hifi-public.s3.amazonaws.com/eric/whiteboard/markerEntityScript.js";
    var ERASER_SCRIPT_URL = "https://hifi-public.s3.amazonaws.com/eric/whiteboard/eraserEntityScript.js";
    MarkerSpawnerButton = function() {
        _this = this;
        _this.markers = [];
        _this.markerModelURLS = [
            "https://hifi-content.s3.amazonaws.com/eric/models/marker-black.fbx",
            "https://hifi-content.s3.amazonaws.com/eric/models/marker-blue.fbx",
            "https://hifi-content.s3.amazonaws.com/eric/models/marker-red.fbx"
        ]
    }


    MarkerSpawnerButton.prototype = {

        startNearTrigger: function() {
            _this.spawnMarkers();
            _this.spawnEraser();
        },

        startFarTrigger: function() {
            _this.spawnMarkers();
            _this.spawnEraser();
        },

        spawnEraser: function() {
            var ERASER_MODEL_URL = "http://hifi-content.s3.amazonaws.com/alan/dev/eraser-2.fbx";
            var props = Entities.getEntityProperties(_this.entityID);
            var rightDir = Quat.getRight(props.rotation);
            var frontDir = Quat.getFront(props.rotation);
            var eraserPosition = Vec3.sum(props.position, {
                x: 0,
                y: -0.8,
                z: 0.0
            });
            eraserPosition = Vec3.sum(eraserPosition, Vec3.multiply(rightDir, -0.5));
            eraserPosition = Vec3.sum(eraserPosition, Vec3.multiply(frontDir, -0.08));
            var eraserRotation = Quat.fromVec3Degrees({
                x: props.rotation.x + 10,
                y: props.rotation.y - 90,
                z: props.rotation.z
            });

            _this.eraser = Entities.addEntity({
                type: "Model",
                modelURL: ERASER_MODEL_URL,
                shapeType: 'box',
                dynamic: true,
                position: eraserPosition,
                rotation: eraserRotation,
                script: ERASER_SCRIPT_URL,
                dimensions: {
                    x: 0.0858,
                    y: 0.0393,
                    z: 0.2083
                },
                gravity: {
                    x: 0,
                    y: -5,
                    z: 0
                },
                velocity: {
                    x: 0,
                    y: -0.1,
                    z: 0
                },
                userData: JSON.stringify({
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
            })
        },

        spawnMarkers: function() {
            print("SPAWN MARKERS")
            var props = Entities.getEntityProperties(_this.entityID);
            var rightDir = Quat.getRight(props.rotation);
            var frontDir = Quat.getFront(props.rotation);
            var markerPosition = Vec3.sum(props.position, {
                x: 0,
                y: -0.8,
                z: 0.0
            });
            markerPosition = Vec3.sum(markerPosition, Vec3.multiply(-0.1, frontDir));
            var markerRotation = Quat.fromVec3Degrees({
                x: props.rotation.x + 10,
                y: props.rotation.y - 90,
                z: props.rotation.z
            });
            var userDataProps = {
                wearable: {
                    joints: {
                        RightHand: [{
                            x: 0.001,
                            y: 0.139,
                            z: 0.050
                        }, {
                            x: -0.73,
                            y: -0.043,
                            z: -0.108,
                            w: -0.666
                        }],
                        LeftHand: [{
                            x: 0.007,
                            y: 0.151,
                            z: 0.061
                        }, {
                            x: -0.417,
                            y: 0.631,
                            z: -0.389,
                            w: -0.525
                        }]
                    }
                }
            }
            var markerProps = {
                type: "Model",
                name: "whiteboard marker",
                shapeType: "box",
                dynamic: true,
                gravity: {
                    x: 0,
                    y: -5,
                    z: 0
                },
                velocity: {
                    x: 0,
                    y: -0.1,
                    z: 0
                },
                position: markerPosition,
                rotation: markerRotation,
                dimensions: {
                    x: 0.027,
                    y: 0.027,
                    z: 0.164
                },
                script: MARKER_SCRIPT_URL
            };

            userDataProps.markerColor = {
                red: 10,
                green: 10,
                blue: 10
            }
            markerProps.modelURL = _this.markerModelURLS[0];
            markerProps.userData = JSON.stringify(userDataProps);
            _this.markers.push(Entities.addEntity(markerProps));

            markerPosition = Vec3.sum(markerPosition, Vec3.multiply(rightDir, 0.2));
            markerProps.modelURL = _this.markerModelURLS[1];
            userDataProps.markerColor = {
                red: 10,
                green: 10,
                blue: 200
            }
            markerProps.userData = JSON.stringify(userDataProps);
            markerProps.position = markerPosition;
            _this.markers.push(Entities.addEntity(markerProps));

            markerPosition = Vec3.sum(markerPosition, Vec3.multiply(rightDir, 0.2));
            markerProps.position = markerPosition;
            markerProps.modelURL = _this.markerModelURLS[2];
            userDataProps.markerColor = {
                red: 200,
                green: 10,
                blue: 10
            }
            markerProps.userData = JSON.stringify(userDataProps);
            _this.markers.push(Entities.addEntity(markerProps));
        },

        preload: function(entityID) {
            this.entityID = entityID;
        },

        unload: function() {
            _this.markers.forEach(function(marker) {
                Entities.deleteEntity(marker);
            });
            Entities.deleteEntity(_this.eraser);
        }


    };

    // entity scripts always need to return a newly constructed object of our type
    return new MarkerSpawnerButton();
});