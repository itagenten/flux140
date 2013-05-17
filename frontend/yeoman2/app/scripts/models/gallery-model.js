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
        initialize: function(options) {
            log('Init: gallery-model.');
            // TODO: Set the URL?
            this.fetch();
        },
        parse: function(response, options) {
            log('Parse: gallery-model.');

            var imageStacks = new ImageStacksCollection();

            _.forEach(response[0].contents, function(element) {
                if (element.type !== 'directory') {
                    return;
                }
                imageStacks.add({
                    title: element.name,
                    images: new ImagesCollection(
                        _.map(element.contents, function(image) {
                            return {
                                pit: parseInt(image.name, 10),
                                src: 'content/' + element.name + '/' + image.name,
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
        },
    });

    return GalleryModel;
});

