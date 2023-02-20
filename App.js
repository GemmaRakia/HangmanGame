import React, { useState, useEffect } from 'react';

const words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon'];

function App() {
  const [word, setWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [remainingGuesses, setRemainingGuesses] = useState(6);

  useEffect(() => {
    // Choose a random word from the list
    setWord(words[Math.floor(Math.random() * words.length)]);
  }, []);

  const handleGuess = (letter) => {
    // Make sure the letter hasn't already been guessed
    if (guesses.indexOf(letter) !== -1) {
      return;
    }

    // Add the letter to the list of guesses
    setGuesses([...guesses, letter]);

    // Check if the letter is in the word
    if (word.indexOf(letter) === -1) {
      setRemainingGuesses(remainingGuesses - 1);
    }
  };

  const isGameWon = () => {
    return word.split('').every(letter => guesses.indexOf(letter) !== -1);
  };

  const isGameLost = () => {
    return remainingGuesses === 0;
  };

  const renderWord = () => {
    return word.split('').map((letter, index) => {
      if (guesses.indexOf(letter) !== -1) {
        return <span key={index}>{letter} </span>;
      } else {
        return <span key={index}>_ </span>;
      }
    });
  };

  return (
    <div className="App">
      <h1>Hangman Game</h1>
      <p>{renderWord()}</p>
      <p>Remaining guesses: {remainingGuesses}</p>
      <p>Letters guessed: {guesses.join(', ')}</p>
      {!isGameWon() && !isGameLost() &&
        <div>
          <p>Guess a letter:</p>
          <div>
            {Array.from({ length: 26 }, (_, index) => {
              const letter = String.fromCharCode('a'.charCodeAt(0) + index);
              return (
                <button key={letter} onClick={() => handleGuess(letter)}>{letter}</button>
              );
            })}
          </div>
        </div>
      }
      {isGameWon() &&
        <div>
          <p>You won!</p>
          <button onClick={() => window.location.reload()}>Play again</button>
        </div>
      }
      {isGameLost() &&
        <div>
          <p>You lost. The word was "{word}".</p>
          <button onClick={() => window.location.reload()}>Play again</button>
        </div>
      }
    </div>
  );
}


export default App;
