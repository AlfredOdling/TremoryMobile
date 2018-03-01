Twitter = (function () {

    let min_id = 9999999999999999999999;

   /* $.ajax({
        url: 'https://publish.twitter.com/oembed?url=https%3A%2F%2Ftwitter.com%2FInterior%2Fstatus%2F507185938620219395',
        success: function (data) {
            console.log(data);
            $("#container").append(data.html);
        }
    });

    $.ajax({
        url: 'https://api.twitter.com/1.1/account/verify_credentials.json',
        success: function (data) {
            console.log(data);
            $("#container").append(data.html);
        }
    });*/

    function getUser(callback) {
        $.ajax({
            url: 'server/twitter/twitterConnect.php',
            success: function (data) {
                let obj = JSON.parse(data);
                callback(obj);
            }
        });
    }

    function getUserTweets(id, callb, user, list){
        console.log("???????????????");

        $.ajax({
            url: 'server/twitter/Twitter.php?q=getUserTimeLine&id='+id+'&segment=0',
            success: function (data) {
                let obj = JSON.parse(data);
                console.log(obj);
                if(list) {
                    List.emptyList();
                }
                let tweets = [];
                for (let i = 0; i < obj.length; i++) {
                    let tweet = new PointTwitter(obj[i]);
                    if(min_id > tweet.twitter_id){
                        min_id = tweet.twitter_id;
                    }
                    tweet.user_first = user.user_first;
                    tweet.user_last = user.user_last;
                    tweet.asUser = user;
                    MapPoints.addObject(tweet, "temporary");
                    if(list) {
                        List.addObject(tweet);
                    } else {
                        tweets.push(tweet);
                    }
                }
                callb(tweets);
                if(list) {
                    setListCallback(id, callb, user);
                }
            }
        });
    }

    function setListCallback(id, callb, user) {
        List.setCallback(function (segment) {
            $.ajax({
                url: 'server/twitter/Twitter.php?q=getUserTimeLine&id='+id+'&segment=' + (min_id - 1),
                success: function (data) {
                    let obj = JSON.parse(data);
                    console.log(obj);
                    let tweets = [];
                    for (let i = 0; i < obj.length; i++) {
                        let tweet = new PointTwitter(obj[i]);
                        if(min_id > tweet.twitter_id){
                            min_id = tweet.twitter_id;
                        }
                        tweet.user_first = user.user_first;
                        tweet.user_last = user.user_last;
                        tweet.asUser = user;
                        MapPoints.addObject(tweet, "temporary");
                        List.addObject(tweet);
                        tweets.push(tweet);
                    }
                    callb(tweets);
                }
            });
        });

    }

    function getUserProfile(id, callback){
        $.ajax({
            url: "server/twitter/Twitter.php?q=getUserInformation&id="+id,
            success: function (data) {
                callback(JSON.parse(data));
            }
        })    }

    return {
        getUser: getUser,
        getUserTweets: getUserTweets,
        getUserProfile: getUserProfile
    }
})();