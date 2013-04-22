/*global define*/

define([
    'underscore',
    'backbone',
    'models/images-model'
], function (_, Backbone, ImagesModel) {
    'use strict';

    var ImagesCollection = Backbone.Collection.extend({
        model: ImagesModel
    });

    return ImagesCollection;
});