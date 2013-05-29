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
        defaults: {
            browser: 'FF',
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
            this.fetch();
        },
        parse: function(response, options) {
            log('Parse: gallery-model.');
            options = options || {};

            // What browsers do we have?
            var browsers = _.pluck(
                _.where(response[0].contents, {'type': 'directory'}),
                'name');
            window.App.Models.App.set('browsers', browsers);

            // If no browser is given, choose the first one in the list.
            if (!options.browser) {
                options.browser = browsers[0];
                window.App.Models.App.set('browser', browsers[0]);
            }

            var imageStacks = new ImageStacksCollection();
            _.forEach(_.findWhere(response[0].contents, {'name': options.browser}).contents, function(element) {
                if (element.type !== 'directory') {
                    return;
                }
                imageStacks.add({
                    title: element.name,
                    images: new ImagesCollection(
                        _.map(element.contents, function(image) {
                            return {
                                pit: parseInt(image.name, 10),
                                src: 'content/Firefox/' + element.name + '/' + image.name,
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

