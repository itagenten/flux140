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
        model: window.App.Models.Gallery || (window.App.Models.Gallery = new GalleryModel()),
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

            var that = this;
            var createSubviews = function () {
                var stackModel = that.model.get('imageStacks')
                                           .findWhere({'title': options.title});
                that.imageStackView = new ImageStackDetailView({
                    model: stackModel,
                });
                that.render();
            };
            this.listenToOnce(this.model, 'ready', createSubviews);
            if (this.model.get('ready') === true) {
                createSubviews();
            }

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
                    window.App.Models.App.get('browser');
        }
    });

    log('Load: detail-view.');

    return DetailView;
});
