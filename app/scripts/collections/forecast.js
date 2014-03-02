/*global define*/

define([
    'underscore',
    'backbone',
    'models/forecast'
], function (_, Backbone, ForecastModel) {
    'use strict';

    var ForecastCollection = Backbone.Collection.extend({
        model: ForecastModel,

        url: 'api/forecast.json',

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
