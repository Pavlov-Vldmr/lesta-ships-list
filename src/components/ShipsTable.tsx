import React from "react";

import { useRequest } from "../hooks/useRequest"
import { useState } from "react";
import { IShipsData } from "../models/shipModel";
import Int2roman from "./Int2roman"
import Filters from "./Filters"

import styles from "./ShipsTable.module.scss";
import {
    Sorting,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { getFilteredRowModel as getFilteredRmodel } from "@tanstack/react-table";
import { Box, Button, ButtonGroup, HStack, Text, Table, Tr, Th, Thead, Tbody, Td,  Select } from "@chakra-ui/react";

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
            footer: props => props.column.id,
            cell: (props: { getValue: () => any; }) => <><span className={styles.ship_title}>{props.getValue()}</span></>
        }),
        columnHelper.accessor('level', {
            header: 'Уровень',
            enableColumnFilter: true,
            footer: props => props.column.id,
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
        columnHelper.accessor('flag', {
            header: "флаг",
            cell: (props: any) => <> <img className={styles.ship_countryFlag} src={props.getValue()} width='100px' height='auto' alt="" />  </>
        }),
        columnHelper.accessor('type.icons.default', {
            header: "class icons",
            cell: (props: any) => <> <img className={styles.ship_typeIcon} src={props.getValue()} width='37px' height='33px' alt="" />  </>
        }),
        columnHelper.accessor('contour', {
            header: "contour",
            cell: (props: any) => <> <img className={styles.ship_contour} src={props.getValue()} width='200px' height='auto' alt="" />  </>
        }),
        columnHelper.accessor('description', {
            header: "Описание",
            cell: (props: any) => <> <p title='Описание' className={styles.ship_description} >{props.getValue()}</p></>
        }),

    ]
    const [columnFilters, setColumnFilters] = useState([])
    const table = useReactTable({
        data,
        columns,
        manualPagination: false,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRmodel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            columnFilters,
        },

        initialState: {
            pagination: {
                pageSize: 5,
                pageIndex: 0
            }
        }
    });

    const trClickedHandler = (event: React.MouseEvent<HTMLElement>) => {
        const tr = event.currentTarget;
        const desc = tr.querySelectorAll('td > p') as unknown as HTMLCollectionOf<HTMLElement>
        const show = (tr: any, desc: any) => {
            desc[0].style.display = "flex"
            const heightDesc = desc[0].clientHeight
            tr.style.height = heightDesc + 150 + 'px'
            setTimeout(() => {
                desc[0].style.opacity = "1"
            }, 250);
            tr.classList.add('ship_descriptionShow')
        }
        const hide = (tr: EventTarget & HTMLElement, desc: any) => {
            desc[0].style.opacity = "0"
            tr.classList.remove('ship_descriptionShow')
            setTimeout(() => {
                desc[0].style.display = "none"
                tr.style.height = '100px'
            }, 300);
        }
        const showHide = (tr: any, desc: any) => {
            if (tr.classList.contains('ship_descriptionShow')) {
                return hide(tr, desc)
            };
            show(tr, desc)
        }
        const showHideTableMode = (desc: any) => {
            if (desc[0].classList.contains('_show')) {
                desc[0].style.webkitLineClamp = '3'
                desc[0].classList.remove('_show')
            } else {
                desc[0].style.webkitLineClamp = 'inherit'
                desc[0].classList.add('_show')
            }
        }

        if (isActive) {
            showHide(tr, desc)
        } else {
            showHideTableMode(desc)
        }
    };

    const [isActive, setIsActive] = useState(true);
    const toTableSwitch = () => {
        const allTr = document.querySelectorAll('tr')
        let arrayTr = Array.from(allTr)
        console.log(arrayTr)
        arrayTr.map(el => {
            console.log(el)
            el.style.height = '100px'
            el.classList.remove('ship_descriptionShow')
        })
        setIsActive(current => !current);
    }

    const customSorting = (filter: any, a: string) => {
        if (filter != null) { return filter.getToggleSortingHandler() }
        if (a != '') {
            return (
                filter = table.getAllColumns().find((f: { id: any }) => f.id === a),
                filter.getToggleSortingHandler()
            )
        }
    }


    return (
        <>

            <Box className={isActive ? styles.container : styles.container_table} h="fit-content" bg="#0b344df5" padding="15px" boxShadow="0 0 18px 10px rgba(0,0,0,.13)">
                <HStack position={'relative'} zIndex={999} className={styles.pagePaginations}>
                    <Filters columnFilters={columnFilters}
                        setColumnFilters={setColumnFilters}
                    />
                    <Button cursor={'pointer'} onClickCapture={toTableSwitch}>Table Mode</Button>
                    <Text w="100px" textAlign='center'>{table.getState().pagination.pageIndex + 1} / {table.getPageCount()}</Text>
                    <Select
                    cursor='pointer'
                        w={150}
                        className={styles.pageCounts}
                        value={table.getState().pagination.pageSize}
                        onChange={e => {
                            table.setPageSize(Number(e.target.value))
                        }}
                    >
                        {[5, 10, 15, 20, 25, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Показать {pageSize}
                            </option>
                        ))}
                    </Select>
                    <ButtonGroup>
                        <Button
                            cursor={'pointer'}
                            className="border rounded p-1"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            {'<'}
                        </Button>
                        <Button
                            cursor={'pointer'}
                            className="border rounded p-1"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            {'>'}
                        </Button>
                        <Button cursor={'pointer'} onClick={customSorting(null, 'title')}>{'Название'}</Button>
                        <Button cursor={'pointer'} onClick={customSorting(null, 'level')}>{'Уровень'}</Button>
                        <Button cursor={'pointer'} onClick={customSorting(null, 'country')}>{'Страна'}</Button>
                    </ButtonGroup>


                </HStack>

                <Table width={"700px"} className={styles.table_} style={{ borderCollapse: 'separate' }}>
                    <Thead w={300}>
                        {table.getHeaderGroups().map(headerGroup => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <Th key={header.id}
                                        cursor={'pointer'}
                                        onClick={customSorting(header.column, '')}
                                        className={styles.tableTh}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        {{
                                            asc: ' 🔼',
                                            desc: ' 🔽',
                                        }[header.column.getIsSorted() as string] ?? null}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {table.getRowModel().rows.map(row => (
                            <Tr key={row.id}
                                bgGradient='linear(-90deg, rgba(16,17,30,1) 0%, rgba(9,9,121,0) 58%, rgba(0,212,255,0) 100%)'
                                backgroundColor={row.original.nation.color + '22'}
                                onClick={trClickedHandler}
                                className={styles.shipContainer}>
                                {row.getVisibleCells().map(cell => (
                                    <Td key={cell.id} className={styles.tableTd}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </>


    )




}
export default ShipsTable;


function getFilteredRowModel(): ((table: import("@tanstack/react-table").Table<any>) => () => import("@tanstack/react-table").RowModel<any>) | undefined {
    throw new Error("Function not implemented.");
}

function sorting() {
    throw new Error("Function not implemented.");
}

