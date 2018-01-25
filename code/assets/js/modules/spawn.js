define([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/VectorTileLayer",
  "esri/views/layers/LayerView",
  "esri/widgets/Search",
  "modules/Utils",
  "dojo/domReady!"
], function(Map, MapView, VectorTileLayer, LayerView, Search, Utils) {

  //Constructor for a new MapController
  var Spawn = function (){
  }
  
  //Builds the default map
  Spawn.prototype.doSutff = function(){
      console.log("Stuffff");
  }


  //Stuff to make public
  return {
      MapController: MapController
  };
});