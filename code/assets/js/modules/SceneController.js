define([
    "esri/WebScene",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
    "esri/layers/SceneLayer",
    "esri/tasks/support/Query",
    "dojo/domReady!"
  ], function(WebScene, SceneView, FeatureLayer, SceneLayer, Query) {


    //Constructor for a new MapController
    var SceneController = function (viewDiv){
        this.viewDiv = viewDiv;
        var view;
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
   ///////////////////////////////////////////
        
      var featureArray = []
      var clickCount = 0
      var cachcedY = 400
        
    that.view.on("click", function(event){
        clickCount ++
        
         if(clickCount === 3){
            console.log("reset states")
           // cachedY = []
           // cachedX = []
            clickCount = 0;
        }
        
        that.view.hitTest(event)

          .then(function(response){
            spawnObject(response.results[0].mapPoint.longitude,response.results[0].mapPoint.latitude,clickCount)
                
            if(response.results[0].graphic != null){
              //And if edit mode is enabled. 
               objectHighlight()
            }
          })
        });

        function objectHighlight(){
          console.log("object is highlighted")
        }
        
        
        
        ///////////////////////////////////////
        
    function spawnObject(long, lat, clickCount){
    
        console.log(clickCount)
            
        if(clickCount === 1){
        console.log("object spawn at " + long + ", " + lat)
            featureArray.push(
                { 
                   geometry: {
                     type: "point",
                     longitude: long,
                     latitude: lat
                   },
                   attributes: {
                     ROTATION: "30",
                     CATEGORY: "test",
                     SIZE: "10"
                   }
             }) 
            
//            $("body").mousemove(function(e) {
//                featureLayerScaler(cachcedY,e.clientY,e)
//            })
            console.log(featureArray)
        } 
            
        function featureLayerScaler(cachcedY, currentMouseY,e){
            console.log("size = " + ((cachcedY - currentMouseY)/10))
            e.stopPropagation();
        }
        
        if(clickCount === 2){
            console.log("rotating the feature")
        }
     c
        
        }  
        
        
        
        
        ////////////////////////////////////////
        
    }

    SceneController.prototype.getView = function(){
        return this.view;
    }


    //Stuff to make public
    return {
        SceneController: SceneController
        
    };
});