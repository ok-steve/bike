/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'utils'
], function ($, _, Backbone, JST, Utils) {
    'use strict';

    var AnswerEditView = Backbone.View.extend({
        template: JST['app/scripts/templates/answer/edit.hbs'],

        tagName: 'form',

        id: '',

        className: '',

        events: {
            'click .js-submit': 'submitForm'
        },

        initialize: function () {
            //this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        submitForm: function (e) {
            e.preventDefault();

            var prefs = {};

            prefs.high = $('#high').val();
            prefs.low = $('#low').val();
            prefs.precip = $('#precip').val();
            prefs.offset = $('#offset').val();
            prefs.future = $('#future').val();

            this.model.set(prefs);

            Utils.vent.trigger('answer:show');
        }
    });

    return AnswerEditView;
});
