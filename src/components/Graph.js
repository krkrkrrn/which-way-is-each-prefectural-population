import React, { useEffect, useState } from 'react'
import { getPopulation, getPrefectures } from './Api'
import { LineChart, Line, XAxis, CartesianGrid } from 'recharts'

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
          console.log('promise.all finished')
          console.log(res)
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
          console.log('names')
          console.log(names)
          console.log('data')
          console.log(data)
          setState({ names: names, data: data })
        })
        .catch((error) => {
          console.warn(error)
        })
    })
  }, [])

  const lines = () => {
    console.log('run render')
    if (typeof populations.names === 'Array') {
      return populations.names.map((name) => (
        // <Line type="monotone" id={name} dataKey={name} stroke="#8884d8" />
        <div>{name}</div>
      ))
    } else {
      return <div>{populations.names}</div>
    }
  }

  return (
    <main>
      {populations.names
        ? populations.names.map((name) => <div>{name}</div>)
        : ''}
      <LineChart
        width={window.innerWidth}
        height={Math.floor(window.innerWidth / 2)}
        data={populations.data}
      >
        <XAxis dataKey="year" />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      </LineChart>
    </main>
  )
}

export default Graph
