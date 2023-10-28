import {
    Column,
    Table as ReactTable,
    PaginationState,
    useReactTable,
    getCoreRowModel,
    //   getFilteredRowModel,
    getPaginationRowModel,
    ColumnDef,
    OnChangeFn,
    flexRender,
    createColumnHelper,
    Pagination,
} from "@tanstack/react-table";
import { useRequest } from "../hooks/useRequest"
import { useState } from "react";
import { Box, useQuery } from "@chakra-ui/react";
import { title } from "process";
import { IShipsData } from "../models/shipModel";
import { compose } from "@chakra-ui/utils";

import styles from "./ShipsTable.module.scss";
import React from "react";


function ShipsTable() {

    const int2roman = (original: number): string => {
        if (original < 1 || original > 3999) {
            throw new Error('Error: Input integer limited to 1 through 3,999');
        }
        const numerals = [
            ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'], // 1-9
            ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'], // 10-90
        ];

        const digits = Math.round(original).toString().split('');
        let position = (digits.length - 1);

        return digits.reduce((roman, digit) => {
            if (digit !== '0') {
                roman += numerals[position][parseInt(digit) - 1];
            }
            position -= 1;
            return roman;
        }, '');
    }


    const shipsData = useRequest();
    const data = shipsData as unknown as IShipsData[];
    const columnHelper = createColumnHelper<IShipsData>()
    const columns = [
        columnHelper.accessor('image', {
            header: "image",
            cell: (props: any) => <> <img className={styles.ship_image} src={props.getValue()} width='100px' height='20px' alt="" />  </>
        }),
        
        columnHelper.accessor('class', {
            header: "class",
            cell: (props: { getValue: () => any; }) => <><span className={styles.ship_class}>{props.getValue()}</span></>
        }),
        columnHelper.accessor('title', {
            header: 'Название',
            cell: (props: { getValue: () => any; }) => <><span className={styles.ship_title}>{props.getValue()}</span></>
        }),
        {
            accessorKey: 'level',
            header: 'Уровень',
            cell: (props: any) => <><span className={styles.ship_level}>{int2roman(props.getValue())}</span></>
        },
        
        columnHelper.accessor('nation.color', {
            header: 'nation color',
            cell: (props: any) => <><span className={styles.ship_cColor}>{props.getValue()}</span></>
        }),
        columnHelper.accessor('country', {
            header: 'country',
            cell: (props: any) => <><span className={styles.ship_country}>{props.getValue()}</span></>
        }),
        columnHelper.accessor('nation.icons.large', {
            header: "флаг",
            cell: (props: any) => <> <img className={styles.ship_countryFlag} src={props.getValue()} width='100px' height='auto' alt="" />  </>
        }),
        columnHelper.accessor('type.icons.default', {
            header: "icons",
            cell: (props: any) => <> <img className={styles.ship_typeIcon} src={props.getValue()} width='3px' height='33px' alt="" />  </>
        }),
        columnHelper.accessor('description', {
            header: "Описание",
            cell: (props: any) => <> <p className={styles.ship_description} >{props.getValue()}</p></>
        }),
        
    ]



    const table = useReactTable({
        data,
        columns,

        getCoreRowModel: getCoreRowModel(),
        manualPagination: false,
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 5,
                pageIndex: 1
            }
        }

    });

    const trClickedHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        const tr = event.currentTarget;
        const desc = tr.querySelector('td > p')
        // setStyleAttribute(desc, 'visibility: visible')
        desc?.classList.add()
        // console.log(desc)
        // const regexp = /\*/
        // console.log(tr.querySelector())
        // tr.querySelector('td > p').classList.add('_description-show')
        
      };

   

    return (
        <div>
            <div className={styles.pagePagination}>
                <span>{table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
                </span>
                <select
                    className={styles.pageCounts}
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                    {[5, 10, 15, 20, 25, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
                <button
                    className="border rounded p-1"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </button>
            </div>

            <table >

                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}  style={{backgroundColor: row.original.nation.color+'22' }} onClick={trClickedHandler} content={row.original.nation.color} className={styles.shipContainer}>
                            
                            {row.getVisibleCells().map(cell => (
                                
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>


    )




}
export default ShipsTable;


function getFilteredRowModel(): ((table: import("@tanstack/react-table").Table<any>) => () => import("@tanstack/react-table").RowModel<any>) | undefined {
    throw new Error("Function not implemented.");
}

