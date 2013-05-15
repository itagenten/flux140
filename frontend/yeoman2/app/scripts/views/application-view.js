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
            this.$el.html(this.template());
            log('Render: application-view.');
            return this;
        }
    });

    log('Load: application-view.');

    ApplicationView.timeSliderView = new TimeSlider();

    return ApplicationView;
});

