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

            window.App.Helpers.Sign = function(x) {
                return x ? x < 0 ? -1 : 1 : 0;
            };
        },
        render: function () {
            log('Render: jog-wheel.');

            $('#jogWheel').knobKnob({
                snap : 10,          // Snap to zero if less than this deg.
                value: 180,         // Default rotation
                turn : function(ratio){
                    // Do what you want here. Ratio moves from 0 to 1
                    // relative to the knob rotation. 0 - off, 1 - max
                    var step = window.App.Views.JogWheel.step =
                                Math.round(1000 * (ratio - 0.5)) / 1000;

                    if (Math.abs(step) > 0.05) {
                        log('Turn: jog-wheel. Step: ' + step);
                        if (window.App.Views.JogWheel.interval) {
                            window.clearInterval(window.App.Views.JogWheel.interval);
                        }
                        window.App.Views.JogWheel.interval = window.setInterval(function() {
                            window.App.Models.App.set('pit',
                                window.App.Models.App.get('pit') +
                                    window.App.Helpers.Sign(
                                        window.App.Views.JogWheel.step));
                            log('Tick: jog-wheel.');
                        }, 100 / Math.abs(step));

                        $('#jogWheel .knob .base').attr('style',
                            'box-shadow: 1px 2px 0 #4a5056, 2px 4px 8px #36F;');

                    } else {
                        log('Stop: jog-wheel. Step: ' + step);
                        window.App.Views.JogWheel._stop();
                    }
                }
            });

            // Doubleclick stops the time warp as well.
            $('#jogWheel').bind('dblclick', function() {
                log('Stop: jog-wheel. Doubleclicked.');
                window.App.Views.JogWheel._stop();
            });

            // TODO: Mouse wheel scrolling.
            // Bind mouse scroll wheel.
            // Credits @see http://stackoverflow.com/questions/5722949/ui-slider-mousewheel/5723291#5723291
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

        },
        _stop: function() {
            // Stops the time warp.
            if (window.App.Views.JogWheel.interval) {
                window.clearInterval(window.App.Views.JogWheel.interval);
            }
            $('#jogWheel .knob .base').attr('style', 'none');
            // $('#jogWheel .top').css('transform','rotate(180deg)');
        }
    });

    return JogWheelView;
});

