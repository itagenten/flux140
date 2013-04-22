/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        'jquery-ui': {
            exports: '$',
            deps: ['jquery', 'bootstrap-dropdown']
        },
    },
    paths: {
        jquery: '../components/jquery/jquery',
        'jquery-ui': 'vendor/jquery-ui/js/jquery-ui-1.10.2.custom',
        backbone: '../components/backbone-amd/backbone',
        underscore: '../components/underscore-amd/underscore',
        'bootstrap-dropdown': '../components/bootstrap/js/bootstrap-dropdown',
        templates: 'templates/compiled',
    }
});

require([
    'backbone',
    'models/application-model',
    'views/application-view',
], function (Backbone, AppModel, AppView) {
    Backbone.history.start();

    window.App = {
        Models: {
            App: new AppModel()
        },
        Views: {
            App: new AppView()
        },
        Collections: {
        },
    };
});

