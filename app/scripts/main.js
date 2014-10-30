/*global require*/
'use strict';

require.config({
  shim: {
    handlebars: {
      exports: 'Handlebars'
    }
  },
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/lodash/dist/lodash',
    handlebars: '../bower_components/handlebars/handlebars'
  }
});

require([
  'backbone',
  'app'
], function (Backbone, App) {
  Backbone.history.start({ });
  App.start();

  $('.js-toggle').click(function () {
    $('.js-collapse').toggleClass('in');
  })
});
