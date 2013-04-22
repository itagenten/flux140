/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
], function ($, _, Backbone, JST) {
    'use strict';

    var ImageStackView = Backbone.View.extend({
        template: JST['app/scripts/templates/imageStack.ejs']
    });

    return ImageStackView;
});
