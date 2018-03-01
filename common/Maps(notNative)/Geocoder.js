
var geo = new google.maps.Geocoder

export const getAddress = (lat, lng, callback) => {
    var latlng = {
        lat: parseFloat(lat),
        lng: parseFloat(lng)
    }
    geo.geocode({
        location: latlng
    }, (results, status) => {

        if (status === 'OK') {
            let loc = createLocation(results)
            callback(loc)
        } else {
            console.log('Geocoder failed due to: ' + status)
        }
    })
}

export const getLocation = (place_id, callback) => {
    geo.geocode({
        'placeId': place_id
    }, (results, status) => {
        if (status === 'OK') {
            callback(createLocation(results))
        }
    });
}

createLocation = (results) => {
    var place = {}
    var localityNum = 0

    for (var i = 0; i < results[0].address_components.length; i++) {

        if (results[0].address_components[i].types[0] == 'locality') {
            place.locality = results[0].address_components[i].long_name
        }
        else if (results[0].address_components[i].types[0] == 'country') {
            place.country = results[0].address_components[i].long_name
        }
    }

    for (var i = 0; i < results.length; i++) {
        if (results[i].address_components[0].types[0] == 'locality') {
            place.locality = results[i].address_components[0].long_name
            localityNum = i
        }
        else if (results[i].address_components[0].types[0] == 'country') {
            place.country = results[i].address_components[0].long_name
        }
    }

    var loc = new Location(results[localityNum])

    return loc
}

export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}