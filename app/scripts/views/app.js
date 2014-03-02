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
            if (this.collection.high() <= this.model.get('high') && this.collection.low() >= this.model.get('low') && this.collection.precip() <= this.model.get('precip')) {
                return 'yes';
            } else if (this.collection.high() <= this.model.get('high') + this.model.get('offset') && this.collection.low() >= this.model.get('low') - this.model.get('offset') && this.collection.precip() <= this.model.get('precip') + this.model.get('offset')) {
                return 'maybe';
            } else {
                return 'no';
            }
        }
    });

    return AppView;
});
