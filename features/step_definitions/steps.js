const Person = require('../../src/shouty');
const { Given, When, Then } = require("@cucumber/cucumber");
const { assertThat, is } = require('hamjest');

Given('{person} is located {int} meters from Sean', function (lucy, distance) {
  this.lucy = lucy;
  this.sean = new Person;
  console.log({lucy})
  this.lucy.moveTo(distance);
});

When('Sean shouts {string}', function (message) {
  this.sean.shout(message);
  this.message = message;
});

Then('Lucy hears Sean\'s message', function () {
  assertThat(this.lucy.messagesHeard(), is([this.message]))
});