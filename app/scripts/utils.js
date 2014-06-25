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

    // Enable pushState
    $(document).on('click', 'a[href^="/"]', function (e) {
        e.preventDefault();
        var target = $(e.currentTarget).attr('href');
        Backbone.history.navigate(target, { trigger: true });
        return false;
    });

    return Utils;
});
