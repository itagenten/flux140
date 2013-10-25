/*global define,log*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'models/gallery-model',
    'views/imageStack-gallery-view'
], function ($, _, Backbone, JST, GalleryModel, ImageStackGalleryView) {
    'use strict';

    var GalleryView = Backbone.View.extend({
        el: $('div.main'),
        template: JST['app/scripts/templates/gallery.ejs'],
        model: null,
        imageStackViews: [],
        _gotoPit: function () {
            var pit = window.App.Models.App.get('pit');
            this.imageStackViews.map(function(imageStackView) {
                setTimeout(function () {
                    imageStackView._updateDom(pit);
                }, 0);
            });
        },
        _createSubviews: function () {
            this.imageStackViews = [];
            var that = this;
            window.App.Models.Gallery.get('imageStacks').each(function(element) {
                that.imageStackViews.push(
                    new ImageStackGalleryView({model: element})
                );
            });
        },
        initialize: function (options) {
            log('Init: gallery-view.');

            this._createSubviews();

            this.listenTo(window.App.Models.App, 'change:pit', this._gotoPit);
        },
        render: function () {
            log('Render: gallery-view.');
            this.$el.html('<div class="view" />');
            this.setElement(this.$('.view'));
            this.$el.html(this.template());

            // Subviews.
            this.$('.thumbnails').empty();
            var that = this;
            this.imageStackViews.forEach(function(imageStackView) {
                imageStackView.render();
                that.$('.thumbnails').append(imageStackView.el);
            });

            return this;
        },
        destroy: function () {
            log('Destroy: gallery-view.');
            _.each(this.imageStackViews, function(iSV) {
                iSV.remove();
            });
        },
        calcUrl: function () {
            return 'gallery/' +
                    window.App.Models.App.get('pit') + '/' +
                    window.App.Models.App.get('gallery');
        }
    });

    log('Load: gallery-view.');

    return GalleryView;
});

