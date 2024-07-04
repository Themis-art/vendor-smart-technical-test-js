const readline = require('readline');
const { addVote, getVotes, resetVotes } = require('../src/votes');
const mostPopularFlavor = require('../src/mostPopularFlavor');
const startPoll = require('../src/pollInterface');
const flavors = require('../src/flavors');

jest.mock('readline', () => ({
  createInterface: jest.fn().mockReturnValue({
    question: jest.fn(),
    close: jest.fn(),
  }),
}));

describe('startPoll function', () => {
  beforeEach(() => {
    resetVotes();
    jest.clearAllMocks();
  });

  it('should print welcome message and flavor options', () => {
    const mockRl = readline.createInterface();

    // Mock console.log to check expected outputs
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

    startPoll(mockRl);

    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining("✨ Vote in Your Favorite Ice Cream Flavor (๑ᵔ⤙ᵔ๑) ✨"));
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Flavor options:'));

    mockConsoleLog.mockRestore();
  });

  it('should record a valid vote and thank the user', (done) => {
    const mockRl = readline.createInterface();
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

    // Mock user input callbacks
    mockRl.question.mockImplementation((question, callback) => {
      if (question.includes("Your favorite flavor number")) {
        callback('1');
      } else if (question.includes("continue voting?")) {
        callback('no');
        done(); // Call done to indicate completion of asynchronous test
      }
    });

    startPoll(mockRl);

    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('☆  You Voted for'));

    mockConsoleLog.mockRestore();
  });

  it('should display an error message for invalid input', (done) => {
    const mockRl = readline.createInterface();
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

    mockRl.question.mockImplementation((question, callback) => {
      if (question.includes("Your favorite flavor number")) {
        callback('5');
        done(); 
      }
    });

    startPoll(mockRl);

    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('🚨 Error! Vote not computed! 🚨'));

    mockConsoleLog.mockRestore();
  });

  it('should continue polling if the user answers "yes"', (done) => {
    const mockRl = readline.createInterface();
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

    let callbackCount = 0;

    mockRl.question.mockImplementation((question, callback) => {
      if (question.includes("Your favorite flavor number")) {
        callback('1');
      } else if (question.includes("continue voting?")) {
        if (callbackCount === 0) {
          callback('yes');
          callbackCount++;
        } else if (callbackCount === 1) {
          callback('2');
          callbackCount++;
        } else if (callbackCount === 2) {
          callback('no');
          done(); // Call done to indicate completion of asynchronous test
        }
      }
    });

    startPoll(mockRl);

    expect(getVotes()).toEqual([1, 2]);
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('☆  You Voted for'));

    mockConsoleLog.mockRestore();
  });

  it('should display the most popular flavor and close the interface', (done) => {
    const mockRl = readline.createInterface();
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

    mockRl.question.mockImplementation((question, callback) => {
      if (question.includes("Your favorite flavor number")) {
        callback('1');
      } else if (question.includes("continue voting?")) {
        callback('no');
        done(); 
      }
    });

    startPoll(mockRl);

    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('🏆 The most voted flavor was'));
    expect(mockRl.close).toHaveBeenCalled();

    mockConsoleLog.mockRestore();
  });
});
