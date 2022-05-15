import React, { useEffect, useState } from 'react'
import { getPrefectures } from './Api.js'
import './Nav.css'

/**
 * 都道府県を選択するナビゲーションを出力
 * @returns {JSX} nav以下のDOM
 */
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
        console.warn(error)
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
        <input
          type="checkbox"
          name={key}
          value={prefectures[key]}
          onClick={onClick}
        />
        {prefectures[key]}
      </label>
    </div>
  ))
  return <div>{items}</div>
}

const onClick = (event) => {
  console.log(event.target.name)
  console.log(event.target.value)
  console.log(event.target.checked)
}

export default Nav
