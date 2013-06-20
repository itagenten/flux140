/*global define,log*/

define([
    'underscore',
    'backbone',
    'models/gallery-model',
], function (_, Backbone, GalleryModel) {
    'use strict';

    log('Load: application-model.');

    var ApplicationModel = Backbone.Model.extend({
        defaults: {
            browser: '',    // Set by the gallery model on load, smells
            browsers: [],   // like an abstraction violation ~ FS 2013-05-29
            pit: 0  // Point In Time.
        }
    });

    return ApplicationModel;
});

