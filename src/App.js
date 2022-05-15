import React, { useEffect, useState } from 'react'
import { getPrefectures } from './Api.js'
import logo from './logo.svg'
import './App.css'

function App() {
  // RESAS API から都道府県コードと都道府県別人口を取得
  const [population, setState] = useState({})
  useEffect(() => {
    getPrefectures()
      .then((res) => {
        setState(res)
        console.log(res)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
