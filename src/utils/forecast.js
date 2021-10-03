const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a28e9da31e46355832d190007a71df48&query=' + latitude +',' + longitude

    request ({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to Weather services.', undefined )
        }
        else if(body.error){
            callback('Unable to find the Location. Try Again.', undefined)
        }
        else{
            current = body.current
            callback(undefined, 'It is currently ' + current.temperature + ' degrees out. It feels line '  + current.feelslike + ' degrees out.')
        }
    })

}

module.exports = forecast