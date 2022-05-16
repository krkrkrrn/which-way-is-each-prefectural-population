import React, { useEffect, useState } from 'react'
import { getPopulation, getPrefectures } from './Api'
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'

/**
 * 年別人口推移のグラフを出力
 * @returns {JSX} nav以下のDOM
 */
const Graph = () => {
  // RESAS API から都道府県コードと都道府県別人口を取得
  const [populations, setState] = useState({})

  useEffect(() => {
    getPrefectures().then((res) => {
      const prefCodes = Object.keys(res)
      Promise.all(prefCodes.map((code) => getPopulation(code, res[code])))
        .then((res) => {
          const population = {}
          const prefNames = new Set()
          for (const each_res of res) {
            const prefName = each_res['name']
            prefNames.add(prefName)
            for (const data of each_res.data) {
              const year = Number(data['year'])
              if (!(year in population)) {
                population[year] = {}
              }
              if ('value' in data) {
                population[year][prefName] = data['value']
              }
            }
          }
          const years = Object.keys(population)
          years.sort()
          const names = Array.from(prefNames.values())
          const data = years.map((year) =>
            Object.assign(population[year], { year: year })
          )
          setState({ names: names, data: data })
        })
        .catch((error) => {
          console.warn(error)
        })
    })
  }, [])

  return (
    <main>
      <LineChart
        width={Math.floor(window.innerWidth * 0.8)}
        height={Math.floor(window.innerWidth / 2)}
        data={populations.data}
        style={{ margin: '0 auto' }}
      >
        <XAxis
          dataKey="year"
          label={{ value: '年度', offset: -5, position: 'insideBottomRight' }}
        />
        <YAxis
          label={{ value: '人口', offset: -20, position: 'insideTopLeft' }}
        />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        {populations.names
          ? populations.names.map((name) => (
              <Line
                type="monotone"
                id={name}
                className="display_none"
                dataKey={name}
                stroke="#8884d8"
              />
            ))
          : ''}
      </LineChart>
    </main>
  )
}

export default Graph
