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
            $('body').removeClass('yes no maybe').addClass(this.answer());

            this.$el.html(this.template({ answer: this.answer() }));

            return this;
        },

        answer: function () {
            if (this.collection.high() <= 90 && this.collection.low() >= 50 && this.collection.precip() <= 10) {
                return 'yes';
            } else if (this.collection.high() <= 90 + 10 && this.collection.low() >= 50 - 10 && this.collection.precip() <= 10 + 10) {
                return 'maybe';
            } else {
                return 'no';
            }
        }
    });

    return AppView;
});
