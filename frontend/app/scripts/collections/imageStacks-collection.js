/*global define,log*/

define([
    'underscore',
    'backbone',
    'models/imageStack-model'
], function (_, Backbone, ImageStackModel) {
    'use strict';

    log('Load: imageStacks-collection.');

    var ImageStacksCollection = Backbone.Collection.extend({
        model: ImageStackModel
    });

    return ImageStacksCollection;
});

