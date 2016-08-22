var channelPosition = {
    'CrazyTsach': '#Crazy-Tsach-results',
    'VibratorProductions': '#Vibrator-Productions-results',
    'AstathiosPranksMain': '#Astathios-Pranks-results',
    'BooyahchannelGR': '#Booyah-Tv-results'
};

var videoResults = 4;
var latestVideo = '';
var latestVideoDescription ='';
var latestVideoId = '';            

$(document).ready(function(){

    $.each(channelPosition, function( channel, id_position ) {
        
    $.get (
        "https://www.googleapis.com/youtube/v3/channels", {
            part: 'contentDetails',
            forUsername: channel,
            key: 'AIzaSyCqHtArKSUrBpUnbdVMMKQYU5bsJVeptdc'
        },

        function(data){
            $.each(data.items, function(i, item){
                var pid = item.contentDetails.relatedPlaylists.uploads;
                getVideos(pid);
            })
        }
    );

    //Get videos playlist latest items
    function getVideos(pid) {
        
        $.get (
        "https://www.googleapis.com/youtube/v3/playlistItems", {
            part: 'snippet',
            maxResults: videoResults,
            playlistId: pid,
            key: 'AIzaSyCqHtArKSUrBpUnbdVMMKQYU5bsJVeptdc'
        },

        function(data){

            var output;
            var latestVideoOutput;

            $.each(data.items, function(i, item){
                console.log(item)
                var videodescription = item.snippet.description;
                var videodate = item.snippet.publishedAt;
                var videoId = item.snippet.resourceId.videoId;
                
                //Create the HMTL for video rows
                var output = '<div class="col-md-3 video-clip"><div class="video"><iframe src="//www.youtube.com/embed/'+videoId+'"></iframe></div><div class="video-content"><div class="time"><span class="post-date"><i class="fa fa-clock-o time-icon" aria-hidden="true"></i>'+videodate+'</span></div><div class="description">'+videodescription+'</div></div></div>';

                $(id_position).append(output);

                //Hide video description and date
                $('.video-content').hide();

                $('.video-clip').on('mouseenter',function(event) {

                    $(this).find('.video-content').slideToggle('slow');

                }).on('mouseleave', function(event) {

                    $(this).find('.video-content').slideToggle('slow');
                    
                });

                //Find the latest video
                if (videodate > latestVideo) {

                    latestVideo = videodate;
                    latestVideoDescription = videodescription;
                    latestVideoId = videoId;
                    
                };


            })
        }
    );}

    });

    //Create the HMTL for latest video row
    var latestVideoOutput = '<div id="latest-top-video"><iframe src="//www.youtube.com/embed/'+latestVideoId+'"></iframe></div>';
                    
    //Append to results playlist
    $('#latest-video-iframe').append(latestVideoOutput);
    $('#latest-video-description').append(latestVideoDescription);

});


