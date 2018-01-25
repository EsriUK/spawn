var $owl = $('.owl-carousel');

$owl.children().each( function( index ) {
  $(this).attr( 'data-position', index ); // NB: .attr() instead of .data()
});

$owl.owlCarousel({
	center: true,
    loop: true,
    margin: 15,
    nav: false,
	dots: false,
	items: 18
});

$(document).on('click', '.owl-item > div', function() {
	console.log($(this)[0].childNodes["0"].title);
	$owl.trigger('to.owl.carousel', $(this).data('position') );
});