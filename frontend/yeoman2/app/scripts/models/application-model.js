/*global define*/

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

    return ApplicationModel;
});
