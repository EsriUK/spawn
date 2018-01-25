$(document).ready(function() {
 
	$("#owl-demo").owlCarousel({
		jsonPath : 'assets/data/testdata.json',
		jsonSuccess : customDataSuccess,
		items : 10, //10 items above 1000px browser width
		itemsDesktop : [1000,5], //5 items between 1000px and 901px
		itemsDesktopSmall : [900,3], // betweem 900px and 601px
		itemsTablet: [600,2], //2 items between 600 and 0
		itemsMobile : false,
		pagination: false,
		rewindNav: false
	});
 
	function customDataSuccess(data){
		var content = "";
		for(var i in data["items"]){
			var img = data["items"][i].src;
			var alt = data["items"][i].alt;
			content += "<img src=\"" +img+ "\" alt=\"" +alt+ "\">"
		}
		$("#owl-demo").html(content);
	}

	$(document).on('click', '.owl-item', function(){
		var $this = $(this);
		if($this.hasClass('clicked')){
			$this.removeClass('clicked');
		} else{
			$this.addClass('clicked');
		}
	});
 
});