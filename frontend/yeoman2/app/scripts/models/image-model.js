/*global define,log*/

define([
    'underscore',
    'backbone',
], function (_, Backbone) {
    'use strict';

    var ImageModel = Backbone.Model.extend({
        defaults: {
            src: 'images/87.png'
        }
    });

    log('Load: image-model.');

    return ImageModel;
});

