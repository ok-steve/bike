/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'collections/forecast',
    'models/preference'
], function ($, _, Backbone, JST, ForecastCollection, PreferenceModel) {
    'use strict';

    var AppView = Backbone.View.extend({
        el: '#app',

        template: JST['app/scripts/templates/app.hbs'],

        initialize: function () {
            this.collection = new ForecastCollection();
            this.model = new PreferenceModel();
        },

        render: function () {
            var self = this;

            this.collection.fetch({
                success: function () {
                    $('body').removeClass('yes no maybe').addClass(self.answer());

                    $(self.el).html(self.template({ answer: self.answer() }));
                }
            });

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
