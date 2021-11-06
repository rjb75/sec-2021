import React, { useEffect, useState } from "react";
import { Column, useFilters, usePagination, useRowSelect, useTable } from "react-table";
import { SelectionPayload } from "../store/misc/table.store";
import IndeterminateCheckbox from "./IndeterminateCheckbox";


interface PortfolioTableData {
    id: string,
    symbol: string,
    name: string,
}

// export interface SelectionPayload  {
//     title: string
//     watchList: string[]
//   }

export interface ActionPayload {
    action: string
    payload: SelectionPayload
}


export const PortfolioTable = () => {
    const [data, setData] = useState<PortfolioTableData[]>([]);

    const sock = new WebSocket("ws://localhost:3005");
    // sock.onopen = () => {
    //     console.info("connected to socket");

    //     const test = {
    //         action: "create-portfolio",
    //         payload:
    //     };
    //     sock.send(JSON.stringify(test));
    // }

    

    function createMessage(d: any): ActionPayload {
        const list = {d.map(i => {i.values.id})}
        const payload = { title: "test-portfolio", watchList: list }
        sock.send(JSON.stringify(d => 
    }

    // const createMessage = (data: SelectionPayload) => {
    //     return { action: "create-portfolio", payload: data }
    // }

    const getMessage = () => {
        return selectedFlatRows.map(d => d.original);
    }

    useEffect(() => {
        fetch('https://api.coingecko.com/api/v3/coins/list')
            .then(res => res.json())
            .then(result => {
                setData(result);
            })
            .catch(() => {
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


    const columns: Array<Column> = React.useMemo(() => [
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


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        selectedFlatRows,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        gotoPage,
        setPageSize,
        pageOptions,
        state: { pageIndex, pageSize, selectedRowIds },
    } = useTable({ columns, data }, useFilters, usePagination, useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                // Let's make a column for selection
                {
                    id: 'selection',
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox  {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox  {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ])
        });
    return (
        <div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'Previous'}
                </button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'Next'}
                </button>
                <span>
                    Page
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </span>
                <span>
                    | Go to page:
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                    />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            {/* selectedFlatRows.map(
                d => d.original) */}
            <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
            <button onClick={() => {createMessage(selectedFlatRows)}
            }>
                Submit
            </button>

        </div >
    );
}
