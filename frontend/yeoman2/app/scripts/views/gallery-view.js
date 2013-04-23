/*global define*/

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
        model: new GalleryModel(),
        initialize: function () {
        },
        render: function () {
            this.$el.html(this.template(this.model.attributes));
            console.log('TRAP!');
            return this;
        }
    });

    return GalleryView;
});

