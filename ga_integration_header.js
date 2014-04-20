/**
 * @license Copyright 2014 Nick Catalano
 * Blue State Digital Google Analytics Integration Library
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *  http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/
(function(window, document, location, ga_id) {
function gapush(what) {
    window._gaq.push(what);
}
function set_custom_var(number, name, value, scope) {
    gapush(['_setCustomVar', number, name, value, scope]);
}
// Scope ga_integration_config locally to help the minifier
var ga_integration_config = window.ga_integration_config;
window._gaq=[
    ['_setAccount', ga_id],
    ["_setDomainName", location.hostname.split(".").slice(-2).join(".")]
];
gapush(function() {
    function readCookie(a){return(RegExp("(?:^|; )"+a+"=([^;]*)").exec(document.cookie)||[]).pop();}
    var get = (function() {
        var map = {};
        location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, k, v) {
            map[k] = v;
        });
        return map;
    } ());
    // Some useful defaults
    gapush(
        ['_setSiteSpeedSampleRate', 10],
        ["_setAllowAnchor", true],
        ["_setAllowLinker", true]);
    /*
    CUSTOM VARIABLES
    1: Store the 'source' parameter
    2: Store the msid cookie, with optional deobfuscation if the msid_seed is set. 
    3: True/False as to if GUID cookie is set
    4: True/False as to if SPUD cookie is set
    5: Store the 'subsource' parameter. 
    */
    if (get.source) {
        set_custom_var(1, 'Source', get.source, 2);
    }
    if (get.subsource) {
        set_custom_var(5, 'Subsource', get.subsource, 2);
    }
    if (readCookie("msid")) {
        var msid = ga_integration_config.msid_seed ? ""+(parseInt(readCookie("msid"), 16)^ga_integration_config.msid_seed) : readCookie("msid");
        set_custom_var(2, 'msid', msid, 2);
    }
    set_custom_var(3, 'Has GUID', "" + !!readCookie("guid"), 2);
    set_custom_var(4, 'Has Spud', "" + !!readCookie("spud"), 2);
    
});
gapush(['_trackPageview']);
var g=document.createElement('script'),s=document.getElementsByTagName('script')[0];g.async=1;
g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
s.parentNode.insertBefore(g,s);
})(window, document, location, '<!--place id here-->');
