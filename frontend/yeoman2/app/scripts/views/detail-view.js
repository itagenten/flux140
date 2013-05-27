/*global define,log*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'models/gallery-model',
    'views/imageStack-view',
], function ($, _, Backbone, JST, GalleryModel, ImageStackView) {
    'use strict';

    var DetailView = Backbone.View.extend({
        el: $('div.main'),
        template: JST['app/scripts/templates/detail.ejs'],
        model: window.App.Models.Gallery || (window.App.Models.Gallery = new GalleryModel()),
        imageStackView: null,
        _gotoPit: function () {
            var pit = window.App.Models.App.get('pit');
            var that = this;
            setTimeout(function () {
                that.imageStackView.updateSrc(pit);
            }, 0);
        },
        initialize: function (options) {
            log('Init: detail-view.');
            console.log(options);

            var that = this;
            var createSubviews = function () {
                var stackModel = that.model.get('imageStacks')
                                           .findWhere({'title': options.title});
                that.imageStackView = new ImageStackView({
                    model: stackModel,
                    tagName: 'div',
                    className: '',
                    template: JST['app/scripts/templates/imageStack-detail.ejs'],
                });
                that.render();
            };
            this.model.once('ready', createSubviews);
            if (this.model.get('ready') === true) {
                createSubviews();
            }

            window.App.Models.App.on('change:pit', this._gotoPit, this);
        },
        render: function () {
            log('Render: detail-view.');
            this.$el.html(this.template());

            this.imageStackView.render();
            this.$('.detail').append(this.imageStackView.el);

            return this;
        }
    });

    log('Load: detail-view.');

    return DetailView;
});


