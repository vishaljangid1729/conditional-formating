import React, {useState} from 'react'
import {useTable, useFilters, useSortBy, usePagination} from 'react-table'

export default function Table({columns, data}) {
  const instance = useTable(
    {columns, data},
    useFilters,
    useSortBy,
    usePagination
  )
  const {
    getTableProps,
    getTableBodyProps,
    rows,
    headerGroups,
    prepareRow,
  } = instance

  const [filterInput, setFilterInput] = useState('')
  const handleFilterInput = (e) => {
    const value = e.target.value || undefined
    setFilterInput(value)
  }
  return (
    <>
      <div
        style={{
          margin: '2rem',
        }}
      >
        <input
          type='text'
          value={filterInput}
          onChange={handleFilterInput}
          placeholder='Type Language to highlight'
          style={{
            fontSize: '1.5em',
          }}
        />
      </div>

      <table
        {...getTableProps()}
        style={{
          borderCollapse: 'separate',
          borderSpacing: '1rem 1.5rem',
        }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {' '}
                  {column.render('Header')}{' '}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps({
                        style: {
                          background:
                            cell.value === filterInput ? 'yellow' : null,
                        },
                      })}
                    >
                      {' '}
                      {cell.render('Cell')}{' '}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
