/*global define,log*/

define([
    'underscore',
    'backbone',
    'collections/galleries-collection',
], function (_, Backbone, GalleriesCollection) {
    'use strict';

    log('Load: application-model.');

    var ApplicationModel = Backbone.Model.extend({
        defaults: {
            gallery: '',
            galleries: new GalleriesCollection(),
            pit: 0  // Point In Time.
        }
    });

    return ApplicationModel;
});

