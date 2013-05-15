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
                {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
            ])
        }
    });

    log('Load: imageStack-model.');

    return ImageStackModel;
});
