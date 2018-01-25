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
  var MapController = function (viewDiv){
      this.viewDiv = viewDiv;
  }
  
  //Builds the default map
  MapController.prototype.buildMap = function(){
      var that = this;
      var mapWait = $.Deferred();
      
      mapWait.resolve();
      return mapWait.promise();
  }


  //Stuff to make public
  return {
      MapController: MapController
  };
});