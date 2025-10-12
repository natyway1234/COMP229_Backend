// Main App component that sets up routing for the portfolio website
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'
import MainRouter from './MainRouter';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <MainRouter />
    </Router>
  )
}

export default App
