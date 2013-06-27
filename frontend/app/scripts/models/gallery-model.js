/*global define,log*/

define([
    'underscore',
    'backbone',
    'collections/imageStacks-collection',
    'collections/images-collection'
], function (_, Backbone, ImageStacksCollection, ImagesCollection) {
    'use strict';

    log('Load: gallery-model.');

    var GalleryModel = Backbone.Model.extend({
        url: 'content/tree.json',
        response: null, // Container for JSON response
        defaults: {
            browser: '',
            minPit: 0,   // Oldest and...
            maxPit: 10,  // newest screenshot set.
            imageStacks: new ImageStacksCollection()
        },
        _setReady: function() {
            // Fire event & set property after having loaded all content.
            log('Ready: gallery-model.');
            this.trigger('ready');
            this.set('ready', true);
        },
        initialize: function(options) {
            log('Init: gallery-model.');
            // TODO: Set the URL?

            this.listenTo(window.App.Models.App,
                'change:browser', this._parseBrowserToImageStacksCollection);

            this.fetch();
        },
        parse: function(response, options) {
            log('Parse: gallery-model.');
            this.response = response;

            // What browsers do we have?
            var browsers = _.pluck(
                _.where(response[0].contents, {'type': 'directory'}),
                'name');
            window.App.Models.App.set('browsers', browsers);

            // If we haven't parsed any collection so far: Do it now
            if (!this.get('ready')) {
                if (window.App.Models.App.get('browser') === '') {
                    // If no browser is given, choose the first one in the list.
                    // This will trigger _parseBrowserToImageStacksCollection()
                    window.App.Models.App.set('browser', browsers[0]);
                } else {
                    this._parseBrowserToImageStacksCollection();
                }
            }
        },
        _parseBrowserToImageStacksCollection: function() {
            if (!this.response) {
                // If the router calls us before loading is finished, abort.
                // The code at the end of this.parse() will call us when
                // loading is done.
                return;
            }
            // TODO: Check if the requested browser exists.
            var browser = window.App.Models.App.get('browser');
            this.set('browser', browser);
            log('_parseBrowserToImageStacksCollection: ' + browser + '.');
            var imageStacks = new ImageStacksCollection();
            _.forEach(_.findWhere(this.response[0].contents, {'name': browser}).contents, function(element) {
                if (element.type !== 'directory') {
                    return;
                }
                imageStacks.add({
                    title: element.name,
                    images: new ImagesCollection(
                        _.map(element.contents, function(image) {
                            return {
                                pit: parseInt(image.name, 10),
                                src: 'content/' + browser + '/' + element.name + '/' + image.name,
                            };
                        }))
                });
            });

            this.set('minPit',
                _.min(
                    imageStacks.map(function(imageStack) {
                        if (imageStack.get('images').length > 0) {
                            return imageStack.get('images').at(0).get('pit');
                        }
                    })
                )
            );

            this.set('maxPit',
                _.max(
                    imageStacks.map(function(imageStack) {
                        if (imageStack.get('images').length > 0) {
                            return imageStack.get('images')
                                    .at(imageStack.get('images').length - 1)
                                        .get('pit');
                        }
                    })
                )
            );

            this.set('imageStacks', imageStacks);

            this._setReady();
        },
    });

    return GalleryModel;
});

