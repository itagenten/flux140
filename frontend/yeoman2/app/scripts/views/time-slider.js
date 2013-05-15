/* Time slider widget. */

/*global define, log*/

define([
    'jquery-ui',
    'backbone',
], function ($, Backbone) {
    'use strict';

    log('Load: time-slider.');

    var TimeSliderView = Backbone.View.extend({
        tagName: 'div',
        id: 'timeSlider',
        initialize: function () {
            log('Init: time-slider.');
            // first render.
            this.render();
        },
        _changeHandler: function(event, ui) {
            window.App.Models.App.set('pit', ui.value);
        },
        render: function () {
            $('#timeSlider').slider({
                min: 0,
                max: 10,
                change: this._changeHandler
            });
        }
    });

    return TimeSliderView;
});

