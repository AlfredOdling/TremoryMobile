
/**
 *  Google map adapter
 *  Handles all communication between the map and the rest
 *  of the code.
 *
 * @type {{fly, addMarker, addPoint, addPoly, removeAllMarkers, removeAllPoly, addInstagram}}
 */


  /**
   * Add simple marker to map, Mainly for testing
   * @param lat
   * @param lng
   */
  export const addMarker = (lat, lng) => {
    let marker = new google.maps.Marker({
      position: {
        lat: lat,
        lng: lng
      },
      map: map
    })

    markerArray.push(marker)
  }

  export const addPoint = (lat, lng, func, color) => {
    let icon

    //Not sure how to handle different icons, this is not it though.
    //Probably own .js class.
    if (color == "red") {
      icon = 'images/iconRedCycle.png'
    } else if (color == "yellow") {

    } else if (color == "green") {
      icon = 'images/iconGreenSunset.png'
    } else {
      icon = color
    }

    if (lat != 0 || lng != 0) {
      let marker = new google.maps.Marker({
        position: {
          lat: lat,
          lng: lng
        },
        map: map,
        icon: {
          url: icon
        }
      })
    }
    if (marker) {
      marker.addListener('click', function (e) {
        func("map")
      })
      return marker
    }
    return null

    //pointArray.push(marker)
  }

  export const addPolyLineKML = (lat, lng) => {
    let path = []
    for (let i = 0; i<lat.length; i++){
      path.push({ lat: lat[i], lng: lng[i] })
    }

    let flightPath = new google.maps.Polyline({
      path: path,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
      map: map
    })
    //flightPath.setMap(map)
  }

  /**
   * Remove specific marker
   * @param marker
   */
  export const setMarkerMap = (marker) => {
    if (marker) {
      marker.setMap(map)
    }
  }

  /**
   * Remove all markers
   */
  export const removeAllMarkers = () => {
    let arrayL = markerArray.length
    let i

    for (i = 0; i < arrayL; i++) {

      markerArray[i].setMap(null)
    }
    markerArray = []
  }

  /**
   * Fly to coordinates, doesn't set zoom. Maybe should?
   * @param lat
   * @param lng
   */
  export const fly = (lat, lng) => {
    let chicago = { lat: lat, lng: lng }
    map.setCenter(chicago)
    this.setState({ map })    
  }

  /**
   * Add polygon to map
   * @param coords array of coordinates
   */
  export const addPoly = (coords) => {
    if (coords.type == "MultiPolygon") {
      let i
      let triangleCoords = []

      for (i = 0; i < coords.coordinates[0][0].length; i++) {

        let point = { lat: coords.coordinates[0][0][i][1], lng: coords.coordinates[0][0][i][0] }
        triangleCoords.push(point)
      }

      let bermudaTriangle = new google.maps.Polygon({
        paths: triangleCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      })
      bermudaTriangle.setMap(map)
      polyArray.push(bermudaTriangle)
    }
  }

  /**
   * Remove all polygons
   * not in use if Search.js is rewritten
   */
  export const removeAllPoly = () => {
    let arrayL = polyArray.length
    let i

    for (i = 0; i < arrayL; i++) {
      polyArray[i].setMap(null)
    }
    polyArray = []
  }

  export const addGrabIcon = (lat, lng) => {
    let marker = new google.maps.Marker({
      position: map.center,
      map: map,
      draggable: true
    })

    lat.html(marker.position.lat)
    lng.html(marker.position.lng)

    marker.addListener('drag', function () {
      lat.html(marker.position.lat)
      lng.html(marker.position.lng)
    })

    return marker
  }

  export const setZoom = (zoom) => {
    map.setZoom(zoom)
    this.setState({ map })
  }

  export const renderKML = (file) => {
    let kml = new google.maps.KmlLayer({
      //url: 'localhost/Tremory/'+file,
      //url: "http://www.geocodezip.com/geoxml3_test/kml/SO_20170326_layer_fixed.kml",
      url: "https://localhost/tremory/server/getKML.php?id=1003&kl=.kml",
      map: map

    })

    google.maps.event.addListenerOnce(kml, 'status_changed', function () {
      console.log('KML status is', kml.getStatus())
      console.log(kml)
    })
  }

  export const getCoordinatesFromMouse = (callback) => {
    console.log('mousedown event is set')
    // map.setOptions({draggable: false})

    CListenerDown = google.maps.event.addListener(map, 'mousedown', function (event) {
      //  displayCoordinates(event.latLng)
      console.log('mousemovement is triggered')
      firstC = event.latLng

      CListenerUp = google.maps.event.addListener(map, 'mouseup', function (event) {
        // displayCoordinates(event.latLng)
        console.log('mouseup is triggered')
        lastC = event.latLng

        let north, south, east, west

        if (firstC.lat() > lastC.lat()) {
          north = firstC.lat()
          south = lastC.lat()
        }
        else {
          north = lastC.lat()
          south = firstC.lat()
        }

        if (firstC.lng() > lastC.lng()) {
          east = firstC.lng()
          west = lastC.lng()
        }
        else {
          east = lastC.lng()
          west = firstC.lng()
        }

        callback(north, east, south, west)
        deleteCoordinatesListener()
        // map.setOptions({draggable: true})
      })
      console.log("tEvent:" + event.ctrlKey)
      event.stopPropagation()
    })
  }


export const deleteDrawList = () => {
  google.maps.event.removeListener(CListenerDown)
  google.maps.event.removeListener(CListenerUp)
}

export const addPolyline = (resource) => {
  let decodedPath = google.maps.geometry.encoding.decodePath(resource)
  //  decodedPath = google.maps.geometry.encoding.decodePath("uwpqGuu_zAiEsDrClMoGyC}BbOPjGhD~NtAn@gAvJKcCuQ`b@eDpCyCMqCgJyF_EwEhASbErBmAs@mCfBiApHhC|DyLQiCrDFrFqKrCkLzFl@uBoLzBeRrGpC_DiHl@mC~D`F")
  let decodedLevels = decodeLevels("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")

  let setRegion = new google.maps.Polyline({
    path: decodedPath,
    levels: decodedLevels,
    strokeColor: "#0000F0",
    strokeOpacity: 1.0,
    strokeWeight: 3,
    map: map
  })

  this.setState({
    polylineArray: polylineArray.push(setRegion)
  })
  
  return setRegion
}

export const clearStrokeColor = () => {
  let polylineArray = this.state.polylineArray

  for (let i = 0; i < polylineArray.length; i++) {
    polylineArray[i].setOptions({ strokeColor: '#0000F0' })
  }

  this.setState({ polylineArray })
}

export const getMap = () => { return this.state.map }
