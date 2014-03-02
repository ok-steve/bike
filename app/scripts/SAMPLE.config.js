define([
],

function () {
    var config = {
        baseUrl: 'https://api.forecast.io/forecast',

        apiKey: '',

        latitude: '',

        longitude: '',

        url: function () {
            return this.baseUrl + '/' + this.apiKey + '/' + this.latitude + ',' + this.longitude;
        }
    };

    return config;
});
