import $ from 'jquery'

window.fbAsyncInit = function () {
    FB.init({
        appId: '1827262697537379',
        xfbml: true,
        version: 'v2.8'
    })
    FB.AppEvents.logPageView()
}

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) { return }
    js = d.createElement(s) js.id = id
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=1827262697537379"
    fjs.parentNode.insertBefore(js, fjs)
}(document, 'script', 'facebook-jssdk'))

// renderThing()
/* $("#getMePost").click(function () {

     FB.api(
         "/me/feed",
         function (response) {
             if (response && !response.error) {

             }

                 console.log(response.data.length)
                 for(var i = 0 i < response.data.length i++) {
                     console.log(i)

                     var arr = response.data[i].id.split("_")
                     console.log("first: "+arr[0] +"Second: "+ arr[1])
                     $("#fillMeWithPost").append("<div class=\"fb-post\" data-href=\"https://www.facebook.com/"+arr[0]+"/posts/"+arr[1]+"/\" data-width=\"500\" data-show-text=\"true\">")

                     renderThing(arr[0], arr[1])

                     FB.api(
                         ""+response.data[i].id+"?fields=place",
                         function (response2) {
                             if (response2 && !response2.error) {
                                 console.log("not error")
                                 console.log(response2)
                                 if(response2.place){
                                     $("#fillMeWithPost").append("PostCoord:" +response2.place.location.latitude + "and"+
                                         response2.place.location.longitude)
                                 }
                             }
                             //console.log(response2)

                         }
                     )

                 }
         }
     )
 })*/


/* $("#fbLogIn").click(function() {
     FB.login(function (response) {

     }, {scope: 'email,user_likes, user_posts'})
 })

 $("#loginWithFacebook").click(function(){

     FB.login(function (response) {
         console.log(response)

         $.ajax({
             url: 'server/Facebook.php?q=getUserByFacebook&facebook_id='+response.authResponse.userId,
             success: function(data){

             }
         })

     }, {scope: 'email,user_likes, user_posts'})


 })
*/

/*
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            console.log(response.authResponse.accessToken)
        }
    })
*/

export const getOtherUserProfile = (id, callback) => {

    $.ajax({
        url: 'server/Facebook.php?q=getFacebookIdByUserId&id=' + id,
        success: (data) => {
            let obj = JSON.parse(data)
            if (obj.length !== 0) {
                FB.getLoginStatus( (response) => { //TODO: fb
                    if (response.status === 'connected') {
                        FB.api(
                            "/" + obj[0].facebook_id + '?fields=name,hometown,cover,picture,location,about,businesses,books',
                            (response) => {
                                console.log(response)
                                callback(response)
                            }
                        )
                    } else {
                        callback('connectedNotLogin')
                    }
                })
            } else {
                callback('notConnected')
            }
        }
    })
}

getUserFriends = (id, callback) => {
    FB.getLoginStatus( (response) => {
        if (response.status === 'connected') {
            $.ajax({
                url: "server/Facebook.php?q=getFacebookIdByUserId&id=" + id,
                success: (data) => {
                    let obj = JSON.parse(data)
                    FB.api(
                        "/" + obj[0].facebook_id + "/friends",
                        (response) => {
                            let obj = JSON.parse(data)
                            console.log(obj)
                            // callback(response)
                        }
                    )
                }
            })
        }
    })
}

export const getUserPosts = (id, callback, user, list) => {
    if (list) {
        List.emptyList()
    }
    FB.getLoginStatus( (response) => {
        if (response.status === 'connected') {
            $.ajax({
                url: "server/Facebook.php?q=getFacebookIdByUserId&id=" + id,
                success: (data) => {
                    let obj = JSON.parse(data)

                    FB.api(
                        "/" + obj[0].facebook_id + "/posts",
                        (response) => {
                            if (response && !response.error) {
                                let posts = []
                                for (let i = 0; i < response.data.length; i++) {
                                    getPost(response.data[i].id, callback, user, list)
                                }
                            }
                        }
                    )
                }
            })
        }
    })
}

const getPost = (post_id, callback, user, list) => {
    FB.api(
        "" + post_id + "?fields=place,icon,picture,story,message,name,created_time,privacy,source,link",
        (response) => {
            if (response && !response.error) {
                console.log(response.privacy.value)
                if (response.privacy.value != "SELF") {
                    let point = new PointFacebook(response)
                    point.user_first = user.user_first
                    point.user_last = user.user_last
                    point.asUser = user
                    MapPoints.addObject(point, "temporary")
                    if (list) {
                        List.addObject(point)
                    } else {
                        callback(point)
                    }
                }
            }
        }
    )

}

const renderThing = (user_id, post_id) => {
    $("#fillMeWithPost").append("<iframe src=\"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2F" + user_id + "%2Fposts%2F" + post_id + "&width=2000\"  style=\"background-color:white border:noneoverflow:hidden\"  frameborder=\"0\" allowTransparency=\"true\"></iframe>")
}
