/*global define*/

define([
  'jquery',
  'backbone',
  'utils'
], function ($, Backbone, Utils) {
  'use strict';

  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'showAnswer',
      'edit': 'editAnswer'
    },

    showAnswer: function () {
      Utils.vent.trigger('answer:show');
    },

    editAnswer: function () {
      Utils.vent.trigger('answer:edit');
    }
  });

  return AppRouter;
});
