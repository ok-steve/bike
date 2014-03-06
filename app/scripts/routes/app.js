/*global define*/

define([
    'jquery',
    'backbone',
    'views/app',
    'collections/forecast',
    'models/preference'
], function ($, Backbone, AppView) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'home'
        },

        home: function () {
            var app = new AppView();

            app.render();
        }
    });

    return AppRouter;
});
