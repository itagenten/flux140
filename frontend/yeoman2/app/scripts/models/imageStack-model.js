/*global define,log*/

define([
    'underscore',
    'backbone',
    'collections/images-collection',
], function (_, Backbone, ImagesCollection) {
    'use strict';

    var ImageStackModel = Backbone.Model.extend({
        defaults: {
            browser: 'Firefox 3.6',
            images: new ImagesCollection([
                // A few images w/ default settings
                {src:"0.png"},
                {src:"1.png"},
                {src:"2.png"},
                {src:"3.png"},
                {}, {}, {}, {}, {}, {}, {}, {}
            ])
        }
    });

    log('Load: imageStack-model.');

    return ImageStackModel;
});
