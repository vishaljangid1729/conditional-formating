import React, {useMemo} from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Table from './components/Table'

const App = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    ;(async () => {
      const result = await axios('https://api.tvmaze.com/search/shows?q=snow')
      setData(result.data)
    })()
  }, [])

  const columns = useMemo(
    () => [
      {
        Header: 'TV Show',
        columns: [
          {
            Header: 'Name',
            accessor: 'show.name',
          },
          {
            Header: 'Type',
            accessor: 'show.type',
          },
        ],
      },
      {
        Header: 'Details',
        columns: [
          {
            Header: 'Language',
            accessor: 'show.language',
            disableSortBy: false,
          },
          {
            Header: 'Genre(s)',
            accessor: 'show.genres',
            Cell: ({cell: {value}}) => <Gernes values={value}></Gernes>,
          },
          {
            Header: 'Runtime',
            accessor: 'show.runtime',
            Cell: ({cell: {value}}) => {
              const hour = Math.floor(value / 60)
              const min = Math.floor(value % 60)
              return (
                <>
                  {hour > 0 ? `${hour} hr${hour > 1 ? 's' : ''} ` : ''}
                  {min > 0 ? `${min} min${min > 1 ? 's' : ''}` : ''}
                </>
              )
            },
          },
          {
            Header: 'Status',
            accessor: 'show.status',
          },
        ],
      },
    ],
    []
  )

  return (
    <>
      <Table columns={columns} data={data}></Table>
    </>
  )
}

const Gernes = ({values, name}) => {
  return (
    <>
      {values.map((gerns, idx) => {
        return (
          <span
            key={idx}
            style={{
              padding: '.5rem',
              margin: '1rem',
              backgroundColor: 'rgb(240, 240, 240)',
              borderRadius: '10px',
            }}
          >
            {gerns}
          </span>
        )
      })}
    </>
  )
}

export default App
