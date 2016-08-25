var channelPosition = {
    'CrazyTsach': '#Crazy-Tsach-results',
    'VibratorProductions': '#Vibrator-Productions-results',
    'AstathiosPranksMain': '#Astathios-Pranks-results'
};

var videoResults = 4;

var latestVideoInfo = {
    latestVideoDate: '',
    latestVideoDescription: '',
    latestVideoId: '' 
}; 

//Estimate the number of iteration in video playlists to use it in the "Append latest video result to top video" section
var len = Object.keys(channelPosition).length; 
var iterationNumber = len * videoResults;

//Counter to know when the get.video has retrieved every video
var counter = 0;

$(document).ready(function(){

    //Iterate to get every youtube channel
    $.each(channelPosition, function( channel, id_position ) {
        
    //Get every youtube channel    
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
                
                counter = counter + 1;
                var videodescription = item.snippet.description;
                var videodate = item.snippet.publishedAt.slice(0,-14);
                var videoId = item.snippet.resourceId.videoId; 

                //Create an id so that mouseenter / mouseleave don't repeat and work as expected
                var videopositionid = '#'+counter+'';
                
                //Create the HMTL for video rows
                var output = '<div class="col-xs-12 col-sm-6 col-md-3 video-clip" id="'+counter+'"><div class="video"><iframe src="//www.youtube.com/embed/'+videoId+'"></iframe></div><div class="video-content"><div class="time"><span class="post-date"><i class="fa fa-clock-o time-icon" aria-hidden="true"></i>'+videodate+'</span></div><div class="description">'+videodescription+'</div></div></div>';

                $(id_position).append(output);

                //Hide video description and date
                $('.video-content').hide();

                $(videopositionid).on('mouseenter',function(event) {

                    $(this).find('.video-content').slideToggle('slow');

                }).on('mouseleave', function(event) {

                    $(this).find('.video-content').slideToggle('slow');
                    
                });

                //Find the latest video
                if (videodate > latestVideoInfo.latestVideoDate) {

                    latestVideoInfo.latestVideoDate = videodate;
                    latestVideoInfo.latestVideoDescription = videodescription;
                    latestVideoInfo.latestVideoId = videoId; 

                };

                   
                //Append latest video result to top video
                if (counter == iterationNumber) {

                    //Create the HMTL for latest video row
                    var latestVideoOutput = '<div id="latest-top-video"><iframe src="//www.youtube.com/embed/'+latestVideoInfo.latestVideoId+'"></iframe></div>';                      
                    var latestVideoDateOutput = '<div id="latest-vid-time"><span id="latest-vid-post-date"><i class="fa fa-clock-o time-icon" aria-hidden="true"></i>'+latestVideoInfo.latestVideoDate+'</span></div>'
                    
                    $('#latest-video-iframe').append(latestVideoOutput);
                    $('#latest-video-description').append(latestVideoDateOutput, latestVideoInfo.latestVideoDescription);

                }
                

            })

        }
    );}

    });

});


