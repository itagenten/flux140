/* Time slider widget. */

/*global define, log*/

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
            log('Init: time-slider.');
        }
    });

    log('Load: time-slider.');

    return TimeSliderView;
});

