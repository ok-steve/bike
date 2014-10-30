define([
  'underscore',
  'backbone'
],

function (_, Backbone) {
  // Create Utils object
  var Utils = {};

  // Extend the App object
  Utils.vent = _.extend({}, Backbone.Events);

  Utils.showView = function (view) {
    if (this.currentView) {
      this.currentView.close();
    }

    this.currentView = view;
    this.currentView.render();

    return this.currentView;
  };

  // Extend Backbone
  Backbone.View.prototype.close = function () {
    this.remove();
    this.unbind();

    if (this.onClose) {
      this.onClose();
    }
  };

  return Utils;
});
