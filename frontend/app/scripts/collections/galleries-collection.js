/*global define,log*/

define([
    'underscore',
    'backbone',
    'models/gallery-model'
], function (_, Backbone, GalleryModel) {
    'use strict';

    log('Load: galleries-collection.');

    var GalleriesCollection = Backbone.Collection.extend({
        model: GalleryModel
    });

    return GalleriesCollection;
});

