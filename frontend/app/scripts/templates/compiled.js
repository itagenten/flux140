define(function(){

  this["JST"] = this["JST"] || {};

  this["JST"]["app/scripts/templates/application.ejs"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<div id="startup-logo">\n    <img  src="images/itagenten-logo.png" />\n</div>\n\n';}return __p};

  this["JST"]["app/scripts/templates/detail.ejs"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<!-- <div class="detail"> </div> -->\n\n';}return __p};

  this["JST"]["app/scripts/templates/gallery.ejs"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<ul class=\'thumbnails\'> </ul>\n\n';}return __p};

  this["JST"]["app/scripts/templates/imageStack-detail.ejs"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<div class=\'thumbnail imagestack\' title=\'' +((__t = ( title )) == null ? '' : __t) +'\'>\n    <img src=\'' +((__t = ( src )) == null ? '' : __t) +'\' alt=\'imagestack\' />\n</div>\n\n';}return __p};

  this["JST"]["app/scripts/templates/imageStack-gallery.ejs"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<div class=\'thumbnail imagestack\' title=\'' +((__t = ( title )) == null ? '' : __t) +'\'>\n    <img src=\'' +((__t = ( src )) == null ? '' : __t) +'\' alt=\'imagestack\' />\n</div>\n\n';}return __p};

  return this["JST"];

});