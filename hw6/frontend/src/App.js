import { useState } from 'react';
import './App.css';
import { guess, startGame, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')

  const startMenu =
    <div>
      <button onClick={() => {
        setHasStarted(true)
        startGame()
        // someFunctionToBackend; and setHasStarted       
      }
      } > start game </button>
    </div>

  const handleGuess = async () => {
    const response = await guess(number)
    if (response === 'Equal') setHasWon(true)
    else {
      setStatus(response)
      setNumber('')
    }


  }

  const gameMode =
    <div>
      <p>Guess a number between 1 to 100</p>
      <input   // Get the value from input
        id="input"
        onChange={(e) => { setNumber(e.target.value) }}
      ></input>
      <button  // Send number to backend         
        onClick={() => {
          handleGuess()
          document.getElementById("input").value = ''
        }}
        disabled={!number}
      >guess!</button>
      {console.log(status)}
      <p>{status}</p>
    </div>




  const winningMode = (
    <div>
      <p>you won! the number was {number}.</p>
      <button onClick={() => {
        setHasWon(false)
        setStatus('')
        restart()
      }
      } // Handle restart for backend and frontend
      >restart</button>
    </div>
  )

  //Define states
  //Define three different
  //views

  const game =
    <div>
      {hasWon ? winningMode : gameMode}
    </div>

  return (<div className="App">
    {hasStarted ? game : startMenu}</div>
  )
}

export default App;
