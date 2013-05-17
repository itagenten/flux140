/*global define*/

define([
    'jquery',
    'backbone',
    'views/gallery-view',
    'views/detail-view',
], function ($, Backbone, GalleryView, DetailView) {
    'use strict';

    var ApplicationRouter = Backbone.Router.extend({

        routes: {
            '': 'home',
            'gallery/:build/:browser': 'gallery',
            'detail/:title/:build/:browser': 'detail'
        },

        home: function () {
        },
        gallery: function (build, browser) {
            if (!window.App.Views.Gallery) {
                window.App.Views.Gallery = new GalleryView({
                    'build': build,
                    'browser': browser
                });
            }
            window.App.Views.Gallery.render();
        },
        detail: function (title, build, browser) {
            if (!window.App.Views.Detail) {
                window.App.Views.Detail = new DetailView({
                    'title': title,
                    'build': build,
                    'browser': browser
                });
            }
        }
    });

    return ApplicationRouter;
});
