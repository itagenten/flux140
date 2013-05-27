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
            if (window.App.Views.Gallery) {
                window.App.Views.Gallery.$el.empty();
                window.App.Views.Gallery.undelegateEvents();
            }
            window.App.Views.Gallery = new GalleryView({
                'build': build,
                'browser': browser
                });
            // window.App.Views.Gallery.render();
        },
        detail: function (title, build, browser) {
            if (window.App.Views.Detail) {
                window.App.Views.Detail.$el.empty();
                window.App.Views.Detail.undelegateEvents();
            }
            window.App.Views.Detail = new DetailView({
                'title': title,
                'build': build,
                'browser': browser
                });
            // window.App.Views.Detail.render();
        }
    });

    return ApplicationRouter;
});
