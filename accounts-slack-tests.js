Tinytest.add('Accounts Slack - Server Account Creation Test', function(test){
    if(Meteor.isServer) {
        var slackId = Random.id();

        // create an account with slack 
        var uid1 = Accounts.updateOrCreateUserFromExternalService(
        'slack', {id: slackId, monkey: 42}, {profile: {foo: 1}}).id;
        var users = Meteor.users.find({"services.slack.id": slackId}).fetch();
        test.length(users, 1);
        test.equal(users[0].profile.foo, 1);
        test.equal(users[0].services.slack.monkey, 42);

        // create again with the same id, see that we get the same user.
        // it should update services.slack but not profile.
        var uid2 = Accounts.updateOrCreateUserFromExternalService(
        'slack', {id: slackId, llama: 50},
        {profile: {foo: 1000, bar: 2}}).id;
        test.equal(uid1, uid2);
        users = Meteor.users.find({"services.slack.id": slackId}).fetch();
        test.length(users, 1);
        test.equal(users[0].profile.foo, 1);
        test.equal(users[0].profile.bar, undefined);
        test.equal(users[0].services.slack.llama, 50);
        // make sure we *don't* lose values not passed this call to
        // updateOrCreateUserFromExternalService
        test.equal(users[0].services.slack.monkey, 42);

        // cleanup
        Meteor.users.remove(uid1);
    }
})

Tinytest.add('Accounts Slack - config validates keys', function (test) {
  test.throws(function () {
    Accounts.config({foo: "bar"});
  });
});
