import Geocoder from 'react-native-geocoding'
import { addLocationToPoint } from '../utils/static/PointFetch'

export async function getLocation(lat, lng, point_id) {
    Geocoder.setApiKey('AIzaSyCArIlwT7KWfKsW5kV4TjHFx8NJ8pUTSak')
    Geocoder.getFromLatLng(lat, lng)
        .then((json) => {
            var address_component = json.results[0].address_components[0]

            addLocationToPointWrapper(createLocation(json.results), point_id)
            return 'success'
        })
        .catch(error => {  
            console.log('Geocoder error: ', error) 
            return 'error'
        })
}

function createLocation(results) {

   // var place = {};
    var localityNum = 0;

    for (var i = 0; i < results[0].address_components.length; i++) {

        if (results[0].address_components[i].types[0] == 'locality') {
           //place.locality = results[0].address_components[i].long_name;
        }
        else if (results[0].address_components[i].types[0] == 'country') {
            //place.country = results[0].address_components[i].long_name;
        }
    }

    for (var i = 0; i < results.length; i++) {
        if (results[i].address_components[0].types[0] == 'locality') {
            //place.locality = results[i].address_components[0].long_name;
            localityNum = i;
        }
        else if (results[i].address_components[0].types[0] == 'country') {
            //place.country = results[i].address_components[0].long_name;
        }
    }

    //var loc = new Location(results[localityNum]);

    console.log('====================================');
    console.log(results[localityNum]);
    console.log('====================================');

    return results[localityNum];
}

function addLocationToPointWrapper(place, point_id) {
    let place_id = place.place_id
    let west = place.geometry.viewport.southwest.lng
    let east = place.geometry.viewport.northeast.lng
    let north = place.geometry.viewport.northeast.lat
    let south = place.geometry.viewport.southwest.lat
    let locality = null
    let route = null
    let political = null
    let sublocality = null
    let lan = null
    let country = null
    let continent = null

    for (var i = 0; i < place.address_components.length; i++) {
        if (place.address_components[i].types[0] == 'route') {
            route = place.address_components[i].long_name
        }
        else if (place.address_components[i].types[0] == 'political') {
            political = place.address_components[i].long_name
        }
        else if (place.address_components[i].types[0] == 'sublocality') {
            sublocality = place.address_components[i].long_name
        }
        else if (place.address_components[i].types[0] == 'locality') {
            locality = place.address_components[i].long_name
        }
        else if (place.address_components[i].types[0] == "administrative_area_level_1") {
            lan = place.address_components[i].long_name
        }
        else if (place.address_components[i].types[0] == 'country') {
            country = place.address_components[i].long_name
            continent = getContinentByCountry(country)
        }
    }

    if (!locality) {
        locality = lan
    }
    if (!locality) {
        locality = country
    }

    console.log('====================================');
    console.log("point id",point_id);
    console.log("locality",locality);
    console.log("län", lan);
    console.log("country",country);
    console.log("continent",continent);
    console.log('====================================');

    addLocationToPoint(point_id, place_id, locality, lan, country, continent)
}

function getContinentByCountry(country) {
    let continent = null

    if (continentDoesContain("africa", country)) {
        continent = "africa"
    }
    else if (continentDoesContain("asia", country)) {
        continent = "asia"
    }
    else if (continentDoesContain("europe", country)) {
        continent = "europe"
    }
    else if (continentDoesContain("north_america", country)) {
        continent = "north_america"
    }
    else if (continentDoesContain("south_america", country)) {
        continent = "south_america"
    }
    else if (continentDoesContain("oceania", country)) {
        continent = "oceania"
    }

    return continent
}

function continentDoesContain(continent, country) {

    let europe = [
        "albania",
        "andorra",
        "armenia",
        "austria",
        "azerbaijan",
        "belarus",
        "belgium",
        "bosnia_&_herzegovina",
        "bulgaria",
        "croatia",
        "cyprus",
        "czech_republic",
        "denmark",
        "estonia",
        "finland",
        "france",
        "georgia",
        "germany",
        "greece",
        "hungary",
        "iceland",
        "ireland",
        "italy",
        "latvia",
        "liechtenstein",
        "lithuania",
        "luxembourg",
        "macedonia",
        "malta",
        "moldova",
        "monaco",
        "montenegro",
        "netherlands",
        "norway",
        "poland",
        "portugal",
        "romania",
        "russia",
        "san_marino",
        "serbia",
        "slovakia",
        "slovenia",
        "spain",
        "sweden",
        "switzerland",
        "turkey",
        "ukraine",
        "united_kingdom",
        "vatican_city",
        "Albania",
        "Andorra",
        "Armenia",
        "Austria",
        "Azerbaijan",
        "Belarus",
        "Belgium",
        "Bosnia_&_herzegovina",
        "Bulgaria",
        "Croatia",
        "Cyprus",
        "Czechia",
        "Denmark",
        "Estonia",
        "Finland",
        "France",
        "Georgia",
        "Germany",
        "Greece",
        "Hungary",
        "Iceland",
        "Ireland",
        "Italy",
        "Latvia",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macedonia",
        "Malta",
        "Moldova",
        "Monaco",
        "Montenegro",
        "Netherlands",
        "Norway",
        "Poland",
        "Portugal",
        "Romania",
        "Russia",
        "San Marino",
        "Serbia",
        "Slovakia",
        "Slovenia",
        "Spain",
        "Sweden",
        "Switzerland",
        "Turkey",
        "Ukraine",
        "United Kingdom",
        "Vatican City"
    ]

    let north_america = [
        "antigua_&_barbuda",
        "bahamas",
        "barbados",
        "belize",
        "canada",
        "costa_rica",
        "cuba",
        "dominica",
        "dominican_republic",
        "el_salvador",
        "grenada",
        "guatemala",
        "haiti",
        "honduras",
        "jamaica",
        "mexico",
        "nicaragua",
        "panama",
        "st_kitts_&_nevis",
        "saint_lucia",
        "st_vincent_&_the_grenadines",
        "trinidad_&_tobago",
        "united_states_of_america",
        "Antigua and Barbuda",
        "BBahamas",
        "Barbados",
        "Belize",
        "Canada",
        "Costa Rica",
        "Cuba",
        "Dominica",
        "Dominican Republic",
        "El Salvador",
        "Grenada",
        "Guatemala",
        "Haiti",
        "Honduras",
        "Jamaica",
        "Mexico",
        "Nicaragua",
        "Panama",
        "St Kitts and Nevis",
        "Saint Lucia",
        "St Vincent and the Grenadines",
        "Trinidad and Tobago",
        "United States"
    ]

    let south_america = [
        "Argentina",
        "Bolivia",
        "Brazil",
        "Chile",
        "Colombia",
        "Ecuador",
        "Guyana",
        "Paraguay",
        "Peru",
        "Suriname",
        "Uruguay",
        "Venezuela"
    ]

    let africa = [
        "Algeria",
        "Angola",
        "Benin",
        "Botswana",
        "Burkina Faso",
        "Burundi",
        "Cameroon",
        "Cape Verde",
        "Central African Republic",
        "Chad",
        "Comoros",
        "Republic of the Congo",
        "Democratic Republic of the Congo",
        "Djibouti",
        "Egypt",
        "Equatorial_guinea",
        "Eritrea",
        "Ethiopia",
        "Gabon",
        "Gambia",
        "Ghana",
        "Guinea",
        "Guinea Bissau",
        "Cote d'Ivoire",
        "Kenya",
        "Lesotho",
        "Liberia",
        "Libya",
        "Madagascar",
        "Malawi",
        "Mali",
        "Mauritania",
        "Mauritius",
        "Morocco",
        "Mozambique",
        "Namibia",
        "Niger",
        "Nigeria",
        "Rwanda",
        "Sao Tome and Principe",
        "Senegal",
        "Seychelles",
        "Sierra Leone",
        "Somalia",
        "South Africa",
        "South Sudan",
        "Swaziland",
        "Tanzania",
        "Togo",
        "Tunisia",
        "Uganda",
        "Zambia",
        "Zimbabwe"
    ]

    let asia = [
        "Afghanistan",
        "Armenia",
        "Azerbaijan",
        "Bahrain",
        "Bangladesh",
        "Bhutan",
        "Brunei",
        "Cambodia",
        "China",
        "Cyprus",
        "Timor Leste",
        "Georgia",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Israel",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Lebanon",
        "Macau",
        "macau",
        "Macao",
        "macao",
        "Malaysia",
        "Maldives",
        "Mongolia",
        "Myanmar",
        "Nepal",
        "North Korea",
        "Oman",
        "Pakistan",
        "Palestine",
        "Philippines",
        "Qatar",
        "Saudi Arabia",
        "Singapore",
        "South Korea",
        "Sri Lanka",
        "Taiwan",
        "Tajikistan",
        "Thailand",
        "Turkey",
        "Turkmenistan",
        "United Arab Emirates",
        "Uzbekistan",
        "Vietnam",
        "Yemen"
    ]

    let oceania = [
        "Australia",
        "Cook Islands",
        "Fiji",
        "Kiribati",
        "Marshall Islands",
        "Micronesia",
        "Nauru",
        "New Zealand",
        "Palau",
        "Papua New Guinea",
        "Samoa",
        "Solomon Islands",
        "Tonga",
        "Tuvalu",
        "Vanuatu"
    ]

    if (continent === "south_america") {
        return south_america.includes(country)
    }
    else if (continent === "north_america") {
        return north_america.includes(country)
    }
    else if (continent === "europe") {
        return europe.includes(country)
    }
    else if (continent === "africa") {
        return africa.includes(country)
    }
    else if (continent === "oceania") {
        return oceania.includes(country)
    }
    else if (continent === "asia") {
        return asia.includes(country)
    }
}
