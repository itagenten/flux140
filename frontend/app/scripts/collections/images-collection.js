/*global define,log*/

define([
    'underscore',
    'backbone',
    'models/image-model'
], function (_, Backbone, ImageModel) {
    'use strict';

    log('Load: images-collection.');

    var ImagesCollection = Backbone.Collection.extend({
        model: ImageModel
    });

    return ImagesCollection;
});

