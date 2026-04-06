import { useState } from 'react'
import './App.css'

// Define static definitions outside to ensure component purity
const CHOICES = [
  { id: 'rock', emoji: '🪨', name: 'Rock', color: 'hsl(350, 80%, 65%)' },
  { id: 'paper', emoji: '📄', name: 'Paper', color: 'hsl(210, 80%, 65%)' },
  { id: 'scissor', emoji: '✂️', name: 'Scissor', color: 'hsl(150, 80%, 60%)' }
];

function App() {
  return (
    <div className="app-container">
      <header className="game-header">
        <h1>Rock Paper <span className="highlight">Scissors</span></h1>
      </header>
    </div>
  )
}

export default App
