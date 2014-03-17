/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var ForecastModel = Backbone.Model.extend({
        defaults: {
        }
    });

    return ForecastModel;
});
