import React, {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [data, setData] = useState([])

  // Fetching data from server

  useEffect(() => {
    ;(async () => {
      const result = await axios('https://api.tvmaze.com/search/shows?q=snow')
      setData(result)
    })()
  }, [])

  return (
    <h1>Hello Universe!</h1>
  )
}


export default App;
