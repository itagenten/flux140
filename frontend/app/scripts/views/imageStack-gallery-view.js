/*global define,log*/

define([
    'views/imageStack-view',
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function (ImageStackView, $, _, Backbone, JST) {
    'use strict';

    var ImageStackGalleryView = ImageStackView.extend({
        template: JST['app/scripts/templates/imageStack-gallery.ejs'],
        tagName: 'li',
        className: 'span3',
        events: {
            'click': function () {
                // Navigate to detail view.
                // TODO: Route calculation code is duplicated in detail-view.js:calcUrl
                window.App.Router.navigate(
                    'detail/' + this.model.get('title') + '/' +
                    window.App.Models.App.get('pit') + '/' +
                    window.App.Models.App.get('gallery'),
                    {trigger: true});
            }
        },
    });

    return ImageStackGalleryView;
});

