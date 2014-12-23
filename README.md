<h2>Developing GA Integration</h2>

Download the <a href="https://developers.google.com/closure/compiler/docs/gettingstarted_app">Closure Compiler JAR file</a> and place it in the `analytics` parent directory

Add the following to the .git/hooks/pre-commit file in the repo:

```bash
#!/bin/sh
if ! ( git status | grep -qs ga_integration.js)
    then
        echo "Skipping minification"
        exit
fi
echo "Minifying ga_integration..."
java -jar ../compiler.jar --js ga_integration.js --js_output_file ga_integration-min.js
git add ga_integration-min.js
echo "Minified ga_integration"
#Commit
exit
```

This will automatically minify `ga_integration.js` into `ga_integration-min.js` when changes are made to `ga_integration.js` so you don't need to manually minify and paste the changes. 

Be sure that the git hook is executable (while you're add it, do the same for the test.sh file):

```bash
    chmod +x .git/hooks/pre-commit
    chmod +x tests/test.sh
```

Install PhantomJS:
````bash
    brew update && brew install phantomjs
````
<h2>Run the unit tests</h2>
Depending on phantomjs permissions, you may need to run this as `sudo`.
````bash
    tests/test.sh
````

<h2>Run the deploy script</h2>
This will run the unit tests, ensure they pass, and upload the newest version into the `bsdaction` file storage. Then it'll invalidate the Fastly cache. (It does not invalidate the Cloudfront cache.)

Depending on phantomjs permissions, you may need to run this as `sudo`.

````bash
    php release/deploy.php
````

<h2>Configuration</h2>

GA Integration will look for an optional global object called `ga_integration_config` which you can use to set configuration for a client. All fields are optional. 'ga_integration_config' should be included before GAI is loaded. You can generate a skeleton object with a client's mailing send id seed with the <a href='https://stats.bluestatedigital.com/export/'>Abacus Generate GA Integration Config Script Block</a> query.

 - `bsddomain` - Set to one of the bsd subdomains (e.g. `https://donate.domain.org`, or `//donate-domain.org`) for the purposes of grabbing LOE information or loading the SPUD script. To avoid mixed content errors, this domain should support HTTPS.
 - `cookiedomain` - if this isn't set manually, the library will just use the `location.hostname.split` method used in the above snippet on the `_setDomainName` call to grab the current domain.
 - `nocookie` - Set to `true` if you want to prevent the library from using cookies. This disables any of the tracking features that rely on cookies. 
 - `msid_seed` - passes the actual `mailing_send_id` instead of the obfuscated `mailing_send_id` that is set by default on the mailing cookie. Should always set it if we can, especially for sites using the BSD mailer. Contact BSD to find out this value. 
 - `nospud` - Set to `true` to disable SPUD features. (Default: `false`)
 - `noloe` - Set to `true` to disable LOE usage. (Default: `false`)

Example:

```javascript
var ga_integration_config = {
  nospud : true,
  bsdomain: "//secure-domain.client.com",
  msid_seed: 9023328
}
````
