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
        _updateTextNav: function () {
            $('#navbar-text-pit').val(window.App.Models.App.get('pit'));
        },
        initialize: function () {
            log('Init: application-view');
            window.App.Models.App.on('change:pit', this._updateTextNav, this);
            $('#navbar-text-pit').keypress(function(e) {
                if (e.which === 13) { // 'Enter' button
                    $('#timeSlider').slider('value', $(this).val());
                }
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

