meteor-accounts-slack
=====================

A meteor package for Slack's login service.

Package Dependencies
--------------------

* accounts-base
* accounts-oauth

Install
-------
```
meteor add khamoud:accounts-slack
```

Allows for requesting credentials without creating a user as well.

```
// client
Slack.requestCredential({}, function(token) {
    var secret = OAuth._retrieveCredentialSecret(token);
    if(secret){
        Meteor.call("linkAdditionalSlack", token, secret,function(err,res){
            if(!err) {
                Router.go("/group/" + res.getUrlPath());
            } else {
                    console.log(err);
            }
        });
    }
});

//server
'linkAdditionalCalendar':function(token, secret){
    // Make sure the user is logged in
    var user = Meteor.user();
    if(!user){
        throw new Meteor.Error(500, "You are currently not logged in.")
    }

    // Retrieve the credential token.
    var cred = Google.retrieveCredential(token, secret);
    var serviceData = cred.serviceData;
}
```
