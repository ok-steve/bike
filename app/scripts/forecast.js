(function ($, _) {
  var app = angular.module('forecast', ['config']);

  app.controller('ForecastController', ['$http', 'config', function ($http, config) {
    var self = this;

    this.forecast = {};

    this.setForecast = function (hours) {
      this.forecast = {
        high: _.max(hours, function (hour) {
          return hour.temperature;
        }).temperature,

        low: _.min(hours, function (hour) {
          return hour.temperature;
        }).temperature,

        precip: _.max(hours, function (hour) {
          return hour.precipProbability;
        }).precipProbability * 100
      };
    };

    this.pullData = function (lat, lon) {
      $http.jsonp('https://api.forecast.io/forecast/' + config.API_KEY + '/' + lat + ',' + lon + '?exclude=currently,minutely,daily,alerts,flags&callback=JSON_CALLBACK').success(function (data) {
          var hours = _.first(data.hourly.data, 8); // TODO - get from SettingsController

          self.setForecast(hours);
      }).error(function(data, status, header, config){
        console.log(status);
      });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        self.pullData(position.coords.latitude, position.coords.longitude);
      });
    } else {
      self.pullData(config.LATITUDE, config.LONGITUDE);
    }
  }]);
})(jQuery, _);
