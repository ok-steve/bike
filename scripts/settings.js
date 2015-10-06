(function () {
  var app = angular.module('settings', []);

  app.controller('SettingsController', function () {
    this.preferences = {
      high: 90,
      low: 50,
      precip: 10,
      offset: 10,
      limit: 8
    };

    this.editPrefs = function (answer) {
      answer.preferences = this.preferences;
    }
  });
})();
