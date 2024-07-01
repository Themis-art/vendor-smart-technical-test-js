function mostPopularFlavor(votes) {
    const voteCounts = {};
  
    for (let vote of votes) {
      if (voteCounts[vote]) {
        voteCounts[vote]++;
      } else {
        voteCounts[vote] = 1;
      }
    }
  
    let maxVotes = 0;
    let mostPopular = null;
  
    for (let flavor in voteCounts) {
      if (voteCounts[flavor] > maxVotes || (voteCounts[flavor] === maxVotes && flavor < mostPopular)) {
        maxVotes = voteCounts[flavor];
        mostPopular = flavor;
      }
    }
  
    return parseInt(mostPopular);
  }
  
  module.exports = mostPopularFlavor;