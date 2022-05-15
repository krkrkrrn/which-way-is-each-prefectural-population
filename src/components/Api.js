/**
 * RESAS API から、都道府県コードと都道府県の名称を取得する
 * @returns {Promise} json形式のレスポンス
 */
export async function getPrefectures() {
  const API_KEY = process.env.REACT_APP_RESAS_API_KEY
  const URL = 'https://opendata.resas-portal.go.jp/api/v1/prefectures'
  return fetch(URL, {
    method: 'GET',
    headers: { 'X-API-KEY': API_KEY },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    })
    .then((json) => {
      return Object.fromEntries(
        json.result.map((obj) => [obj.prefCode, obj.prefName])
      )
    })
}
