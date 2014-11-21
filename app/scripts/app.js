define([
  'jquery',
  'backbone',
  'utils',
  'routes/app',
  'models/answer',
  'collections/forecast',
  'models/location',
  'views/navbar',
  'views/answer/show',
  'views/answer/edit',
  'views/loading'
],

function ($, Backbone, Utils, AppRouter, AnswerModel, ForecastCollection, LocationModel, NavbarView, AnswerShowView, AnswerEditView, LoadingView) {
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

    var navbar = new NavbarView(),
      loading = new LoadingView();

    $(App.regions.header).html(navbar.render().el);
    $(App.regions.main).html(loading.render().el);

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

    var filteredCollection = App.forecast.limit(App.answer.get('limit'));

    App.answer.decide(filteredCollection);

    var answerShowView = new AnswerShowView({ model: App.answer });
    $(App.regions.main).html(Utils.showView(answerShowView).el);
  });

  Utils.vent.on('answer:edit', function () {
    var answerEditView = new AnswerEditView({ model: App.answer });
    $(App.regions.main).html(Utils.showView(answerEditView).el);
  });

  return App;
});
