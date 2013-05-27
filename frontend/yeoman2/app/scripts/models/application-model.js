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
        },
        initialize: function () {
            // this.on('change:pit', function () {
            //     alert(this.get('pit'));}, this);
        }
    });

    return ApplicationModel;
});
