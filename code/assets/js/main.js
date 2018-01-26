require([
    "modules/SceneController",
    "modules/Spawner"
], function(SceneController, Spawner) {

    //Session Variables-----------------------------------------------------------------------------
    var sceneController = new SceneController.SceneController("viewDiv");
    var spawner = new Spawner.Spawner();
    

    //Functions  -----------------------------------------------------------------------------------

    //Build the map and generate a palette from a random image
    function initialise(){
        
		sceneController.buildScene();
		
		$("#owl-demo").owlCarousel({
			jsonPath : 'assets/data/testdata.json',
			jsonSuccess : customDataSuccess,
			items : 18,
			itemsDesktop : [1200, 12],
			itemsDesktopSmall : [900, 8],
			itemsTablet: [600,6],
			itemsMobile : false,
			pagination: false,
			rewindNav: false
		});
	 
		function customDataSuccess(data){
			
			var content = "";
			
			for(var i in data["items"]){
				var img			= data["items"][i].src;
				var alt			= data["items"][i].alt;
				var name		= data["items"][i].name;
				var stylename	= data["items"][i].stylename;
				var tags		= data["items"][i].tags;

				var myTags		= '';

				for (i = 0; i < tags.length; i++) { 
					myTags +=  "<em style='display: none;'>" + tags[i].toLowerCase() + "</em>";
				}

				content += "<div><img src=\"" + img + "\" alt=\"" + alt + "\"><em style='display: none;'>" + alt.toLowerCase() + "</em><em style='display: none;'>" + name + "</em><em style='display: none;'>" + stylename + "</em>" + myTags + "</div>"
			}

			$("#owl-demo").html(content);
		}

		$("#filter").keyup(function () {
			$("#owl-demo").trigger("owl.goTo", 0)
			$(".owl-item").hide().filter(":contains(" + $(this).val().toLowerCase() + ")").show();
        });
        
        sceneController.getView().on("click", function(event){

            spawner.spawn(event, sceneController.getView());
            
        });
 
    } 
    

    //Logic ----------------------------------------------------------------------------------------

    initialise();

    console.log(sceneController.getView());
    //spawner.doStuff();


});

