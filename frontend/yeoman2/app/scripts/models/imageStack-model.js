/*global define,log*/

define([
    'underscore',
    'backbone',
    'collections/images-collection',
], function (_, Backbone, ImagesCollection) {
    'use strict';

    var ImageStackModel = Backbone.Model.extend({
        defaults: {
            images: new ImagesCollection()
        }
    });

    log('Load: imageStack-model.');

    return ImageStackModel;
});
