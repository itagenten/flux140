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
            'gallery/:pit/:gallery': 'gallery',
            'detail/:title/:pit/:gallery': 'detail'
        },

        home: function () {
            window.App.Models.Gallery = window.App.Models.App.get('galleries').at(0);
            this.navigate('gallery/' +
                window.App.Models.Gallery.get('maxPit') +
                '/' + window.App.Models.Gallery.get('gallery'),
                {trigger: true});
        },
        gallery: function (pit, gallery) {
            window.App.Models.App.set('pit', parseInt(pit, 10));
            window.App.Models.App.set('gallery', gallery);
            window.App.Views.current = new GalleryView();
            window.App.Views.current.render();
        },
        detail: function (title, pit, gallery) {
            window.App.Models.App.set('pit', parseInt(pit, 10));
            window.App.Models.App.set('gallery', gallery);
            window.App.Views.current = new DetailView({
                'title': title,
            });
            window.App.Views.current.render();
        }
    });

    return ApplicationRouter;
});

