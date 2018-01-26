define([
    "esri/layers/GraphicsLayer",
    "esri/Graphic",
    "esri/symbols/WebStyleSymbol"
], function(GraphicsLayer, Graphic, WebStyleSymbol) {

    var clickCount = 0
    var cachedY
    var cachedX
    var styleName
    var mainName
        //var current

    //Constructor for a new MapController
    var Spawner = function() {

        $(document).on('click', '.owl-item', function() {

            console.log($(this).context.children[0].childNodes[2].innerText);
            console.log($(this).context.children[0].childNodes[3].innerText);

            mainName = $(this).context.children[0].childNodes[2].innerText
            styleName = $(this).context.children[0].childNodes[3].innerText
            var $this = $(this);
			$(".owl-item").removeClass("clicked");
			$this.addClass('clicked');
        });

    }

    //Builds the default map
    Spawner.prototype.spawn = function(event, view) {
        var that = this;
        clickCount++

        console.log(clickCount)

        cachedY = event.y
        cachedX = event.x




        if (clickCount === 2) {
            // console.log("reset states")
            // cachedY = []
            // cachedX = []
            clickCount = 0;
        }

        view.hitTest(event)

        .then(function(response) {
            spawnObject(response.results[0].mapPoint.longitude, response.results[0].mapPoint.latitude, clickCount)



            console.log(clickCount)

            if (clickCount === 1) {

                //                      console.log("object spawn at " + long + ", " + lat)
                //                      //spawning object
                //                      var temp =  { 
                //                             geometry: {
                //                               type: "point",
                //                               longitude: long,
                //                               latitude: lat
                //                             },
                //                             attributes: {
                //                               ROTATION: "0",
                //                               CATEGORY: "test",
                //                               SIZE: "1"
                //                             }
                //                       } 

            }


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



        function spawnObject(long, lat, clickCount) {

            var point = {
                type: "point", // autocasts as new Point()
                longitude: long,
                latitude: lat
            };

            var webStyleSymbol = {
                type: "web-style",
                name: mainName,
                portal: {
                    url: "https://www.arcgis.com"
                },
                styleName: styleName
            };


            var pointGraphic = new Graphic({
                geometry: point,
                symbol: webStyleSymbol
            });

            view.graphics.add(pointGraphic);


            pointGraphic.symbol.fetchSymbol().then(function(newLayer) {
                //newLayer.symbolLayers.items[0].width = 10
                newLayer.symbolLayers.items[0].heading = 360 * Math.random()
                pointGraphic.symbol = newLayer


                var pointGraphicNew = new Graphic({
                    geometry: point,
                    symbol: newLayer
                });
                view.graphics.add(pointGraphicNew)
                highlight(pointGraphicNew)
            })

            view.graphics.remove(pointGraphic)

            $("body").mousemove(function(e) {
                SymbolScaler(e)
            })



            function SymbolScaler(e) {
                console.log("size = " + Math.abs((cachedY - e.pageY) / 10))
                console.log("rotation = " + ((cachedX - e.pageX) / 2))

                //                        pointGraphic.symbol.fetchSymbol().then(function(newLayer){
                //                        newLayer.symbolLayers.items[0].heading = (cachedX - e.pageX)/2
                //                        
                //                       //pointGraphic.symbol = newLayer
                //
                //                        pointGraphic.symbol = newLayer
                //                            
                //                        //view.graphics.add(pointGraphicB);
                //
                //
                //                    })


            }
        }



    }


    //Stuff to make public
    return {
        Spawner: Spawner
    };
});