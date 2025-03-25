import { useState } from 'react'

function Square({value, onSquareClick}){
  return (<button className="square" onClick={onSquareClick}>{value}</button>);
}

function Board({xIsNext, squares, onPlay}) {
  function handleClick(i){
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
    
  return (
    <>
      <div className="status">{status}</div>
      <div className="Board">
        <Square value={squares[0]} onSquareClick={()=>handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={()=>handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={()=>handleClick(2)}/>
        <Square value={squares[3]} onSquareClick={()=>handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={()=>handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={()=>handleClick(5)}/>
        <Square value={squares[6]} onSquareClick={()=>handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={()=>handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={()=>handleClick(8)}/>
      </div>
    </>
  )
}

function Game(){
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[history.length - 1]; //keadaan terakhir history

  function handlePlay(nextSquares){
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
    setXIsNext((nextMove % 2) === 0);
    setHistory(history.slice(0, nextMove + 1));
    setXIsNext(!xIsNext);
  }

  const moves = history.map((squares, move) => {
   let desc = '';
   if(move > 0){
    desc = 'Go to move #' + move;
   } else {
    desc = 'Go to game start';
   } 
   return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
   );
  });


  return(
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen md:justify-center md:items-center">
            <h1 className="text-2xl font-bold mb-4">Tic-Tac-Toe</h1>
              <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            <h2 className="text-xl font-semibold mt-4">History</h2>
            <ul className="mt-2 w-64 bg-white p-2 shadow-md rounded-md">
                <ol>{moves}</ol>
            </ul>
        </div>
  );
}

export default Game


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
