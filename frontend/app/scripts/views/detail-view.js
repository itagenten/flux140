/*global define,log*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'models/gallery-model',
    'views/imageStack-detail-view',
], function ($, _, Backbone, JST, GalleryModel, ImageStackDetailView) {
    'use strict';

    var DetailView = Backbone.View.extend({
        el: $('div.main'),
        // template: JST['app/scripts/templates/detail.ejs'],
        model: null,
        title: "", // Title of current imageStack
        imageStackView: null,
        _gotoPit: function () {
            var pit = window.App.Models.App.get('pit');
            var that = this;
            setTimeout(function () {
                that.imageStackView._updateDom(pit);
            }, 0);
        },
        initialize: function (options) {
            log('Init: detail-view.');

            // Used in calcUrl() below only so far.
            this.title = options.title;

            var stackModel = window.App.Models.Gallery.get('imageStacks')
                                       .findWhere({'title': options.title});
            this.imageStackView = new ImageStackDetailView({
                model: stackModel,
            });

            this.listenTo(window.App.Models.App, 'change:pit', this._gotoPit);
        },
        render: function () {
            log('Render: detail-view.');

            // Add own container that can later be remove()d with the view.
            this.$el.html('<div class="view" />');
            this.setElement(this.$('.view'));

            this.imageStackView.render();
            this.$el.html(this.imageStackView.el);

            return this;
        },
        destroy: function () {
            log('Destroy: detail-view.');
            this.imageStackView.remove();
        },
        calcUrl: function () {
            return 'detail/' + this.title + '/' +
                    window.App.Models.App.get('pit') + '/' +
                    window.App.Models.App.get('currentGallery');
        }
    });

    log('Load: detail-view.');

    return DetailView;
});

