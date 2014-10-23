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

      prefs.high = parseInt($('#high').val());
      prefs.low = parseInt($('#low').val());
      prefs.precip = parseInt($('#precip').val());
      prefs.offset = parseInt($('#offset').val());
      prefs.limit = parseInt($('#limit').val());

      this.model.set(prefs);

      Utils.vent.trigger('answer:show');
    }
  });

  return AnswerEditView;
});
