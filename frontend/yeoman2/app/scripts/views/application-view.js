/*global define,log*/

define([
    'jquery-ui',
    'underscore',
    'backbone',
    'templates',
    'views/time-slider',
    'models/application-model',
], function ($, _, Backbone, JST, TimeSlider, AppModel) {
    'use strict';

    var ApplicationView = Backbone.View.extend({
        el: $('div.main'),
        template: JST['app/scripts/templates/application.ejs'],
        model: window.App.Models.App || (window.App.Models.App = new AppModel()),
        _updateNavViews: function () {
            var pit = window.App.Models.App.get('pit');
            $('#navbar-text-pit').val(pit);
            $('#timeSlider').slider('value', pit);
        },
        initialize: function () {
            log('Init: application-view.');
            this.listenTo(window.App.Models.App, 'change:pit', this._updateNavViews);
            $('#navbar-text-pit').keypress(function(e) {
                if (e.which === 13) { // 'Enter' button
                    window.App.Models.App.set('pit', e.currentTarget.value);
                }
            });
            $('#playButton').click(function(e) {
                e.preventDefault();
                setInterval(function() {
                    window.App.Models.App.set('pit',
                        window.App.Models.App.get('pit') + 1);
                }, 1000);
            });

            this.listenTo(window.App.Models.Gallery, 'change', function () {
                $('#timeSlider').slider({
                    min: window.App.Models.Gallery.get('minPit'),
                    max: window.App.Models.Gallery.get('maxPit'),
                    value: window.App.Models.Gallery.get('maxPit')
                });
            });
        },
        render: function () {
            log('Render: application-view');
            this.$el.html(this.template());
            return this;
        }
    });

    log('Load: application-view.');

    window.App.Views.timeSliderView = new TimeSlider();
    window.App.Views.timeSliderView.render();

    return ApplicationView;
});

