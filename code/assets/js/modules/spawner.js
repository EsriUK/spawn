define([
  "esri/layers/GraphicsLayer",
        "esri/Graphic"
], function(GraphicsLayer,Graphic) {

  var clickCount = 0
  var cachedY
  var cachedX
  //var current

  //Constructor for a new MapController
  var Spawner = function (){
    
      
  }
  
  //Builds the default map
  Spawner.prototype.spawn = function(event, view){
      var that = this;
      console.log("Stuffff");
      cachedY = event.y
            cachedX = event.x
            console.log(cachedY + ", " + cachedX)
            
            clickCount ++
            
             if(clickCount === 2){
                console.log("reset states")
               // cachedY = []
               // cachedX = []
                clickCount = 0;
            }
            
            view.hitTest(event)
    
              .then(function(response){
                spawnObject(response.results[0].mapPoint.longitude,response.results[0].mapPoint.latitude,clickCount)

                function spawnObject(long, lat, clickCount){
                                        
                    var point = {
                      type: "point", // autocasts as new Point()
                      longitude: long,
                      latitude: lat
                    };

                    var markerSymbol = {
                    type: "web-style",
                        name: "Light_On_Post_-_Light_on",
                            portal: {
                            url: "https://www.arcgis.com"
                        },
                        styleName: "EsriRealisticStreetSceneStyle"
                    };

                    var pointGraphic = new Graphic({
                      geometry: point,
                      symbol: markerSymbol
                    });

                    view.graphics.add(pointGraphic);
               
                }

/*
        
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
             
     */             
                  // if(clickCount === 0){
                  //     console.log("save and push feature?")
                  
                  //     console.log(featureArray)
                      
                        
                  //      $("body").off(mousemove())
                      
                  //     featureArray.push(
                  //         { 
                  //            geometry: {
                  //              type: "point",
                  //              longitude: long,
                  //              latitude: lat
                  //            },
                  //            attributes: {
                  //              ROTATION: "30",
                  //              CATEGORY: "test",
                  //              SIZE: "10"
                  //            }
                  //      }) 
                      
                  // }
                     
                  // function featureLayerScaler(e){
                  //             console.log("size = " + Math.abs((cachedY - e.pageY)/10))
                  //             console.log("rotation = " + ((cachedX - e.pageX)/2))
                  // }
                
        

            })
        }


  //Stuff to make public
  return {
      Spawner: Spawner
  };
});