//
//  markerTipEntityScript.js
//  examples/homeContent/markerTipEntityScript
//
//  Created by Eric Levin on 2/17/15.
//  Copyright 2016 High Fidelity, Inc.
//
//  This script provides the logic for an object to draw marker strokes on its associated whiteboard

//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html



(function() {

    Script.include('https://hifi-public.s3.amazonaws.com/eric/whiteboard/utils.js');
    var TRIGGER_CONTROLS = [
        Controller.Standard.LT,
        Controller.Standard.RT,
    ];

    var MAX_POINTS_PER_STROKE = 40;
    var _this;

    MarkerTip = function() {
        _this = this;
        _this.MARKER_TEXTURE_URL = "https://hifi-content.s3.amazonaws.com/eric/textures/markerStroke.png";
        _this.strokeForwardOffset = 0.0001;
        _this.STROKE_WIDTH_RANGE = {
            min: 0.002,
            max: 0.01
        };
        _this.MAX_MARKER_TO_BOARD_DISTANCE = 1.4;
        _this.MIN_DISTANCE_BETWEEN_POINTS = 0.002;
        _this.MAX_DISTANCE_BETWEEN_POINTS = 0.1;
        _this.strokes = [];
        _this.PAINTING_TRIGGER_THRESHOLD = 0.2;
        _this.STROKE_NAME = "home_polyline_markerStroke";
        _this.WHITEBOARD_SURFACE_NAME = "home_box_whiteboardDrawingSurface"
        _this.MARKER_RESET_WAIT_TIME = 3000;
    };

    MarkerTip.prototype = {

        startNearTrigger: function() {
            print("CLICK")
            spawnMarkers();
        },

        startFarTrigger: function() {
            print("CLICK")
            spawnMarkers();
        },

        spawnMarkers: function() {

        }

        preload: function(entityID) {
            this.entityID = entityID;
        },


    };

    // entity scripts always need to return a newly constructed object of our type
    return new MarkerTip();
});