(function ($) {
  var app = angular.module('forecast', ['config']);

  app.controller('AnswerController', ['$http', 'config', function ($http, config) {
    var that = this;

    this.forecast = {};

    this.preferences = preferences;

    $http.jsonp('https://api.forecast.io/forecast/' + config.API_KEY + '/' + config.LATITUDE + ',' + config.LONGITUDE + '?exclude=currently,minutely,daily,alerts,flags&callback=JSONP_CALLBACK').success(function (data) {
      that.forecast = data;
    });

    this.setAnswer = function () {
      if (this.forecast.high <= this.preferences.high && this.forecast.low >= this.preferences.low && this.forecast.precip <= this.preferences.precip) {
        return 'yes'
      } else if (this.forecast.high <= this.preferences.high + this.preferences.offset && this.forecast.low >= this.preferences.low - this.preferences.offset && this.forecast.precip <= this.preferences.precip + this.preferences.offset) {
        return 'maybe'
      } else {
        return 'no'
      }
    };
  }]);

  app.controller('SettingsController', function () {
    this.settings = preferences;

    this.editPrefs = function (answer) {
      answer.preferences = this.settings;
    }
  });

  var preferences = {
    high: 90,
    low: 50,
    precip: 10,
    offset: 10,
    limit: 8
  };

  $('.js-toggle').click(function () {
    $('.js-collapse').toggleClass('in');
  });
})(jQuery);
