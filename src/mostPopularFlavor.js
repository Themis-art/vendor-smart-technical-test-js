function mostPopularFlavor(votes) {
  if (votes.length === 0) {
    return null;
  }
    const voteCounts = {};
  
    votes.forEach(vote => {
      voteCounts[vote] = (voteCounts[vote] || 0) + 1;
    });
  
    let mostPopular = null;
    let maxVotes = 0;
    for (const flavor in voteCounts) {
      if (voteCounts[flavor] > maxVotes) {
        mostPopular = flavor;
        maxVotes = voteCounts[flavor];
      }
    }
  
    return parseInt(mostPopular, 10);
  }
  
  module.exports = mostPopularFlavor;