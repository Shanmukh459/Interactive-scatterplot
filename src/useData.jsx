import { useEffect, useState } from "react"
import { csv } from "d3"


const csvUrl =   'https://gist.githubusercontent.com/Shanmukh459/b5d83c8b7334616ceb7d9bfba7ffeb24/raw/c2a883e845ddae11c612c03823ee403e1f4d12ed/Iris.csv';

export const useData = () => {
  const [data, setData] = useState()
  useEffect(() => {
    const row = (d) => {
      d.sepal_length = +d.sepal_length
      d.petal_length = +d.petal_length
      d.sepal_width = +d.sepal_width
      d.petal_width = +d.petal_width
      return d
    }
    csv(csvUrl, row).then(setData)
  }, [])
  return data
}