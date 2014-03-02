/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var AppView = Backbone.View.extend({
        el: '#app',

        template: JST['app/scripts/templates/app.hbs'],

        initialize: function () {
            this.render();
        },

        render: function () {
            $(this.el).html(this.template());

            return this;
        }
    });

    return AppView;
});
