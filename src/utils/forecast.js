const request = require('postman-request');

const forecast = ({latitude, longitude}, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=8bdd35e9d8f7cceabea0ea40f06957f8&query=${ latitude },${ longitude }`;
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined);
        } else if (body.error) {
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined, body.current);
        }
    });
}

module.exports = forecast;