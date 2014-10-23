/*global define*/

define([
  'underscore',
  'backbone',
  'config',
  'utils'
], function (_, Backbone, config, Utils) {
  'use strict';

  var LocationModel = Backbone.Model.extend({
    url: '',

    initialize: function() {
    },

    defaults: {
      latitude: config.LATITUDE,
      longitude: config.LONGITUDE
    },

    validate: function(attrs, options) {
    },

    parse: function(response, options)  {
      return response;
    },

    load: function () {
      var self = this;

      function success (position) {
        self.updateLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          forceRefresh: true
        });
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          self.updateLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            forceRefresh: true
          });
        });
      }
    },

    updateLocation: function (options) {
      var latitude = options.latitude || this.get('latitude'),
        longitude = options.longitude || this.get('longitude');

      if (options.forceRefresh) {
        this.set({
          'latitude': latitude,
          'longitude': longitude
        },
        {
          silent: true
        });

        Utils.vent.trigger('location:loaded');
      } else {
        this.set({
          'latitude': latitude,
          'longitude': longitude
        });
      }
    }
  });

  return LocationModel;
});
