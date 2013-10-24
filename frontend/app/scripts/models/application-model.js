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
            gallery: '',
            galleries: null,
            pit: 0  // Point In Time.
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

            // If no browser is given, choose the first one in the list.
            if (!this.get('ready')) {
                if (window.App.Models.App.get('gallery') === '') {
                    // This will trigger _parseBrowserToImageStacksCollection()
                    // window.App.Models.App.set('gallery', galleries[0]);
                    console.log('blurt!');
                } else {
                    this._parseBrowserToImageStacksCollection();
                }
            }
        },
    });

    return ApplicationModel;
});

