/*global define*/

define([
    'underscore',
    'backbone',
], function (_, Backbone) {
    'use strict';

    var GalleryModel = Backbone.Model.extend({
        defaults:{
        }
    });

    return GalleryModel;
});