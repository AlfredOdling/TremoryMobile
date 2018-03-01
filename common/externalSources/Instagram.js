/** Instagram
 *
 *  Loads the link to grab the instagram token
 *  See function in points to load instagram data after a
 *  token is received.
 *
 *  Everything instagram should be considered to add here.
 *
 *  Revealing modular pattern
 *
 *  @type {{connectInstagram}}
 *  Not in use currently
 */
Instagram = (function(){

    /** Loads link that grabs instagram token
     *  note host is currently local, configure file?
     */
    function connectInstagram(){
        View.body(
            "<a href=\"https://www.instagram.com/oauth/authorize/?" +
            "client_id=1d6912fcd8c044b49069ae426d777ea1&" +
            "redirect_uri=https://localhost/tremory/server/saveToken.php&" +
            "response_type=code\">" +
            "InstagramThingy</a><a href=\"https://api.instagram.com/v1/users/self/?" +
            "access_token=2028288307.1d6912f.a10fe884bef14becb29e35b6b5205043\">THING</a>"
            );
    }

    function getUser(callback){
        $.ajax({
            url: "server/external/Instagram.php?q=getUserByCurrent",
            success: function (data) {
                callback(JSON.parse(data));
            }
        })
    }

    function getOtherUserProfile(id, callback) {
        $.ajax({
            url: "server/external/Instagram.php?q=getOtherUserProfile&id="+id,
            success: function (data) {
                callback(JSON.parse(data));
            }
        })
    }

    return {
        connectInstagram : connectInstagram,
        getUser: getUser,
        getOtherUserProfile: getOtherUserProfile
    }
})();