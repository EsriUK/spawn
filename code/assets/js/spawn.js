
        
    view.on("click", function(event){
        view.hitTest(event)

          .then(function(response){
            spawnObject(response.results[0].mapPoint.longitude,response.results[0].mapPoint.latitude)

            if(response.results[0].graphic != null){
              //And if edit mode is enabled. 
               objectHighlight()
            }
          })
        });

        function objectHighlight(){
          console.log("object is highlighted")
        }


        function spawnObject(long, lat){
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
            
            console.log(featureArray)
        }    
        