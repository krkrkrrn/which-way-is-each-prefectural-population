import React, { useEffect, useState } from 'react'
import { getPopulation } from './Api'
import { LineChart, Line, XAxis, CartesianGrid } from 'recharts'

/**
 * 年別人口推移のグラフを出力
 * @returns {JSX} nav以下のDOM
 */
const Graph = () => {
  // RESAS API から都道府県コードと都道府県別人口を取得
  const [population, setState] = useState({})
  useEffect(() => {
    getPopulation()
      .then((res) => {
        setState(res)
        console.log(res)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <main>
      <LineChart width={500} height={300} data={population}>
        <XAxis dataKey="year" />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </main>
  )
}

export default Graph
