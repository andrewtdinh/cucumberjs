const { Given, When, Then, Before } = require("@cucumber/cucumber");
const { assertThat, is, contains, not } = require("hamjest");
const assert = require('assert');

const { Person, Network } = require("../../src/shouty");

const default_range = 100;

Before(function() {
  this.people = {};
  this.network = new Network(default_range);
})

Given("the range is {int}", function (range) {
  this.network = new Network(range);
})

Given("a person named {word}", function (name) {
  this.people[name] = new Person(this.network, 0);
});

Given("people are located at", function (dataTable) {
  dataTable.transpose().hashes().map((person) => {
    this.people[person.name] = new Person(this.network, person.location);
  })
});

When("Sean shouts {string}", function (message) {
  this.people['Sean'].shout(message)
  this.messageFromSean = message;
});

When("Sean shouts", function () {
  this.people['Sean'].shout("Hello, world")
});

Then('Lucy should hear a shout', function () {
  assertThat(this.people['Lucy'].messagesHeard().length, is(1))
})

Then('{word} should not hear a shout', function(name) {
  assertThat(this.people[name].messagesHeard(), not(contains(this.messageFromSean)))
})

Then("Lucy should hear Sean's message", function () {
  assertThat(this.people['Lucy'].messagesHeard(), is([this.messageFromSean]));
});

Then("{word} hears the following messages:", function (name, expectedMessages) {
  let actualMessages = this.people[name].messagesHeard().map(message => [message]);

  assert.deepEqual(actualMessages, expectedMessages.raw())
});
