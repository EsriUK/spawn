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
			itemsMobile : false,
			pagination: false,
			rewindNav: false
		});
	 
		function customDataSuccess(data){
			var content = "";
			for(var i in data["items"]){
				var img = data["items"][i].src;
				var alt = data["items"][i].alt;

				var name = data["items"][i].name;
				var stylename = data["items"][i].stylename;

				content += "<div><img src=\"" + img + "\" alt=\"" + alt + "\"><em style='opacity: 0;'>" + alt.toLowerCase() + "</em><em style='opacity: 0;'>" + name + "</em><em style='opacity: 0;'>" + stylename + "</em></div>"
			}
			$("#owl-demo").html(content);
		}

		$(document).on('click', '.owl-item', function(){
			console.log($(this).context.children[0].childNodes[2].innerText);
			console.log($(this).context.children[0].childNodes[3].innerText);
			var $this = $(this);
			if($this.hasClass('clicked')){
				$this.removeClass('clicked');
			} else{
				$this.addClass('clicked');
			}
		});

		$("#filter").keyup(function () {
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

