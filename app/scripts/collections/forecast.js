/*global define*/

define([
    'underscore',
    'backbone',
    'config',
    'models/forecast'
], function (_, Backbone, config, ForecastModel) {
    'use strict';

    var ForecastCollection = Backbone.Collection.extend({
        model: ForecastModel,

        initialize: function (options) {
            this.location = options.location;

            this.listenToOnce(this.location, 'change', this.load);
        },

        load: function () {
            return this.fetch({ reset: true });
        },

        url: function () {
            return 'https://api.forecast.io/forecast' + '/' + config.API_KEY + '/' + this.location.get('latitude') + ',' + this.location.get('longitude') + '?callback=?';
        },

        parse: function (response) {
            return response.hourly.data;
        },

        compare: function (method, attribute) {
            var m = this[method](function (model) {
                return model.get(attribute);
            });

            return m.get(attribute);
        },

        high: function () {
            return this.compare('max', 'temperature');
        },

        low: function () {
            return this.compare('min', 'temperature');
        },

        precip: function () {
            return this.compare('max', 'precipProbability');
        }
    });

    return ForecastCollection;
});
