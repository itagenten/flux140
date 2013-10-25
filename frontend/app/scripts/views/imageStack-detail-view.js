/*global define,log*/

define([
    'views/imageStack-view',
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function (ImageStackView, $, _, Backbone, JST) {
    'use strict';

    var ImageStackDetailView = ImageStackView.extend({
        template: JST['app/scripts/templates/imageStack-detail.ejs'],
        tagName: 'div',
        className: 'detail',
        events: {
            'click': function () {
                // Navigate to gallery view.
                // TODO: Route calculation code is duplicated in gallery-view.js:calcUrl
                window.App.Router.navigate(
                    'gallery/' +
                    window.App.Models.App.get('pit') + '/' +
                    window.App.Models.App.get('gallery'),
                    {trigger: true});
            }
        },
    });

    return ImageStackDetailView;
});

