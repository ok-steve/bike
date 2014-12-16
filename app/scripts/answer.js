(function ($) {
  var app = angular.module('answer', ['settings', 'forecast']);

  app.controller('AnswerController', [function () {
    this.preferences = { // TODO - Initialize this data from SettingsController
      high: 90,
      low: 50,
      precip: 10,
      offset: 10,
      limit: 8
    };

    this.forecast = {
      high: 47,
      low: 44,
      precip: 20
    };

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

  $('.js-toggle').click(function () {
    $('.js-collapse').toggleClass('in');
  });
})(jQuery);
