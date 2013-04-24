/*global define*/

define([
    'jquery',
    'backbone',
    'views/application-view',
    'views/gallery-view',
], function ($, Backbone, AppView, GalleryView) {
    'use strict';

    var ApplicationRouter = Backbone.Router.extend({

        routes: {
            '': 'home',
            'gallery/:build/:browser': 'gallery'
        },

        home: function () {
            if (!window.App.Views.App) {
                window.App.Views.App = new AppView();
            }
            window.App.Views.App.render();
        },
        gallery: function (build, browser) {
            if (!window.App.Views.Gallery) {
                window.App.Views.Gallery = new GalleryView();
            }
            window.App.Views.Gallery.render(build, browser);
        },
    });

    return ApplicationRouter;
});
