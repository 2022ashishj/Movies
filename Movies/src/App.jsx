import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MovieSearchApp from './components/MovieSearchApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MovieSearchApp/>
    </>
  )
}

export default App
