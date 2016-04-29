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
            var markerRotation = Quat.fromVec3Degrees({
                x: props.rotation.x + 10,
                y: props.rotation.y - 90,
                z: props.rotation.z
            });
            for (var i = 0; i < 1; i++) {
                var marker = Entities.addEntity({
                    type: "Model",
                    name: "whiteboard marker",
                    modelURL: _this.markerModelURLS[i],
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
                    },
                });

                _this.markers.push(marker);
            }


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