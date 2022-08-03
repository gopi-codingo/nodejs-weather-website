const request = require('postman-request'); 

const geocode = (address, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=01ca62e3f5e182e2b6eb35556b76fafe&query=${ encodeURIComponent(address) }&limit=1`;
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to position service.', undefined);
        } else if (body.error || body.data.length === 0) {
            callback('Unable to obtain position coordinates.', undefined);
        } else {
            const {latitude, longitude, label: location} = body.data[0];
            callback(undefined, {
                latitude,
                longitude,
                location,
            });
        }
    });
}

module.exports = geocode;