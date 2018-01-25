define([

], function() {

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

            console.log(view)
            
            view.hitTest(event)
    
              .then(function(response){
                spawnObject(response.results[0].mapPoint.longitude,response.results[0].mapPoint.latitude,clickCount)
                    
                if(response.results[0].graphic != null){
                  //And if edit mode is enabled. 
                   objectHighlight()
                }
              })
  }


  //Stuff to make public
  return {
      Spawner: Spawner
  };
});