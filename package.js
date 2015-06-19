Package.describe({
  summary: "Login service for Slack accounts",
  version: "0.0.1",
  git: "https://github.com/krishamoud/meteor-accounts-slack.git",
  name: "khamoud:accounts-slack",
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom("METEOR@0.9.0");
  api.export("Slack", ['client', 'server']);

  api.use('accounts-base', ['client', 'server']);
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);

  api.use('oauth', ['client', 'server']);
  api.use('oauth2', ['client', 'server']);
  api.use('http', ['server']);
  api.use('underscore', 'server');
  api.use('templating', 'client');
  api.use('random', 'client');
  api.use('service-configuration', ['client', 'server']);

  api.add_files('slack_server.js', 'server');

  api.add_files(
    ['slack_login_button.css', 'slack_client.js', 'slack_configure.html', 'slack_configure.js'],
    'client');

  api.add_files("slack.js");
});


Package.onTest(function(api) {
  api.use(['khamoud:accounts-slack', 'tinytest', 'test-helpers'], ['client', 'server']);
  api.add_files('accounts-slack-tests.js', ['client', 'server']);
});
