import { useState } from 'react'

function Square(){
  return <button className="square">X</button>;
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Square />
    </div>
  )
}

export default App
