const Person = require('../../src/shouty.js');
const { Given, When, Then } = require("@cucumber/cucumber");

Given('Lucy is located {int} meters from Sean', function (distance) {
  const lucy = new Person;
  const sean = new Person;
  lucy.moveTo(distance);
  return 'pending';
});

When('Sean shouts {string}', function (string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('Lucy hears Sean\'s message', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});