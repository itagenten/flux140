/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
], function ($, _, Backbone, JST) {
    'use strict';

    var GalleryView = Backbone.View.extend({
        template: JST['app/scripts/templates/gallery.ejs']
    });

    return GalleryView;
});

