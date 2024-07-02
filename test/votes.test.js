const assert = require('assert');
const { addVote, getVotes, resetVotes } = require('../src/votes');
describe('Votes', () => {
  beforeEach(() => {
    resetVotes(); 
  });

  it('should add a vote to the list of votes', () => {
    addVote(1);
    const votes = getVotes();
    assert.deepStrictEqual(votes, [1]);
  });

  it('should get the list of votes', () => {
    addVote(2);
    addVote(3);
    const votes = getVotes();
    assert.deepStrictEqual(votes, [2, 3]);
  });

  it('should reset the list of votes', () => {
    addVote(1);
    resetVotes();
    const votes = getVotes();
    assert.deepStrictEqual(votes, []);
  });
});