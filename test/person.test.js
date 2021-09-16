const assert = require('assert');
const { describe } = require('hamjest');
const sinon = require('sinon');
const { Person } = require('../src/shouty');

describe("Person", () => {
  let network, networkStub;
  beforeEach(() => {
    network = {
      subscribe() {},
      broadcast() {},
    };
    networkStub = sinon.spy(network);
  });

  it("it subscribes to the network", () => {
    const lucy = new Person(network);
    assert(networkStub.subscribe.calledOnce);
    assert.strictEqual(networkStub.subscribe.getCall(0).args[0], lucy);
  });

  it("broadcasts shouts to the network", () => {
    const message = "Free bagels!";
    const sean = new Person(network);
    sean.shout(message);
    assert(networkStub.broadcast.calledOnce);
    assert.strictEqual(networkStub.broadcast.getCall(0).args[0], message);
  });

  it("remembers messages heard", () => {
    const message = "Free bagels!";
    const lucy = new Person(network);
    lucy.hear(message);
    assert.deepStrictEqual(lucy.messagesHeard(), [message]);
  });

  it("does not broadcast a message over 180 characters even if listener is in range", () => {
    const shouterLocation = 0;
    const listenerLocation = 90;
    const lucy = new Person(networkStub, listenerLocation);
    const lucyStub = sinon.spy(lucy);

    const longMessage = 'x'.repeat(181);

    network.subscribe(lucy)
    network.broadcast(longMessage, shouterLocation);

    assert(lucyStub.hear.notCalled);
  });
});