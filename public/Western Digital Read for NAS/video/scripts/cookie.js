function Cookie(){

}

var cookie_list,sub_domain,location_pathname,cookie_index,cookie_count;
cookie_count=0;
// Get the semicolon separated list of cookies and make an array out of them
cookie_list=document.cookie.split("; ");
// Go through each cookie and delete it.  The &&cooki_list[cookie_index] check is there
// for the case in which there are no cookies and the split returns the empty string.
for(cookie_index=0;cookie_index<cookie_list.length&&cookie_list[cookie_index];cookie_index++){
    cookie_count++;
    // Each cookie needs to be expired on all possible domains.  For example:
    // .subdomain.example.com
    // subdomain.example.com
    // .example.com
    // example.com
    // .com
    // com
    for(sub_domain="."+location.host;sub_domain;sub_domain=sub_domain.replace(/^(?:\.|[^\.]+)/,"")){
        // Each cookie needs to be expired on all possible paths.
        // Take one character at a time off the path.
        for(location_pathname=location.pathname;location_pathname;location_pathname=location_pathname.replace(/.$/,"")){
            // set an expired cookie to delete the cookie
            // The new cookie will have the same name and value as the old cookie,
            // but will be deleted immediately by the browser's cookie management
            document.cookie=(
               cookie_list[cookie_index]+
               "; domain="+
               sub_domain+
               "; path="+
               location_pathname+
               "; expires="+
               // Take a couple years off of today's date
               new Date((new Date()).getTime()-1e11).toGMTString()
            );
        }
    }
}
//alert(document.cookie);