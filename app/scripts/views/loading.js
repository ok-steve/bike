/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var LoadingView = Backbone.View.extend({
    template: JST['app/scripts/templates/loading.hbs'],

    tagName: 'div',

    id: '',

    className: 'loading',

    events: {},

    initialize: function () {
      //this.listenTo(this.model, 'change', this.render);
    },

    render: function () {
      //this.$el.html(this.template(this.model.toJSON()));
      this.$el.html(this.template());

      return this;
    }
  });

  return LoadingView;
});
