/*global define*/

define([
    'jquery',
    'backbone',
    'views/app',
    'collections/forecast',
    'models/preference'
], function ($, Backbone, AppView, ForecastCollection, PreferenceModel) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
        },

        initialize: function () {
            var forecast = new ForecastCollection(),
                preference = new PreferenceModel();

            forecast.fetch({ success: function () {
                var app = new AppView({ collection: forecast, model: preference });
            }});
        }
    });

    return AppRouter;
});
