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
            imageStacks: new ImageStacksCollection()
        },
        initialize: function(options) {
            log('Init: gallery-model.');
            // TODO: Set the URL?
            this.fetch();
        },
        parse: function(response, options) {
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
            var that=this;
            setTimeout(function(){that.set('imageStacks', imageStacks);}, 1000);
        },
    });

    return GalleryModel;
});

