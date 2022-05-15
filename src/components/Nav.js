import React, { useEffect, useState } from 'react'
import { getPrefectures } from './Api.js'
import './Nav.css'

const Nav = () => {
  // RESAS API から都道府県コードと都道府県別人口を取得
  const [prefectures, setState] = useState({})
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
    <nav>
      <h3>都道府県</h3>
      {checkboxItems(prefectures)}
    </nav>
  )
}

const checkboxItems = (prefectures) => {
  const keys = Object.keys(prefectures)
  keys.sort((a, b) => Number(a) - Number(b))

  const items = keys.map((key) => (
    <div>
      <label>
        <input type="checkbox" value={key} />
        {prefectures[key]}
      </label>
    </div>
  ))
  return <div>{items}</div>
}

export default Nav
