/*global define,log*/

define([
    'jquery-ui',
    'underscore',
    'backbone',
    'templates',
    'views/time-slider',
    'views/jog-wheel',
    'models/application-model',
], function ($, _, Backbone, JST, TimeSlider, JogWheel, AppModel) {
    'use strict';

    var ApplicationView = Backbone.View.extend({
        el: $('div.navbar'),
        template: JST['app/scripts/templates/application.ejs'],
        model: window.App.Models.App || (window.App.Models.App = new AppModel()),
        events: {
            'click #browsers .dropdown-menu a': function(eventObject) {
                window.App.Models.App.set('currentGallery',
                    eventObject.currentTarget.text);
                eventObject.preventDefault();
            }
        },
        _updateNavViews: function () {
            var pit = window.App.Models.App.get('pit');
            $('#navbar-text-pit').val(pit);
            $('#timeSlider').slider('value', pit);
            if (window.App.Views.current) {
                Backbone.history.navigate(
                    window.App.Views.current.calcUrl(),
                    {trigger: false, replace: true}
                );
            }
        },
        initialize: function () {
            log('Init: application-view.');

            window.App.Views.TimeSlider = new TimeSlider();
            window.App.Views.JogWheel = new JogWheel();

            this.listenTo(window.App.Models.App,
                'change', this._updateNavViews);
            $('#navbar-text-pit').keypress(function(e) {
                if (e.which === 13) { // 'Enter' button
                    window.App.Models.App.set('pit', e.currentTarget.value);
                }
            });

            this.listenToOnce(window.App.Models.App,
                'change:galleries', function (model, value, options) {
                    $('#browsers .dropdown-menu').html(
                        value.map(function (v) {
                            return '<li><a href="#">' + v.get('name') + '</a></li>';
                        })
                    );
                }
            );
            this.listenTo(window.App.Models.App,
                'change:currentGallery', function(model, value, options) {
                    window.App.Models.Gallery =
                        window.App.Models.App.get('galleries')
                            .findWhere({'name': value});

                    $('#timeSlider').slider({
                        min: window.App.Models.Gallery.get('minPit'),
                        max: window.App.Models.Gallery.get('maxPit')
                    });

                    $('#browsers .dropdown-toggle').html(
                        value + ' <b class="caret"></b>');

                    if (window.App.Views.current) {
                        window.App.Router.navigate(
                            window.App.Views.current.calcUrl(),
                            {trigger: true}
                        );
                    }
                }
            );
        },
        render: function () {
            log('Render: application-view.');
            $('div.main').html(this.template());

            window.App.Views.TimeSlider.render();
            window.App.Views.JogWheel.render();

            return this;
        }
    });

    log('Load: application-view.');

    return ApplicationView;
});

