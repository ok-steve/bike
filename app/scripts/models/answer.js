/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var AnswerModel = Backbone.Model.extend({
    url: '',

    initialize: function() {
    },

    defaults: {
      high: 90,
      low: 50,
      precip: 10,
      offset: 10,
      limit: 8
    },

    validate: function(attrs, options) {
    },

    parse: function(response, options)  {
      return response;
    },

    decide: function (data) {
      console.info('h: ' + data.high() + ', l: ' + data.low() + ', p: ' + data.precip());

      if (data.high() <= this.get('high') && data.low() >= this.get('low') && data.precip() <= this.get('precip')) {
        this.set({ answer: 'yes' });
      } else if (data.high() <= this.get('high') + this.get('offset') && data.low() >= this.get('low') - this.get('offset') && data.precip() <= this.get('precip') + this.get('offset')) {
        this.set({ answer: 'maybe' });
      } else {
        this.set({ answer: 'no' });
      }
    }
  });

  return AnswerModel;
});
