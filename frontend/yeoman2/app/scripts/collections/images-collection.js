/*global define*/

define([
    'underscore',
    'backbone',
    'models/image-model'
], function (_, Backbone, ImageModel) {
    'use strict';

    var ImagesCollection = Backbone.Collection.extend({
        model: ImageModel
    });

    return ImagesCollection;
});

