/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'collections/forecast',
    'models/preference',
    'bootstrap'
], function ($, _, Backbone, JST, ForecastCollection, PreferenceModel) {
    'use strict';

    var AppView = Backbone.View.extend({
        el: '#app',

        template: JST['app/scripts/templates/app.hbs'],

        events: {
            'click #submit': 'submit'
        },

        initialize: function () {
            this.collection = new ForecastCollection();
            this.model = new PreferenceModel();

            this.listenTo(this.model, 'change', this.reRender);
        },

        render: function () {
            var self = this;

            this.collection.fetch({
                success: function () {
                    self.reRender();
                }
            });

            return this;
        },

        reRender: function () {
            var ans = this.answer();

            this.model.set({ 'answer': ans });

            $('body').removeClass('yes no maybe').addClass(ans);

            $(this.el).html(this.template(this.model.toJSON()));
        },

        submit: function (e) {
            e.preventDefault();

            var prefs = {};

            prefs.high = $('#high').val();
            prefs.low = $('#low').val();
            prefs.precip = $('#precip').val();

            this.model.set(prefs);

            return false;
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
