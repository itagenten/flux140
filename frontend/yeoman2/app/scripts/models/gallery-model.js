/*global define,log*/

define([
    'underscore',
    'backbone',
    'collections/imageStacks-collection',
    'collections/images-collection'
], function (_, Backbone, ImageStacksCollection, ImagesCollection) {
    'use strict';

    var GalleryModel = Backbone.Model.extend({
        defaults: {
            browser: 'FF',
            imageStacks: new ImageStacksCollection([
                {images: new ImagesCollection([
                    {src:'0.jpg'},
                    {src:'1.jpg'},
                    {src:'2.jpg'},
                ])}
            ])
        }
    });

    log('Load: gallery-model.');

    return GalleryModel;
});

