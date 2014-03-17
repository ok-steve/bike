/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var PreferenceModel = Backbone.Model.extend({
        defaults: {
            high: 90,
            low: 50,
            precip: 10,
            offset: 10
        }
    });

    return PreferenceModel;
});
