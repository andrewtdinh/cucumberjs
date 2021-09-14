const { describe } = require('hamjest');
const sinon = require('sinon');
const { Network } = require('../src/shouty');

describe('Network', () => {
  it('broadcasts a message to all listeners', () => {
    const network = new Network();
    const message = "Free bagels!";

  })
})