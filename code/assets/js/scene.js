    require([
      "esri/WebScene",
      "esri/views/SceneView",

      "esri/layers/FeatureLayer",
      "esri/layers/SceneLayer",

      "esri/tasks/support/Query",

      "dojo/domReady!"
    ], function(WebScene, SceneView, FeatureLayer, SceneLayer, Query) {

        
      // Create the web scene
      var map = new WebScene({
        basemap: "satellite",
        ground: "world-elevation"
      });

      // Create the view
      var view = new SceneView({
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

      var featureArray = []

        
        
      /********************************************************************
       * Add layer containing street furniture features: benches, street lamps
       ********************************************************************/

      // convenience function to retrieve the WebStyleSymbols based on their name
      function getStreetSymbol(name) {
        return {
          type: "web-style", // autocasts as new WebStyleSymbol()
          name: name,
          styleName: "EsriRealisticStreetSceneStyle"
        };
      }

      // use a UniqueValueRenderer to symbolize the different feature types (street lamps, trash bin)
      var streetFurnitureRenderer = {
        type: "unique-value", // autocasts as new UniqueValueRenderer()
        field: "CATEGORY",
        uniqueValueInfos: [{
          value: "Overhanging street",
          symbol: getStreetSymbol("Overhanging_Street_-_Light_on")
        }, {
          value: "Overhanging street and sidewalk",
          symbol: getStreetSymbol("Light_On_Post_-_Light_on")
        }, {
          value: "Trash bin",
          symbol: getStreetSymbol("Trash_Bin_1")
        }, {
          value: "Newspaper",
          symbol: getStreetSymbol("Newspaper_Vending_Machine")
        }, {
          value: "Park bench 1",
          symbol: getStreetSymbol("Park_Bench_2")
        }],
        visualVariables: [{
          type: "rotation",
          field: "ROTATION"
        }, {
          type: "size",
          field: "SIZE",
          axis: "height"
        }]
      };

      // create the layer and assign the renderer to it
      var streetFurnitureLayer = new FeatureLayer({
        url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/Philadelphia_LoganSquare_streetFurniture/FeatureServer/0",
        renderer: streetFurnitureRenderer,
        elevationInfo: {
          mode: "on-the-ground"
        }
      });

      /**********************************************
       * Add layer containing transportation features
       **********************************************/

      // convenience object that maps feature attribute value to web style symbol name
      // will be used to create the uniqueValueInfos in the renderer
      var transportationSymbols = [{
        value: "Bus",
        name: "Bus"
      }, {
        value: "Taxi",
        name: "Taxi"
      }, {
        value: "Ambulance",
        name: "Ambulance"
      }, {
        value: "Mercedes",
        name: "Mercedes_S-Class"
      }, {
        value: "Volkswagen",
        name: "Volkswagen_Jetta_Wagon"
      }];

      var transportationRenderer = {
        type: "unique-value", // autocasts as new UniqueValueRenderer()
        field: "CATEGORY",
        uniqueValueInfos: transportationSymbols.map(function(type) {
          return {
            value: type.value,
            symbol: {
              type: "web-style", // autocasts as new WebStyleSymbol()
              name: type.name,
              styleName: "EsriRealisticTransportationStyle"
            }
          }
        }),
        visualVariables: [{
          type: "rotation",
          // cars need to have a rotation field so that they are aligned to the street
          field: "ROTATION"
        }, {
          type: "size",
          field: "SIZE",
          axis: "depth"
        }]
      };

      var transportationLayer = new FeatureLayer({
        url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Philadelphia_LoganSquare_cars/FeatureServer",
        outFields: ["ROTATION", "CATEGORY", "SIZE"],
        renderer: transportationRenderer,
        elevationInfo: {
          mode: "on-the-ground"
        }
      });

      /**********************************************
       * Add layer containing vegetation features
       **********************************************/

      // define the unique values
      var uniqueValueInfos = [
      {
        value: "Acer",
        symbol: {
          type: "web-style", // autocasts as new WebStyleSymbol()
          name: "Acer",
          styleName: "EsriRealisticTreesStyle"
        }
      }, {
        value: "Bulbophyllum",
        symbol: {
          type: "web-style", // autocasts as new WebStyleSymbol()
          name: "Bulbophyllum",
          styleName: "EsriRealisticTreesStyle"
        }
      }, {
        value: "Cornus",
        symbol: {
          type: "web-style", // autocasts as new WebStyleSymbol()
          name: "Cornus",
          styleName: "EsriRealisticTreesStyle"
        }
      }, {
        value: "Pinus",
        symbol: {
          type: "web-style", // autocasts as new WebStyleSymbol()
          name: "Pinus",
          styleName: "EsriRealisticTreesStyle"
        }
      }];

      // define vegetationLayer
      var vegetationLayer = new FeatureLayer({
        url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Philadelphia_LoganSquare_vegetation_selection/FeatureServer",
        elevationInfo: {
          mode: "on-the-ground"
        },
        renderer: {
          type: "unique-value", // autocasts as new UniqueValueRenderer()
          field: "CATEGORY",
          uniqueValueInfos: uniqueValueInfos,
          visualVariables: [{
            type: "size",
            field: "SIZE",
            axis: "height" // take the real height of the plant from the SIZE field
          }, {
            type: "rotation",
            valueExpression: "random() * 360" // we use a random rotation, so that plants look different
          }]
        }
      });

      // add a mesh scene layer with the fountain in the middle of the square
      var fountainLayer = new SceneLayer({
        portalItem: {
          id: "778c03645d9a4bea9c1ef8543327db29"
        }
      });

      map.addMany([streetFurnitureLayer, vegetationLayer,
        transportationLayer, fountainLayer
      ]);

      view.ui.add("extra", "bottom-left");
    });
