define([
    'jquery',
    'backbone',
    'utils',
    'routes/app',
    'models/answer',
    'collections/forecast',
    'models/location'
],

function ($, Backbone, Utils, AppRouter, AnswerModel, ForecastCollection, LocationModel) {
    var App = {
        start: function () {
            Utils.vent.trigger('app:initialize');
        },

        regions: {
            header: '#header-region',
            main: '#main-region'
        }
    };

    // App events
    Utils.vent.on('app:initialize', function () {
        App.router = new AppRouter();
        App.answer = new AnswerModel();
        App.location = new LocationModel();

        require(['views/navbar'], function (NavbarView) {
            var navbar = new NavbarView();

            $(App.regions.header).html(navbar.render().el);
        });

        App.location.load();
    });

    Utils.vent.on('location:loaded', function () {
        App.forecast = new ForecastCollection({ latitude: App.location.get('latitude'), longitude: App.location.get('longitude')});

        App.forecast.fetch({ success: function () {
            if (Backbone.history.fragment === '') {
                Utils.vent.trigger('answer:show');
            }
        }});
    });

    Utils.vent.on('answer:show', function () {
        Backbone.history.navigate('');

        App.answer.decide(App.forecast);

        require(['views/answer/show'], function (AnswerShowView) {
            var answerShowView = new AnswerShowView({ model: App.answer });

            $(App.regions.main).html(Utils.showView(answerShowView).el);
        });
    });

    Utils.vent.on('answer:edit', function () {
        require(['views/answer/edit'], function (AnswerEditView) {
            var answerEditView = new AnswerEditView({ model: App.answer });

            $(App.regions.main).html(Utils.showView(answerEditView).el);
        });
    });

    return App;
});
