var NodeGeocoder = require('node-geocoder');

exports.geocode = function(req) {
  return new Promise((resolve, reject) => {
    var options = {
      provider: 'google',  
      httpAdapter: 'https', // Default
      apiKey: 'AIzaSyCEheMxtUig64jFuGOWEjAPhsCFKDpy-OA', // for Mapquest, OpenCage, Google Premier
      formatter: null         // 'gpx', 'string', ...
    };

    var Geocoder = NodeGeocoder(options);

    Geocoder.geocode(req)
      .then(function(res) {          
        var data = {
          formattedAddress: res[0].formattedAddress,
          latitude: res[0].latitude,
          longitude: res[0].longitude,
        }
        resolve(data);
      })
      .catch(function(err) {
        reject(err);
      });
  });
}

 