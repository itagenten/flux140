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
        },
        _changeHandler: function(event, ui) {
            window.App.Models.App.set('pit', ui.value);
        },
        render: function () {
            log('Render: time-slider.');

            $('#timeSlider').slider({
                value: window.App.Models.App.get('pit'),
                min: 0,
                max: 10,
                change: this._changeHandler
            });

            // Bind mouse scroll wheel.
            // Credits @see http://stackoverflow.com/questions/5722949/ui-slider-mousewheel/5723291#5723291
            $('#timeSlider').bind('mousewheel DOMMouseScroll', function (e) {
                var delta = 0, element = $(this), value, oe;
                oe = e.originalEvent; // for jQuery >=1.7
                value = element.slider('value');

                if (oe.wheelDelta) {
                    delta = oe.wheelDelta / -120;
                }
                if (oe.detail) {
                    delta = oe.detail / 3;
                }

                value += delta;
                element.slider('value', value);
                return false;
            });
        }
    });

    return TimeSliderView;
});

