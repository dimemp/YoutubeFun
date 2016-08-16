// Hides all video descriptions
$('.video-content').hide();

$('.video-clip').on('mouseenter',function(event) {

    $(this).find('.play-overlay').fadeIn('slow');
    $(this).find('.video-content').slideToggle('slow');

}).on('mouseleave', function(event) {

    $(this).find('.play-overlay').fadeOut('slow');
    $(this).find('.video-content').slideToggle('slow');
    
});

