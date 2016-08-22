/* Hides all video descriptions
$( document ).ready(function() {
	$('.video-content').hide();

	$('.video-clip').on('mouseenter',function(event) {

	    $(this).find('.video-content').slideToggle('slow');

	}).on('mouseleave', function(event) {

	    $(this).find('.video-content').slideToggle('slow');
	    
	});
});	

