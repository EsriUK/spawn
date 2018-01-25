define([
    "esri/WebScene",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
    "esri/layers/SceneLayer",
    "esri/tasks/support/Query",
    "dojo/domReady!"
  ], function(WebScene, SceneView, FeatureLayer, SceneLayer, Query) {

    var view;

    //Constructor for a new MapController
    var SceneController = function (viewDiv){
        this.viewDiv = viewDiv;
    }
    
    //Builds the default map
    SceneController.prototype.buildScene = function(){
        var that = this;

        // Create the web scene
        var map = new WebScene({
            basemap: "satellite",
            ground: "world-elevation"
        });

        // Create the view
        that.view = new SceneView({
            container: "viewDiv",
            map: map,
            camera: {
                position: {
                latitude: 39.957011,
                longitude: -75.169457,
                z: 26
                },
                tilt: 78,
                heading: 315
            },
            environment: {
                lighting: {
                date: new Date("June 15, 2015 16:00:00 EDT"),
                directShadowsEnabled: true,
                ambientOcclusionEnabled: true
                }
            }
        });
        //var mapWait = $.Deferred();
        
        //mapWait.resolve();
        //return mapWait.promise();
    }


    //Stuff to make public
    return {
        SceneController: SceneController,
        BuildScene:BuildScene
    };
});