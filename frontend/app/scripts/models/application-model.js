/*global define,log*/

define([
    'underscore',
    'backbone',
    'collections/galleries-collection',
], function (_, Backbone, GalleriesCollection) {
    'use strict';

    log('Load: application-model.');

    var ApplicationModel = Backbone.Model.extend({
        url: 'content/tree.json',
        response: null, // Container for JSON response
        defaults: {
            gallery: '',        // The name (String) of the currently displayed gallery.
            galleries: null,    // Collection of all available galleries.
            pit: 0              // Point In Time.
        },
        initialize: function(options) {
            log('Init: application-model.');
            this.fetch();
        },
        parse: function(response, options) {
            log('Parse: application-model.');
            this.response = response;

            // What galleries do we have?
            var galleries = _.pluck(
                _.where(response[0].contents, {'type': 'directory'}),
                'name');
            this.set('galleries', new GalleriesCollection(
                _.map(galleries,
                      function(gallery) {return {'gallery': gallery};})
                )
            );

            // Trigger ready event after JSON has been parsed.
            var that = this;
            window.setTimeout(function () {
                that.trigger('ready');
                that.set('ready', true);
            }, 0);
        },
    });

    return ApplicationModel;
});

