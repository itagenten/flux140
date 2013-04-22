/*global define*/

define([
    'underscore',
    'backbone',
], function (_, Backbone) {
    'use strict';

    var ImageStackModel = Backbone.Model.extend({
        defaults:{
        }
    });

    return ImageStackModel;
});