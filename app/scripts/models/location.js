/*global define*/

define([
    'underscore',
    'backbone',
    'config'
], function (_, Backbone, config) {
    'use strict';

    var LocationModel = Backbone.Model.extend({
        defaults: {
            latitude: config.LATITUDE,
            longitude: config.LONGITUDE
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

                this.trigger('change');
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
