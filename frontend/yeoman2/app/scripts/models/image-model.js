/*global define*/

define([
    'underscore',
    'backbone',
], function (_, Backbone) {
    'use strict';

    var ImageModel = Backbone.Model.extend({
        defaults:{
        }
    });

    return ImageModel;
});