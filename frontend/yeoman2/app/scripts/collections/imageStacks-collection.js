/*global define*/

define([
    'underscore',
    'backbone',
    'models/imageStacks-model'
], function (_, Backbone, ImageStacksModel) {
    'use strict';

    var ImageStacksCollection = Backbone.Collection.extend({
        model: ImageStacksModel
    });

    return ImageStacksCollection;
});