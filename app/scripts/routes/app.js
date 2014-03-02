/*global define*/

define([
    'jquery',
    'backbone',
    'views/app',
    'collections/forecast'
], function ($, Backbone, AppView, ForecastCollection) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
        },

        initialize: function () {
            var forecast = new ForecastCollection();

            forecast.fetch({ success: function () {
                var app = new AppView({ collection: forecast });
            }});
        }
    });

    return AppRouter;
});
