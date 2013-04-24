/*global define,log*/

define([
    'underscore',
    'backbone',
    'models/gallery-model',
], function (_, Backbone, GalleryModel) {
    'use strict';

    var ApplicationModel = Backbone.Model.extend({
        defaults: {
            gallery: new GalleryModel()
        }
    });

    log('Load: application-model.');

    return ApplicationModel;
});
