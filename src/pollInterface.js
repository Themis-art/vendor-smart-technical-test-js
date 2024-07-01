const readline = require('readline');
const flavors = require('./flavors');
const { addVote, getVotes, resetVotes } = require('./votes');
const mostPopularFlavor = require('./mostPopularFlavor');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function startPoll() {
  console.log();
  console.log("✨ Vote in Your Favorite Ice Cream Flavor (๑ᵔ⤙ᵔ๑) ✨");
  console.log();
  console.log("Flavor options:");
  console.log();
  Object.entries(flavors).forEach(([key, value]) => {
    console.log(` ・ ${key} - ${value}`);
  });
  console.log();
  console.log("Please enter the number corresponding to your favorite flavor below:");
  console.log();

  rl.question("Your favorite flavor number: ", function(voteInput) {
    const vote = parseInt(voteInput);

    if (!isNaN(vote) && vote >= 0 && vote <= 4) {
      addVote(vote);
      console.log();
      console.log('・・・・・・・・・・・・・・・・・・・・・・');
      console.log();
      console.log(`     ☆  You Voted for ${flavors[vote]} ! ☆`);
      console.log();
      console.log('・・・・・・・・・・・・・・・・・・・・・・');
      console.log();
      console.log('     Thank You for Voting! (ㅅ´ ˘ `)');
      console.log();
      console.log();

      rl.question("Would you like to continue voting? (yes/no): ", function(answer) {
        if (answer.toLowerCase() === 'yes') {
          startPoll();
        } else {
          const votes = getVotes();
          const mostPopular = mostPopularFlavor(votes);
          console.log();
          console.log('──────────────────── ⋆⋅☆⋅⋆ ──────────────────────');
          console.log();
          console.log(` 🏆 The most voted flavor was ${flavors[mostPopular]} 🏆`);
          console.log();
          console.log();
          rl.close();
        }
      });
    } else {
      console.log();
      console.log('・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・');
      console.log();
      console.log('             🚨 Error! Vote not computed! 🚨');
      console.log();
      console.log('   Please enter a valid flavor number between 0 and 4  ')
      console.log();
      console.log('・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・');
      setTimeout(() => {
        startPoll();
      }, 2000);
    }
  });
}

module.exports = startPoll;