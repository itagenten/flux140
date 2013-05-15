/*global define*/

define([
    'underscore',
    'backbone',
    'models/imageStack-model'
], function (_, Backbone, ImageStackModel) {
    'use strict';

    var ImageStacksCollection = Backbone.Collection.extend({
        model: ImageStackModel
    });

    return ImageStacksCollection;
});

