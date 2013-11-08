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
        defaults: {
            name: '', // Our gallery name/identifier
            minPit: 0,   // Oldest and...
            maxPit: 10,  // newest screenshot set.
            imageStacks: new ImageStacksCollection()
        },
        _setReady: function() {
            log('Ready: gallery-model: ' + this.get('name') +
                ', PITs ' + this.get('minPit') + '..' +
                this.get('maxPit') + '.');
            this.trigger('ready');
        },
        initialize: function(options) {
            log('Init: gallery-model: ' + options.name + '.');
            // TODO: do this lazy on first read instead. FS ~ 2013-10-24
            this._parseTreeToImageStacksCollection();
        },
        _parseTreeToImageStacksCollection: function() {
            // TODO: Check if the requested gallery exists.
            var gallery = this.get('name');

            var imageStacks = new ImageStacksCollection();
            _.forEach(_.findWhere(window.App.Models.App.response[0].contents,
                                    {'name': gallery}).contents, function(element) {
                if (element.type !== 'directory') {
                    return;
                }
                imageStacks.add({
                    title: element.name,
                    images: new ImagesCollection(
                        _.map(element.contents, function(image) {
                            return {
                                pit: parseInt(image.name, 10),
                                src: 'content/' + gallery + '/' + element.name + '/' + image.name,
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

