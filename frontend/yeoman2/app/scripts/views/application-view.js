/*global define*/

define([
    'jquery-ui',
    'underscore',
    'backbone',
    'templates',
    'views/time-slider'
], function ($, _, Backbone, JST, TimeSlider) {
    'use strict';

    var ApplicationView = Backbone.View.extend({
        template: JST['app/scripts/templates/application.ejs']
    });

    var timeSlider = new TimeSlider();

    return ApplicationView;
});
