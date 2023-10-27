import { flexRender, getCoreRowModel, useReactTable, createColumnHelper } from "@tanstack/react-table";
import { useRequest } from "../hooks/useRequest"
import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { title } from "process";
import { IShipsData } from "../models/shipModel";



function ShipsTable() {
    const shipsData = useRequest();
    // const [data, setData] = useState(shipsData as unknown as IShipsData[])
    const data = shipsData as unknown as IShipsData[];
    const columnHelper = createColumnHelper<IShipsData>()
    const columns = [
        columnHelper.accessor('image' , {
            header: "image",
            cell: (props: any) => <> <img src={props.getValue()} width='100px' height='20px' alt="" />  </>

        }),
        columnHelper.accessor('class', {
            header: "class",
            cell: (props: { getValue: () => any; }) => props.getValue()

        }),


        columnHelper.accessor('title', {
            header: 'Название',
            cell: (props: { getValue: () => any; }) => props.getValue()
        }),
        {
            accessorKey: 'level',
            header: 'Уровень',
            cell: (props: any) => props.getValue()
        },
        columnHelper.accessor('nation.color',{
            header: 'nation color',
            cell: (props: any) => props.getValue()
        }),
        columnHelper.accessor('country', {
            header: 'country',
            cell: (props: any) => props.getValue()

        })
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (

        <table>
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
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
            
        </table>

    )




}
export default ShipsTable;


