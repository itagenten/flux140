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
            browser: 'Firefox36',
            pit: 0  // Point In Time.
        }
    });

    return ApplicationModel;
});

