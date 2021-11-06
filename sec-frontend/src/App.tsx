// @ts-nocheck

import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useStoreActions, useStoreState } from './store/StoreFront';
import { useTable } from 'react-table';

function App() {

const isClick = useStoreState((store) => {
  return store.testingModel.isClick;
})
const {toggleClick} = useStoreActions((action) => {
  return action.testingModel;
})

  const sock = new WebSocket('ws://localhost:3002');
  sock.onopen = () => {
    console.info('connected to socket')
  }

  sock.onmessage = (message) => {
    console.info(message);
  }

  // const data = React.useMemo(() => [
  //   {
  //     id: "01coin",
  //     symbol: "zoc",
  //     name: "01coin",
  //   },
  //   {
  //     id: "0-5x-long-algorand-token",
  //     symbol: "algohalf",
  //     name: "0.5X Long Algorand Token",
  //   },
  //   {
  //     id: "0-5x-long-altcoin-index-token",
  //     symbol: "althalf",
  //     name: "0.5X Long Altcoin Index Token",
  //   },
  // ], []);

  const [data, setData] = useState([]);

  
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/list')
    .then(res => res.json())
    .then(result => {
      setData(result);
    })
    .catch(()=> {
      setData([
        {
          id: "01coin",
          symbol: "zoc",
          name: "01coin",
        },
        {
          id: "0-5x-long-algorand-token",
          symbol: "algohalf",
          name: "0.5X Long Algorand Token",
        },
        {
          id: "0-5x-long-altcoin-index-token",
          symbol: "althalf",
          name: "0.5X Long Altcoin Index Token",
        },
      ])
    })
  }, [])




  const columns = React.useMemo(() => [
    {
      Header: 'Coin ID',
      accessor: 'id',
    }, {
      Header: 'Coin Symbol',
      accessor: 'symbol'
    }, {
      Header: 'Coin Name',
      accessor: 'name'
    }
  ], [])

  // @ts-ignore

  const table = useTable({columns, data});

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = table;

  return (
    <div>
      <h1>SEC Project</h1>
      <button
          className="App-link"
          onClick= {() => toggleClick()}
        >
          Learn React
          {console.log(isClick)}
        </button>
      <table {...getTableProps()}>
        <thead >
          {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {
                  row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    )
                  })
                }
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
