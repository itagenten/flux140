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
            'gallery/:build/:browser': 'gallery',
            'detail/:title/:build/:browser': 'detail'
        },

        home: function () {
        },
        gallery: function (build, browser) {
            window.App.Views.current = new GalleryView({
                'build': build,
                'browser': browser
                });
        },
        detail: function (title, build, browser) {
            window.App.Views.current = new DetailView({
                'title': title,
                'build': build,
                'browser': browser
                });
        }
    });

    return ApplicationRouter;
});

