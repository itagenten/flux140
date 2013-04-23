/*global define*/

define([
    'jquery',
    'backbone',
], function ($, Backbone) {
    'use strict';

    var ApplicationRouter = Backbone.Router.extend({

        routes: {
            '': 'home',
            'gallery/:build/:browser': 'gallery'
        },

        home: function () {
            window.App.Views.App.render();
        },
        gallery: function (build, browser) {
            window.App.Views.Gallery.render();
        },
    });

    return ApplicationRouter;
});
