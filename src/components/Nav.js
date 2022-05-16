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

/**
 * 都道府県のリストからチェックボックスを出力する
 * @param {Object<string, string>} prefectures 都道府県コード: 都道府県名
 * @returns {JSX} チェックボックスのリスト
 */
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

/**
 * 都道府県毎のグラフの表示を切り替える
 * @param {*} event clickイベント
 */
const onClick = (event) => {
  const id = event.target.value
  const checked = event.target.checked
  const graphLine = document.getElementById(id)
  if (graphLine) {
    if (checked) {
      graphLine.parentNode.classList.remove('display_none')
    } else {
      graphLine.parentNode.classList.add('display_none')
    }
  }
}

export default Nav
