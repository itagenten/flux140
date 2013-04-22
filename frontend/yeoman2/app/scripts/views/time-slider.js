/* Time slider widget. */

/*global define*/

define([
    'jquery-ui',
    'backbone',
], function ($, Backbone) {
    'use strict';

    var TimeSliderView = Backbone.View.extend({
        tagName: 'div',
        id: 'timeSlider',
        initialize: function () {
            $('#timeSlider').slider();
        }
    });

    console.log('matt... damon....');

    return TimeSliderView;
});

