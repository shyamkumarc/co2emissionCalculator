const axios = require("axios"); //  to handle API query
const boxen = require("boxen"); // for beautifying the outputs
const { exit } = require("yargs");

exports.vehicletypes = vehicletypes = {  // all valid type of mode of tranports
    'small-diesel-car': 142,
    'small-petrol-car': 154,
    'small-plugin-hybrid-car': 73,
    'small-electric-car': 50,
    'medium-diesel-car': 171,
    'medium-petrol-car': 192,
    'medium-plugin-hybrid-car': 110,
    'medium-electric-car': 58,
    'large-diesel-car': 209,
    'large-petrol-car': 282,
    'large-plugin-hybrid-car': 126,
    'large-electric-car': 73
};

//This method returns the co-ordinates for a given city
function findCoordinates(cityName) {

    return axios.get('https://api.openrouteservice.org/geocode/search', {
        headers: {
            Accept: 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8'
        },
        params: {
            api_key: process.env.ORS_TOKEN, 
            text: cityName
        }
    });
}

//This method takes  in city names and MOT and  does the calculation of  CO2 emissions 
exports.findDistance = async (options) => {

   
    try {
        var startPoint = await findCoordinates(options.start); // get details of starting city
        var endPoint = await findCoordinates(options.end); // get details of destination city   
      } catch(err) {
        console.log(err.response.data.error); // TypeError: failed to fetch
        exit();
      }
    var transport = options.transportationMethod; //MOT 



    const boxenOptions = { // For use in normal outputs
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: "green",
        backgroundColor: "#555555"
    };


    var errBoxenOptions = { // for use in Error messages
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: "red",
        backgroundColor: "#555555"
    };


    if (startPoint.data.features.length == 0 || endPoint.data.features.length == 0) { // if no data found for cities, issue error message
        var msgBox = boxen('Error: Please enter valid city names!', errBoxenOptions);
        console.log(msgBox);
    }
    else {

        axios.get('https://api.openrouteservice.org/v2/directions/driving-car', {
            headers: {
                Accept: 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8'
            },
            params: {
                api_key: process.env.ORS_TOKEN, 
                start: startPoint.data.features[0].geometry.coordinates[0].toString() + ',' + startPoint.data.features[0].geometry.coordinates[1].toString(), // start co-ordinates
                end: endPoint.data.features[0].geometry.coordinates[0].toString() + ',' + endPoint.data.features[0].geometry.coordinates[1].toString() // End co-ordinates

            }
        }).then(res => {  //Success
            const boxenOptions = {
                padding: 1,
                margin: 1,
                borderStyle: "round",
                borderColor: "green",
                backgroundColor: "#555555"
            };
            var distanceKM = res.data.features[0].properties.summary.distance / 1000; // calculate distance in KM

            var co2Emissions = vehicletypes[transport] * distanceKM / 1000; // calculate CO2 emission based on distance and MOT

            var msgBox = boxen(`Your trip caused ${co2Emissions} KGs of CO2-equivalent.`, boxenOptions);
            console.log(msgBox);
            console.log('From : ' + startPoint.data.features[0].properties.name + ',' + startPoint.data.features[0].properties.region + ',' + startPoint.data.features[0].properties.country);
            console.log('To : ' + endPoint.data.features[0].properties.name + ',' + endPoint.data.features[0].properties.region + ',' + endPoint.data.features[0].properties.country);

        }).catch(err => { // Error/ Exception
            console.log(startPoint.data.features[0].properties.name + ',' + startPoint.data.features[0].properties.region + ',' + startPoint.data.features[0].properties.country);
            console.log(endPoint.data.features[0].properties.name + ',' + endPoint.data.features[0].properties.region + ',' + endPoint.data.features[0].properties.country);
            // console.log(err);
            try {
                var msgBox = boxen('Error: ' + err.response.data.error.message, errBoxenOptions);
                console.log(msgBox);
            }
            catch (error) {
                console.log(err);
            }
        });
    }
}



