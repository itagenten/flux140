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
        knobknob: {
            deps: ['jquery', 'transform']
        }
    },
    paths: {
        jquery: '../components/jquery/jquery',
        'jquery-ui': 'vendor/jquery-ui/js/jquery-ui-1.10.2.custom',
        backbone: '../components/backbone-amd/backbone',
        underscore: '../components/underscore-amd/underscore',
        'bootstrap-dropdown': '../components/bootstrap/js/bootstrap-dropdown',
        templates: 'templates/compiled',
        knobknob: '../components/knobknob/knobKnob/knobKnob.jquery',
        transform: '../components/knobknob/knobKnob/transform',
    }
});


/* Define our globals */
// performance.now is available in Chrome stable, Firefox 15+, and IE10.
// @see http://gent.ilcore.com/2012/06/better-timer-for-javascript.html
if (!window.performance) {
    window.performance = {};
}
window.performance.now = (function () {
  return window.performance.now       ||
         window.performance.mozNow    ||
         window.performance.msNow     ||
         window.performance.oNow      ||
         window.performance.webkitNow ||
         function () {return new Date().getTime() - window.performance.timing.navigationStart;};
}());
if (!window.performance.timing) {
    window.performance.timing = {navigationStart: new Date().getTime()}; // For relative times when shimming.
}

function log(text) {
    console.log(window.performance.now() + ': ' + text);
}
log('Logging initialized.'); // Suppress "never used" linter warning.

// Application namespace.
// Initialization happens lazily later.
window.App = {
    Models: {
        App: null,
        Gallery: null,
    },
    Views: {
        App: null,
        Gallery: null,
    },
    Collections: {},
    Helpers: {}
};

require([
    'backbone',
    'views/application-view',
    'routes/application-router',
], function (Backbone, AppView, Router) {

    // Init main application view
    if (!window.App.Views.App) {
        window.App.Views.App = new AppView();
    }
    window.App.Views.App.render();

    // Init router after App has finished parsing the JSON.
    Backbone.listenToOnce(window.App.Models.App, 'ready',
        function () {
            window.setTimeout(function () {
                window.App.Router = new Router();
                Backbone.history.start();
            }, 0);
        }
    );
});

