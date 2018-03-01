import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
let GoogleMapsLoader = require('google-maps')

console.log('GoogleMapsLoader.......', GoogleMapsLoader)

export default class GoogleMaps extends React.Component {

    componentWillMount() {

        this.state = {
            polylineArray: [],
        }

        this.setupMap()
    }

    setupMap = () => {

        GoogleMapsLoader.load((google) => { console.log('google...', google) this.setState({ google }) })

        let opt = this.options()
        let el = document.getElementById('googleMaps')

        GoogleMapsLoader.load((google) => {
            let map = new google.maps.Map(el, opt)
            this.setState({ map })
        })

        let markerArray = []
        let pointArray = []
        let polyArray = []

        this.setZoomListener()

        let CListenerDown
        let CListenerUp
        let firstC
        let lastC
        let previousSelection = new google.maps.Polygon({
            paths: [{
                lat: 0,
                lng: 0
            }, {
                lat: 0,
                lng: 0
            }
            ],
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.05
        })

        this.createStyles()
    }

    //Example to load GeoJson polygons.
    //map.data.loadGeoJson('https://storage.googleapis.com/maps-devrel/google.json')
    /**
     * @returns map options
     */
    options = () => {
        return {
            center: new this.state.google.maps.LatLng(63.818742, 20.31),
            zoom: 5,
            mapTypeControlOptions: {
                style: this.state.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: this.state.google.maps.ControlPosition.TOP_CENTER,
                mapTypeIds: [
                    //google.maps.MapTypeId.ROADMAP,
                    this.state.google.maps.MapTypeId.HYBRID,
                    'black',
                    'retro',
                    'NYC'

                ]
            },
            zoomControl: true,
            zoomControlOptions: {
                position: this.state.google.maps.ControlPosition.LEFT_BOTTOM
            },
            streetViewControl: true,
            streetViewControlOptions: {
                position: this.state.google.maps.ControlPosition.LEFT_BOTTOM
            },

            minZoom: 3
        }
    }

    createStyles = () => {
        let styledMap = style(Styles.blackWhite(), "Black")
        let NYCStyled = style(Styles.styleNYC(), "NYC")
        let RoadKill = style(Styles.roadKill(), "RoadKill")
        let Retro = style(Styles.retro(), "Retro")

        // Set map styles to map and select default one.
        setType('NYC', NYCStyled)
        setType('RoadKill', RoadKill)
        setType('black', styledMap)
        setType('retro', Retro)
        selectType(this.state.google.maps.MapTypeId.HYBRID)
    }

    /**
     * Add style to google style object
     * @param style
     * @param name
     * @returns {google.maps.StyledMapType}
     */
    style = (style, name) => {
        return new google.maps.StyledMapType(style,
            { name })
    }

    /**
     * Add style to map
     * @param name
     * @param style
     */
    setType = (name, style) => {
        map.mapTypes.set(name, style)
        this.setState({ map })
    }

    /**
     * Select style manually
     * @param name
     */
    selectType = (name) => {
        map.setMapTypeId(name)
        this.setState({ map })
    }


    setZoomListener = () => {
        map.addListener('zoom_changed', function () { //TODO: does this work without setstate?
            //console.log('Zoom: ' + map.getZoom())
        })
    }

    decodeLevels = (encodedLevelsString) => {
        let decodedLevels = []

        for (let i = 0; i < encodedLevelsString.length; ++i) {
            let level = encodedLevelsString.charCodeAt(i) - 63
            decodedLevels.push(level)
        }
        return decodedLevels
    }

    displayCoordinates = (pnt) => {
        let lat = pnt.lat()
        lat = lat.toFixed(4)
        let lng = pnt.lng()
        lng = lng.toFixed(4)
        console.log("Latitude: " + lat + "  Longitude: " + lng)
    }

    deleteCoordinatesListener = () => {
        google.maps.event.removeListener(CListenerDown)
        google.maps.event.removeListener(CListenerUp)

        console.log(firstC + "          " + lastC)

        drawBox(firstC, lastC)
    }

    drawBox = (corner1, corner2) => {
        let north, south, east, west

        if (corner1.lat() > corner2.lat()) {
            north = corner1.lat()
            south = corner2.lat()
        }
        else {
            north = corner2.lat()
            south = corner1.lat()
        }

        if (corner1.lng() > corner2.lng()) {
            east = corner1.lng()
            west = corner2.lng()
        }
        else {
            east = corner2.lng()
            west = corner1.lng()
        }

        let bermudaTriangle = new google.maps.Polygon({
            paths: [{
                lat: north,
                lng: east
            }, {
                lat: north,
                lng: west
            }
                , {
                lat: south,
                lng: west
            }, {
                lat: south,
                lng: east
            }],
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.05
        })
        bermudaTriangle.setMap(map)

        previousSelection.setMap(null)
        previousSelection = bermudaTriangle
    }





    render() {
        return (
            <Div id="googleMaps" style={styles.content}>

            </Div>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#4b4b4b',

    },
    textStyle: {
        color: '#DDD',
    }
})