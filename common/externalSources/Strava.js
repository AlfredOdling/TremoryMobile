Strava = (function () {


    function getUser(id, callback) {
        $.ajax({
            url: 'server/external/Strava.php?q=getUser&id='+id,
            success: function (data) {
                let obj = JSON.parse(data);
                callback(obj);
            }
        });
    }

    function getActivities(id, callback, user, list){
        $.ajax({
            url: 'server/external/Strava.php?state=&q=getActivities&id=' + id,
            success: function (data) {
                let obj = JSON.parse(data);
                console.log(obj);
                if(list) {
                    List.emptyList();
                }
                let activities = [];
                for (let i = 0; i < obj.length; i++) {
                    let activity = new PointStrava(obj[i]);
                    activity.user_first = user.user_first;
                    activity.user_last = user.user_last;
                    activity.asUser = user;

                    MapPoints.addObject(activity, "temporary");
                    if(list) {
                        List.addObject(activity, "strava");
                    }
                    else {
                        activities.push(activity);
                    }
                }
                callback(activities);
            }
        });
    }

    return {
        getUser: getUser,
        getActivities: getActivities
    }

})();