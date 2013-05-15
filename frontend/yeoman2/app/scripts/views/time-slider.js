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

            $('#timeSlider').bind('mousewheel DOMMouseScroll', function (e) {
                var delta = 0, element = $(this), value, result, oe;
                oe = e.originalEvent; // for jQuery >=1.7
                value = element.slider('value');

                if (oe.wheelDelta) {
                    delta = -oe.wheelDelta;
                }
                if (oe.detail) {
                    delta = oe.detail * 40;
                }

                value -= delta / 120;
                element.slider('value', value);
                return false;
            });
        }
    });

    return TimeSliderView;
});

