const request = require('postman-request')

// Gives Location from Latitude Longitude

const geoCodeReverse = (latitude, longitude, callback) => {

    // API call to get the Location from Latitude and Longitude
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + longitude + ',' + latitude + '.json?access_token=pk.eyJ1Ijoic2hpdmFta2QiLCJhIjoiY2t1MWlybDYyMGF5ZTJwcWs1ZTF4ZGg0YSJ9.qXQB5DQqFjOxyxkhBaTaqA&limit=1'
        // Creating Log
    console.log('URL to Get the Location from Latitude and Longitude', url)

    // Making a https request to the URL to get the JSON response
    request({ url, json: true }, (error, { body } = {}) => {
        console.log('Body', body)

        // If the response has error in it
        if (error) {
            callback('Unable to find the given Lat and Long', undefined)
        } else if (body.features.length == 0) { // if the given latitude has no such location
            callback('No result found', undefined)
        } else {

            // callback function which has location passed as a data - address
            callback(undefined, {
                // Updating the location name
                address: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCodeReverse