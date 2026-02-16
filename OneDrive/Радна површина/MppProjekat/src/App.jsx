import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

const initialGB = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = initialGB;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner = undefined;

  for (const comb of WINNING_COMBINATIONS) {
    const firstSquareSym = gameBoard[comb[0].row][comb[0].column];
    const secondSquareSym = gameBoard[comb[1].row][comb[1].column];
    const thirdSquareSym = gameBoard[comb[2].row][comb[2].column];

    if (
      firstSquareSym &&
      firstSquareSym === secondSquareSym &&
      firstSquareSym === thirdSquareSym
    ) {
      winner = firstSquareSym;
    }
  }

  function handleSelectSquare(row, col) {
    setGameTurns((prev) => {
      const currentPlayer = deriveActivePlayer(prev);
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
        {winner && <p>You Won, {winner}!</p>}
        <GameBoard board={gameBoard} onSelectSquare={handleSelectSquare} />
      </div>
      {gameTurns.length > 0 && <Log turns={gameTurns} />}
    </main>
  );
}

export default App;
