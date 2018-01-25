define([

], function() {

  //Constructor for a new MapController
  var Spawner = function (){
      console.log("hello?")
    
      
  }
  
  //Builds the default map
  Spawner.prototype.doSutff = function(){
      console.log("Stuffff");
  }


  //Stuff to make public
  return {
      Spawner: Spawner
  };
});