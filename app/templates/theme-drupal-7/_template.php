<?php // $Id$



/**
 * Implementation of hook_js_alter()
 */
function <%= themeFolder %>_js_alter(&$js) {

    <% if(useModernizr) { %>
    // add modernizr
    $modernizrKey = 'custom-modernizr';
    $js[$modernizrKey] = $js['misc/drupal.js'];
    $js[$modernizrKey]['data'] = 'js/modernizr.min.js';
    $js[$modernizrKey]['weight'] = -999;
    $js[$modernizrKey]['version'] = 'latest';
    <% } %>
}

