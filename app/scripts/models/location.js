/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var LocationModel = Backbone.Model.extend({
        defaults: {
            latitude: '39',
            longitude: '-77'
        }
    });

    return LocationModel;
});
