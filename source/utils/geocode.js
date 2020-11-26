const request = require('postman-request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) +  ".json?access_token=pk.eyJ1IjoiYmVsbGVwbyIsImEiOiJja2hxZjRxNHIzcHdlMnRsNmRhM2J2OGJ4In0.Bl2B5ZwcV_ldqbwcxpQP1A&limit=1"
 
    request({url, json:true}, (error, {body})=> {
       if(error) {
          callback("impossible de se connecter au service de localisation")
       } else if (body.features.length === 0){
 
          callback("impossible de trouver la localité")
 
       } else {
          callback(undefined, {
             latitude: body.features[0].center[1],
             longitude: body.features[0].center[0],
             location: body.features[0].place_name 
          })
       }
    })
 }

 module.exports = geocode