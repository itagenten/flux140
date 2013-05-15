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
        initialize: function () {
            log('Init: application-view');
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

