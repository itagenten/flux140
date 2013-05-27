/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var ImageStackView = Backbone.View.extend({
        template: JST['app/scripts/templates/imageStack-gallery.ejs'],
        tagName: 'li',
        className: 'span3',
        model: null,
        events: {
            'click': function () {
                log('click view');
                window.App.Router.navigate(
                    'detail/' + this.model.get('title') + '/' +
                    window.App.Models.App.get('pit') + '/' +
                    window.App.Models.App.get('browser'),
                    {trigger: true});
            }
        },
        initialize: function (options) {
            this.listenTo(this.model, 'change', this.render);
            if (options.template) {
                this.template = options.template;
            }
        },
        render: function () {
            // Getting 'ere.
            this.$el.html(
                this.template({
                    'src': this.model.get('images').at(
                        window.App.Models.App.get('pit')
                            ).get('src'),
                    'title': this.model.get('title')
                })
            );
            return this;
        },
        updateSrc: function (pit) {
            var img = this.model.get('images').findWhere({'pit': pit});
            if (img) {
                this.$('img')[0].src = img.get('src');
            } else {
                this.$('img')[0].src = 'images/void.gif';
            }
        }
    });

    return ImageStackView;
});
