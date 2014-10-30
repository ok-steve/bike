/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var NavbarView = Backbone.View.extend({
    template: JST['app/scripts/templates/navbar.hbs'],

    tagName: 'header',

    id: '',

    className: '',

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

  return NavbarView;
});
