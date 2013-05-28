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
        model: window.App.Models.Gallery || (window.App.Models.Gallery = new GalleryModel()),
        imageStackViews: [],
        _gotoPit: function () {
            var pit = window.App.Models.App.get('pit');
            this.imageStackViews.map(function(imageStackView) {
                setTimeout(function () {
                    imageStackView._updateDom(pit);
                }, 0);
            });
        },
        initialize: function (options) {
            log('Init: gallery-view.');

            var that = this;
            var createSubviews = function () {
                // TODO: Adding the views unconditionally leads to having
                // more and more SubViews. This has a 'class variable'
                // feeling to it instead of an instace variable. Why?
                // TODO: Find out! ~ FS 2013-05-28
                if (that.imageStackViews.length === 0) {
                    that.model.get('imageStacks').each(function(element) {
                        that.imageStackViews.push(
                            new ImageStackGalleryView({model: element})
                        );
                    });
                } else {
                    that.imageStackViews.forEach(function(element) {
                        element.delegateEvents();
                    });
                }
                that.render();
            };
            this.model.once('ready', createSubviews);
            if (this.model.get('ready') === true) {
                createSubviews();
            }

            window.App.Models.App.on('change:pit', this._gotoPit, this);
        },
        render: function () {
            log('Render: gallery-view.');
            this.$el.html('<div class="view" />');
            this.setElement(this.$('.view'));
            this.$el.html(this.template());

            // Subviews.
            var that = this;
            // this.$('.thumbnails').empty();
            this.imageStackViews.forEach(function(imageStackView) {
                imageStackView.render();
                that.$('.thumbnails').append(imageStackView.el);
            });

            return this;
        }
    });

    log('Load: gallery-view.');

    return GalleryView;
});

