/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var AnswerShowView = Backbone.View.extend({
    template: JST['app/scripts/templates/answer/show.hbs'],

    tagName: 'div',

    id: '',

    className: 'jumbotron',

    events: {},

    initialize: function () {
      //this.listenTo(this.model, 'change', this.render);
    },

    render: function () {
      $('body').removeClass('yes no maybe').addClass(this.model.get('answer'));

      this.$el.html(this.template(this.model.toJSON()));

      return this;
    }
  });

  return AnswerShowView;
});
