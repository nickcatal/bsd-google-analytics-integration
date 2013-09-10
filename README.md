Blue State Digital Google Analytics Integration Script
================================

Google Analytics Integration library for use on sites that use the BSD Tools, developed by Blue State Digital agency employees, and available for public use under the Apache 2 license. 

<h1>Insallation</h1>
In order to correctly install the `ga_integration-min.js` snippet, you need to break the standard Google Analytics snippet in half. This is so that the custom variables set in the script set before the `_trackPageview`, but after thd domain is set. 
```html
<!-- START Google Analytics -->
<script type="text/javascript">
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', '<!--place id here-->']);
    _gaq.push(["_setDomainName", location.hostname.split(".").slice(-2).join(".")]);
    _gaq.push(["_setAllowAnchor", true]);
    _gaq.push(['_setAllowLinker', true]);
    _gaq.push(['_setSiteSpeedSampleRate', 20])
</script>
<script src="//dnwssx4l7gl7s.cloudfront.net/bsdaction/default/page/-/js/analytics/ga_integration-min.js"></script>
<script>
    _gaq.push(['_trackPageview']);
    (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
</script>
<!-- END Google Analytics -->
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
