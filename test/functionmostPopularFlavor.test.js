const assert = require('assert');
const mostPopularFlavor = require('../src/mostPopularFlavor');

describe('mostPopularFlavor', () => {
  it('should return the most popular flavor', () => {
    const votes = [0, 2, 3, 4, 4];
    const expected = 4;
    assert.strictEqual(mostPopularFlavor(votes), expected);
  });

  it('should handle ties correctly', () => {
    const votes = [1, 1, 1, 3, 4, 4];
    const expected = 1;
    assert.strictEqual(mostPopularFlavor(votes), expected);
  });

  it('should handle an empty array', () => {
    const votes = [];
    const expected = null;
    assert.strictEqual(mostPopularFlavor(votes), expected);
  });

  it('should handle an array with only one flavor', () => {
    const votes = [0];
    const expected = 0;
    assert.strictEqual(mostPopularFlavor(votes), expected);
  });

  it('should handle an array with multiple flavors and no ties', () => {
    const votes = [0, 1, 2, 3];
    const expected = 0;
    assert.strictEqual(mostPopularFlavor(votes), expected);
  });

  it('should handle an array with multiple flavors and ties', () => {
    const votes = [0, 1, 2, 1, 0];
    const expected = 0;
    assert.strictEqual(mostPopularFlavor(votes), expected);
  });
});