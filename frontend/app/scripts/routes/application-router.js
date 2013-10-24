/*global define,log*/

define([
    'jquery',
    'backbone',
    'views/gallery-view',
    'views/detail-view',
], function ($, Backbone, GalleryView, DetailView) {
    'use strict';

    var ApplicationRouter = Backbone.Router.extend({

        navigate: function () {
            log('Navigate: ' + arguments[0]);
            // Dispose of old view, if any:
            if (window.App.Views.current) {
                if (window.App.Views.current.destroy) {
                    window.App.Views.current.destroy();
                }
                window.App.Views.current.stopListening();
                window.App.Views.current.undelegateEvents(); // TODO: Not sure if this is needed.
                window.App.Views.current.remove();
            }
            // Call original navigate() function:
            Backbone.history.navigate.apply(Backbone.history, arguments);
        },

        routes: {
            '': 'home',
            'gallery/:pit/:browser': 'gallery',
            'detail/:title/:pit/:browser': 'detail'
        },

        home: function () {
            // Open latest gallery page when ready (~= JSON has been parsed).
            var that = this;
            this.listenToOnce(window.App.Models.App, 'ready',
                function () {
                    setTimeout(function () {
                        that.navigate('gallery/' +
                            window.App.Models.Gallery.get('maxPit') +
                            '/default', {trigger: true});
                    }, 0);
                }
            );
        },
        gallery: function (pit, browser) {
            window.App.Views.current = new GalleryView();
            window.App.Models.App.set('pit', parseInt(pit, 10));
            if (browser !== 'default') {
                window.App.Models.App.set('browser', browser);
            }
        },
        detail: function (title, pit, browser) {
            window.App.Views.current = new DetailView({
                'title': title,
            });
            window.App.Models.App.set('pit', parseInt(pit, 10));
            if (browser !== 'default') {
                window.App.Models.App.set('browser', browser);
            }
        }
    });

    return ApplicationRouter;
});

