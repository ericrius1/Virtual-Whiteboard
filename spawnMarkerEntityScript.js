(function() {

    var _this;
    MarkerSpawnerButton = function() {
        _this = this;
        _this.markers = [];
        _this.markerModelURLS = [
            "http://hifi-content.s3.amazonaws.com/alan/dev/marker-black.fbx",
            "http://hifi-content.s3.amazonaws.com/alan/dev/marker-blue.fbx",
            "http://hifi-content.s3.amazonaws.com/alan/dev/marker-red.fbx"
        ]
    }
    MarkerSpawnerButton.prototype = {

        startNearTrigger: function() {
            print("CLICK")
                // _this.spawnMarkers();
        },

        startFarTrigger: function() {
            print("CLICK")
            _this.spawnMarkers();
        },

        spawnMarkers: function() {
            print("SPAWN MARKERS")
            var props = Entities.getEntityProperties(_this.entityID);
            var markerPosition = Vec3.sum(props.position, {x: 0, y: -0.5, z: 0.1});
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
                position: props.position,
                rotation: markerRotation,
                dimensions: {
                    x: 0.027,
                    y: 0.027,
                    z: 0.164
                }
            };

            userDataProps.markerColor = {
                red: 10,
                green: 10,
                blue: 200
            }
            markerProps.modelURL = _this.markerModelURLS[0];
            markerProps.userData = JSON.stringify(userDataProps);
            _this.markers.push(Entities.addEntity(markerProps));

            markerProps.modelURL = _this.markerModelURLS[1];
            userDataProps.markerColor = {
                red: 10,
                green: 10,
                blue: 10
            }
            markerProps.userData = JSON.stringify(userDataProps);
            _this.markers.push(Entities.addEntity(markerProps));

            markerProps.modelURL = _this.markerModelURLS[2];
            userDataProps.markerColor = {
                red: 10,
                green: 10,
                blue: 200
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
        }


    };

    // entity scripts always need to return a newly constructed object of our type
    return new MarkerSpawnerButton();
});