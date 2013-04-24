/*global define,log*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'models/gallery-model',
], function ($, _, Backbone, JST, GalleryModel) {
    'use strict';

    var GalleryView = Backbone.View.extend({
        el: $('div.main'),
        template: JST['app/scripts/templates/gallery.ejs'],
        model: window.App.Models.Gallery || (window.App.Models.Gallery = new GalleryModel()),
        initialize: function () {
            log('Init: gallery-view.');
        },
        render: function () {
            this.$el.html(this.template(this.model.attributes));
            log('Render: gallery-view.');
            return this;
        }
    });

    log('Load: gallery-view.');

    return GalleryView;
});

