import { useState } from 'react'
import './App.css'

// Define static definitions outside to ensure component purity
const CHOICES = [
  { id: 'rock', emoji: '🪨', name: 'Rock', color: 'hsl(350, 80%, 65%)' },
  { id: 'paper', emoji: '📄', name: 'Paper', color: 'hsl(210, 80%, 65%)' },
  { id: 'scissor', emoji: '✂️', name: 'Scissor', color: 'hsl(150, 80%, 60%)' }
];

// Pure(ish) logic for the computer's choice, separated from render cycle
const selectComputerChoice = () => {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)];
};

function App() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ user: 0, computer: 0 });
  const [rounds, setRounds] = useState(0);
  const [history, setHistory] = useState([]);

  const handleClick = (choiceId) => {
    const userPick = CHOICES.find(c => c.id === choiceId);
    const computerPick = selectComputerChoice();
    
    setUserChoice(userPick);
    setComputerChoice(computerPick);
    setRounds(prev => prev + 1);

    let roundResult = "";
    if (choiceId === computerPick.id) {
      roundResult = "It's a tie!";
    } else if (
      (choiceId === "rock" && computerPick.id === "scissor") ||
      (choiceId === "paper" && computerPick.id === "rock") ||
      (choiceId === "scissor" && computerPick.id === "paper")
    ) {
      roundResult = "You win!";
      setScore(prev => ({ ...prev, user: prev.user + 1 }));
    } else {
      roundResult = "Computer wins!";
      setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
    }

    setResult(roundResult);
    setHistory(prev => [{
      user: userPick.emoji,
      computer: computerPick.emoji,
      result: roundResult,
      round: rounds + 1,
      won: roundResult === "You win!"
    }, ...prev].slice(0, 50)); 
  };

  const nextRound = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult("");
  };

  const resetAll = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult("");
    setScore({ user: 0, computer: 0 });
    setRounds(0);
    setHistory([]);
  };

  return (
    <div className="app-container">
      <header className="game-header">
        <h1>Rock Paper <span className="highlight">Scissors</span></h1>
        <button className="btn-reset" onClick={resetAll}>Reset Game</button>
      </header>

      <main className="game-screen">
        <div className="top-dashboard">
          <div className="score-board">
            <div className="score-side">
              <span className="player-label">You</span>
              <span className="score-value">{score.user}</span>
            </div>
            <div className="score-divider">vs</div>
            <div className="score-side">
              <span className="player-label">Computer</span>
              <span className="score-value">{score.computer}</span>
            </div>
          </div>
        </div>

        <div className="game-main">
          {!userChoice ? (
            <div className="selection-area">
              <h2 className="prompt">Choose your move</h2>
              <div className="choices-row">
                {CHOICES.map((choice) => (
                  <button 
                    key={choice.id} 
                    className="choice-card"
                    onClick={() => handleClick(choice.id)}
                  >
                    <div className="choice-emoji">{choice.emoji}</div>
                    <span className="choice-name">{choice.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="battle-arena">
              <div className="battle-display">
                <div className="fighter">
                  <span className="fighter-label">You</span>
                  <div className="fighter-box">
                    {userChoice.emoji}
                  </div>
                </div>
                
                <div className="vs-sign">VS</div>
                
                <div className="fighter">
                  <span className="fighter-label">Computer</span>
                  <div className="fighter-box">
                    {computerChoice.emoji}
                  </div>
                </div>
              </div>
              
              <div className="battle-results">
                <h2 className={`result-text ${result.includes('win') ? 'win' : result.includes('tie') ? 'tie' : 'lose'}`}>
                  {result}
                </h2>
                <button className="btn-action" onClick={nextRound}>
                  Play Again
                </button>
              </div>
            </div>
          )}
        </div>

        {history.length > 0 && (
          <section className="history-tray">
            <div className="tray-header">
              <h3>Recent Games</h3>
            </div>
            <div className="log-list">
              {history.map((item, index) => (
                <div key={index} className={`log-entry ${item.won ? 'victory' : ''}`}>
                  <span className="log-round">#{item.round}</span>
                  <div className="log-clash">
                    {item.user} vs {item.computer}
                  </div>
                  <span className="log-status">{item.result}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
