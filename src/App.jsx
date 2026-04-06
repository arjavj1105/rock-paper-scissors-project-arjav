import { useState } from 'react'
import './App.css'

// Define static definitions outside to ensure component purity
const CHOICES = [
  { id: 'rock', emoji: '🪨', name: 'Rock', color: 'hsl(350, 80%, 65%)' },
  { id: 'paper', emoji: '📄', name: 'Paper', color: 'hsl(210, 80%, 65%)' },
  { id: 'scissor', emoji: '✂️', name: 'Scissor', color: 'hsl(150, 80%, 60%)' }
];

function App() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ user: 0, computer: 0 });
  const [rounds, setRounds] = useState(0);
  const [history, setHistory] = useState([]);

  const selectComputerChoice = () => {
    return CHOICES[Math.floor(Math.random() * CHOICES.length)];
  };

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
      </header>
    </div>
  )
}

export default App
