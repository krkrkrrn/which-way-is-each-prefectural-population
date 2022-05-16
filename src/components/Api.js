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
        console.error(res.status)
        console.warn(res.statusText)
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

/**
 * 都道府県別人口の取得
 * @param {string} [prefCode='13'] 1-47の都道府県を示す番号(default: 東京)
 * @param {string} [prefName='東京都'] 都道府県名
 * @param {string} [cityCode='-'] 市を示す番号(default: 全ての市)
 * @returns {Object<*>} names: 都道府県のリスト、data: rechartsjsに渡す表データ
 */
export async function getPopulation(
  prefCode = '13',
  prefName = '東京都',
  cityCode = '-'
) {
  const API_KEY = process.env.REACT_APP_RESAS_API_KEY
  const URL =
    'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear'
  const params = '?prefCode=' + prefCode + '&cityCode=' + cityCode
  return fetch(URL + params, {
    method: 'GET',
    headers: { 'X-API-KEY': API_KEY },
  })
    .then((res) => {
      if (!res.ok) {
        console.error(res.status)
        console.warn(res.statusText)
        throw new Error(res.statusText)
      }
      return res.json()
    })
    .then((json) => {
      return {
        code: prefCode,
        name: prefName,
        data: json.result.data[0].data.map((obj) => {
          return { year: Number(obj['year']), value: Number(obj['value']) }
        }),
      }
    })
}
