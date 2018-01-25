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
      var cachedY
      var cachedX
      var current
 
        
    // that.view.on("click", function(event){
    //     cachedY = event.y
    //     cachedX = event.x
    //     console.log(cachedY + ", " + cachedX)
        
    //     clickCount ++
        
    //      if(clickCount === 2){
    //         console.log("reset states")
    //        // cachedY = []
    //        // cachedX = []
    //         clickCount = 0;
    //     }
        
    //     that.view.hitTest(event)

    //       .then(function(response){
    //         spawnObject(response.results[0].mapPoint.longitude,response.results[0].mapPoint.latitude,clickCount)
                
    //         if(response.results[0].graphic != null){
    //           //And if edit mode is enabled. 
    //            objectHighlight()
    //         }
    //       })
    //     });

        function objectHighlight(){
          console.log("object is highlighted")
        }
        
        
        
        ///////////////////////////////////////
        
    function spawnObject(long, lat, clickCount){


        
        $("body").mousemove(function(e) {
                featureLayerScaler(e)
        })
    
        console.log(clickCount)
            
        if(clickCount === 1){
            
            console.log("object spawn at " + long + ", " + lat)
            //spawning object
            var temp =  { 
                   geometry: {
                     type: "point",
                     longitude: long,
                     latitude: lat
                   },
                   attributes: {
                     ROTATION: "0",
                     CATEGORY: "test",
                     SIZE: "1"
                   }
             } 
            
           
            console.log(temp)
        } 
   
        
        if(clickCount === 0){
            console.log("save and push feature?")
        
            console.log(featureArray)
            
              
             $("body").off(mousemove())
            
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
            
        }
           
        function featureLayerScaler(e){
                    console.log("size = " + Math.abs((cachedY - e.pageY)/10))
                    console.log("rotation = " + ((cachedX - e.pageX)/2))
        }
      
        
        }  
        
        ////////////////////////////////////////

        function createFeatureLayer() {
            var fields = [
                {
                  name: "ObjectID",
                  alias: "ObjectID",
                  type: "oid"
                }, {
                  name: "SIZE",
                  alias: "size",
                  type: "string"
                }, {
                  name: "ROTATION",
                  alias: "rotation",
                  type: "string"
                }, {
                  name: "CATEGORY",
                  alias: "category",
                  type: "string"
            }];

            lyr = new FeatureLayer({
                source: featureArray, // autocast as an array of esri/Graphic
                // create an instance of esri/layers/support/Field for each field object
                fields: fields, // This is required when creating a layer from Graphics
                objectIdField: "ObjectID", // This must be defined when creating a layer from Graphics
                //renderer: quakesRenderer, // set the visualization on the layer
                spatialReference: {
                  wkid: 4326
                },
                geometryType: "point", // Must be set when creating a layer from Graphics
            });
        }
        
    }

    SceneController.prototype.getView = function(){
        return this.view;
    }


    //Stuff to make public
    return {
        SceneController: SceneController
        
    };
});