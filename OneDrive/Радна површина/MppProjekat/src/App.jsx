import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);

  function handleSelectSquare(row, col) {
    setActivePlayer((current) => (current === "X" ? "O" : "X"));
    setGameTurns((prev) => {
      let currentPlayer = "X";
      if (prev.length > 0 && prev[0].player === "X") {
        currentPlayer = "O";
      }
      const updatedTurns = [
        { square: { row, col }, player: currentPlayer },
        ...prev,
      ];
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            playerName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            playerName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        <GameBoard turns={gameTurns} onSelectSquare={handleSelectSquare} />
      </div>
      <Log />
    </main>
  );
}

export default App;
