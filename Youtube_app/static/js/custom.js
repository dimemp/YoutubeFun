var channelName = 'CrazyTsach';
var videoResults = 10;


$(document).ready(function(){

    $.get (
        "https://www.googleapis.com/youtube/v3/channels", {
            part: 'contentDetails',
            forUsername: channelName,
            key: 'AIzaSyCqHtArKSUrBpUnbdVMMKQYU5bsJVeptdc'
        },

        function(data){
            $.each(data.items, function(i, item){
                console.log(item);
                var pid = item.contentDetails.relatedPlaylists.uploads;
                getVideos(pid);
            })
        }
    );

    function getVideos(pid) {

        $.get (
        "https://www.googleapis.com/youtube/v3/playlistItems", {
            part: 'snippet',
            maxresults: videoResults,
            playlistId: pid,
            key: 'AIzaSyCqHtArKSUrBpUnbdVMMKQYU5bsJVeptdc'
        },

        function(data){
            var output;
            $.each(data.items, function(i, item){
                console.log(item);
                var videoTitle = item.snippet.title;
                var videoId = item.snippet.resourceId.videoId
                var output = '<li><iframe src="//www.youtube.com/embed/'+videoId+'"></iframe></li>';

                //Append to results playlist
                $('#results').append(output);
            })
        }
    );

    }
});


