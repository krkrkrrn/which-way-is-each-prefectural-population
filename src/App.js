import React from 'react'
import Nav from './components/Nav'
import Graph from './components/Graph'
import './App.css'

/**
 * ページ本体の出力
 * @returns {JSX} ページ本体のDOM
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">都道府県別人口推移</header>
      <Nav />
      <Graph />
    </div>
  )
}

export default App
