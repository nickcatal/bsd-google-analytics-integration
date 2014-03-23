Blue State Digital Google Analytics Integration Script
================================

Google Analytics Integration library for use on sites that use the BSD Tools, developed by Blue State Digital agency employees, and available for public use under the Apache 2 license. 

<h1>Installation</h1>
In order to correctly install the `ga_integration-min.js` snippet, you need to break the standard Google Analytics snippet in half. This is so that the custom variables set in the script set before the `_trackPageview`, but after the `setDomainName` call is set. 
There are two parts to the `ga_integration-min.js` code, a modified version of the initial Google Analytics snippet in the header (preferably immediately before the `</head>` tag) then the 
```html
<!-- START Google Analytics -->
<script type="text/javascript">
var ga_integration_config = {
    bsddomain: '//donate.yourdomain.com',
    msid_seed: 'abcd123'
}
var _gaq=[["_setAccount","<!--place id here-->"],["_setDomainName",location.hostname.split(".").slice(-2).join(".")]];
_gaq.push(function(){function b(a){return(RegExp("(?:^|; )"+a+"=([^;]*)").exec(document.cookie)||[]).pop()}var a=function(){var a={};location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(b,e,f){a[e]=f});return a}();_gaq.push(["_setSiteSpeedSampleRate",10],["_setAllowAnchor",!0],["_setAllowLinker",!0]);a.source&&_gaq.push(["_setCustomVar",1,"Source",a.source,2]);a.subsource&&_gaq.push(["_setCustomVar",5,"Subsource",a.subsource,2]);b("msid")&&(a=ga_integration_config.msid_seed?""+(parseInt(b("msid"),
16)^ga_integration_config.msid_seed):b("msid"),_gaq.push(["_setCustomVar",2,"msid",a,2]));_gaq.push(["_setCustomVar",3,"Has GUID",""+!!b("guid"),2]);_gaq.push(["_setCustomVar",4,"Has Spud",""+!!b("spud"),2])});_gaq.push(["_trackPageview"]);(function(b,a){var c=b.createElement(a),d=b.getElementsByTagName(a)[0];c.async=1;c.src=("https:"==location.protocol?"//ssl":"//www")+".google-analytics.com/ga.js";d.parentNode.insertBefore(c,d)})(document,"script");
</script>
<!-- END Google Analytics -->
```


To include the rest of the script, simply include the script after you've included jquery. The following example assumes you have not yet included jquery on your page.
```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="//dnwssx4l7gl7s.cloudfront.net/bsdaction/default/page/-/js/analytics/ga_integration-min.js"></script>
```

<h1>Features</h1>

<h3>E-Commerce</h3>
All contributions are tracked by default as e-commerce transactions, with the product name set to the form name and the category set to the type of contribution. Different types include the various combinations of Recurring, Quick Donate, and Ticket-based contributions. 

<h3>GA Event Categories</h3>
- Completions: Tracks completed BSD Actions in the case of signups, ecommerce and quick-donate opt-in. The ecommerce event is duplicative of the E-Commerce module data, but is less accurate because the associated values are rounded.
- PDF Clicks: This tracks clicks on links to a pdf.
- Form Submits: Tracks all form submits, regardless of the outcome.
- Errors: Validation errors in Signup, Contribution and Share.
- Error Log: JavaScript Errors
- Exits: Clicks on links to a different domain
- Mailcheck: catches mis-spelled email addresses
- Duplication of the Social Events
- Tests: Data from our Optimizely experiments running on the page


<h3>Social Tracking</h3>
By default, the following things, when properly configured, are automatically tracked as social tracking and duplicated to event tracking:
- Facebook Likes, Clicks to Facebook Shares, and Clicks to Facebook
- All Twitter intents events, including callbacks for completed tweets and follows. 
- External clicks to Pinterest, Facebook, Twitter and YouTube. 

<h3>Custom Variables</h3>
1. Source: Captures the value of a ?source parameter in the URL
2. msid: Grabs the obfuscated mailing_send_id cookie when it's available. This can be decoded by the analytics team and made to associate traffic with a particular mailing (in the absence of proper tagging)
3. Has GUID: Tags whether a visitor has a guid cookie at the start of their visit. 
4. Has SPUD:Tags whether a visitor has a spud cookie at the start of their visit. 
5. Subsource: Captures the value of a ?subsource parameter in the URL


<h2>Configuration</h2>

The behvaior of the library can be configured by the `ga_integration_config` global object.

The configuration attributes are:

 - `bsddomain` - Set to one of the bsd subdomains (e.g. `https://donate.domain.org`, or `//donate-domain.org`) for the purposes of grabbing LOE information or loading the SPUD script. To avoid mixed content errors, this domain should support HTTPS.
 - `cookiedomain - if this isn't set manually, the library will just use the location.hostname.split method used in the above snippet on the `_setDomainName` call to grab the current domain.
 - `nocookie` - set to true if you want to prevent the library from using cookies. This disables any of the tracking features that rely on cookies. 
 - `msid_seed` - passes the actual `mailing_send_id` instead of the obfuscated `mailing_send_id` that is set by default on the mailing cookie. Should always set it if we can, especially for clients using our mailer. Contact BSD to find out this value. 
 - `nospud` - Set to true to avoid unnecessary SPUD calls on non-bsd domains. Not necessary if you configure the `bsddomain`
 - `noloe` - set to false to avoid unnecessary LOE calls on non-bsd domains. Not necessary if you configure the `bsddomain`
