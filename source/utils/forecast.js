const request = require('postman-request')


const forecast = (latitude, longitude,  callback) => {

    const url = `http://api.weatherstack.com/current?access_key=802c8dc5d967373b177ce481a97caf2c&query=${latitude},${longitude}`

    request({url, json: true}, (error, {body})=>{
 
    
    if (error) {

        callback("impossible de se connecter au service météo")

    } else if (body.error) {
        
        callback("localité non trouvée")

    } else {
    const dataCurrent = body.current
    const phrase = `${dataCurrent.weather_descriptions}. Il fait actuellement ${dataCurrent.temperature} degrés et la température ressentie est de ${dataCurrent.feelslike} degrés`

    callback(undefined, phrase)  
    }
    
    
    })

}

module.exports = forecast