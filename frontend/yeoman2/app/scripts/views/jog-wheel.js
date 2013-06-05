/* Jog wheel widget. */

/*global define, log*/

define([
    'backbone',
    'jquery-ui',
    'knobknob',
], function (Backbone, $, knobknob) {
    'use strict';

    log('Load: jog-wheel.');
    
    var JogWheelView = Backbone.View.extend({
        tagName: 'div',
        id: 'jogWheel',
        initialize: function () {
            log('Init: jog-wheel.');
        },
        render: function () {
            log('Render: jog-wheel.');

            $('#jogWheel').knobKnob({
                snap : 10,          // Snap to zero if less than this deg.
                value: 180,         // Default rotation
                turn : function(ratio){
                    // Do what you want here. Ratio moves from 0 to 1
                    // relative to the knob rotation. 0 - off, 1 - max
                    window.App.Views.JogWheel.ratio = ratio - 0.5;
                }
            });

            // Bind mouse scroll wheel.
            // Credits @see http://stackoverflow.com/questions/5722949/ui-slider-mousewheel/5723291#5723291
            // TODO: Mouse wheel scrolling.
           /*  $('#jogWheel').bind('mousewheel DOMMouseScroll', function (e) {
                var delta = 0, element = $(this), value, oe;
                oe = e.originalEvent;  // for jQuery >=1.7
                // value = element.knobKnob('value');

                if (oe.wheelDelta) {
                    delta = oe.wheelDelta / -120;
                }
                if (oe.detail) {
                    delta = oe.detail / 3;
                }

                // value += delta;
                // element.knobKnob('value', value);
                element.trigger('mousedown');

                var mm = $.Event('mousemove');
                mm.pageX = 100;
                mm.pageY = 100;
                element.trigger(mm);

                element.trigger('mouseup');
                return false;
            }); */

        }
    });

    return JogWheelView;
});

