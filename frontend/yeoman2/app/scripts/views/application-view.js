/*global define*/

define([
    'jquery-ui',
    'underscore',
    'backbone',
    'templates',
    'views/time-slider'
], function ($, _, Backbone, JST, TimeSlider) {
    'use strict';

    var ApplicationView = Backbone.View.extend({
        el: $('div.main'),
        template: JST['app/scripts/templates/application.ejs'],
        initialize: function (options) {
        },
        render: function () {
            this.$el.html('');
            console.log('karumba');
            return this;
        }
    });

    new TimeSlider();

    return ApplicationView;
});

