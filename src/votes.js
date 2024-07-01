let votes = [];

function addVote(vote) {
  votes.push(vote);
}

function getVotes() {
  return votes;
}

function resetVotes() {
  votes = [];
}

module.exports = {
  addVote,
  getVotes,
  resetVotes
};