/*global define*/

define([
    'jquery',
    'backbone',
    'views/app'
], function ($, Backbone, AppView) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
        },

        initialize: function () {
            var app = new AppView();
        }
    });

    return AppRouter;
});
