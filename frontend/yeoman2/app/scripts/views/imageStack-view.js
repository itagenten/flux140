/*global define*/

/* ImageStackView is an abstract base class for
 * ImageStackDetailView (the large one) and
 * ImageStackGalleryView (for thumbnails).
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var ImageStackView = Backbone.View.extend({
        model: null,
        initialize: function (options) {
            this.listenTo(this.model, 'change', this.render);
        },
        render: function () {
            this.$el.html(
                this.template({
                    'src': this._calcSrc(window.App.Models.App.get('pit')),
                    'title': this.model.get('title')
                })
            );
            return this;
        },
        _calcSrc: function (pit) {
            var ret;
            var img = this.model.get('images').findWhere({'pit': pit});
            if (img) {
                ret = img.get('src');
            } else {
                ret = 'images/void.gif';
            }
            return ret;
        },
        _updateDom: function (pit) {
            this.$('img')[0].src = this._calcSrc(pit);
        }
    });

    return ImageStackView;
});

