import React from "react";
// import {
//     Column,
//     Table as ReactTable,
//     PaginationState,
//     useReactTable,
//     getCoreRowModel,
//     getPaginationRowModel,
//     flexRender,
//     createColumnHelper,
//     getSortedRowModel,
// } from "@tanstack/react-table";

import { useRequest } from "../hooks/useRequest"
import { useState } from "react";
import { IShipsData } from "../models/shipModel";
import Int2roman from "./Int2roman"
import Filters from "./Filters"

import styles from "./ShipsTable.module.scss";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,

    useReactTable,
    // getFilteredRowModel,
} from "@tanstack/react-table";

import { getFilteredRowModel as getFilteredRmodel } from "@tanstack/react-table";
import FilterPopoverLevel from "./filters/FilterPopoverLevel";
import { Box, Button, ButtonGroup, HStack, Icon, SelectField, Text } from "@chakra-ui/react";





function ShipsTable() {
    
    const data = useRequest() as unknown as IShipsData[];
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
            enableColumnFilter: true,
            filterFn: "includesString",
            cell: (props: { getValue: () => any; }) => <><span className={styles.ship_title}>{props.getValue()}</span></>
        }),
        columnHelper.accessor('level', {
            header: 'Уровень',
            enableColumnFilter: true,
            filterFn: (row, columnId, filterStatuses) => {
                const level = row.getValue(columnId)
                return filterStatuses.includes(level)
            },
            cell: (props: any) => <><span className={styles.ship_level}>{Int2roman(props.getValue())}</span></>
        }),
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
            cell: (props: any) => <> <p onClick={showDescription} className={descriptionIsActive ? styles.ship_description : styles.ship_descriptionShow} >{props.getValue()}</p></>
        }),
    ]
    const [columnFilters, setColumnFilters] = useState([

    ])
    const table = useReactTable({
        data,
        columns,
        manualPagination: false,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRmodel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            columnFilters
        },
        initialState: {
            pagination: {
                pageSize: 5,
                pageIndex: 0
            }
        }
    });

    const trClickedHandler = (event: React.MouseEvent<HTMLElement>) => {
        console.log()
        // const tr = event.currentTarget;
        // const desc = tr.querySelector('td > p')


    };
    const [descriptionIsActive, descriptionSetIsAcrive] = useState(true)
    const showDescription = () => {
        descriptionSetIsAcrive(current => !current);
    }
    const [isActive, setIsActive] = useState(true);

    const testFn = () => {
        setIsActive(current => !current);
        // alert('s')
        console.log()
    }


    return (
        <div>
            <HStack position={'absolute'} zIndex={999} className={styles.pagePaginations}>
                <Filters columnFilters={columnFilters}
                    setColumnFilters={setColumnFilters}
                />
                <Button onClickCapture={testFn} >Table Mode</Button>
                
                <Text>{table.getState().pagination.pageIndex + 1} / {table.getPageCount()}</Text>
                
                <SelectField
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
                </SelectField>
                
                <ButtonGroup>
                    <Button
                        className="border rounded p-1"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<'}
                    </Button>
                    <Button
                        className="border rounded p-1"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>'}
                    </Button>
                </ButtonGroup>

                
            </HStack>

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
                        <tr key={row.id} style={{ backgroundColor: row.original.nation.color + '22' }} onClick={trClickedHandler} content={row.original.nation.color} className={isActive ? styles.shipContainer : styles.shipTable}>

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

