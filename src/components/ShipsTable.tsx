import { flexRender, getCoreRowModel, useReactTable, createColumnHelper } from "@tanstack/react-table";
import { useRequest } from "../hooks/useRequest"
import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { title } from "process";
import { IShipsData } from "../models/shipModel";
import { compose } from "@chakra-ui/utils";

import styles from "./ShipsTable.module.scss";


function ShipsTable() {
    
    const int2roman = (original: number): string => {
        if (original < 1 || original > 3999) {
          throw new Error('Error: Input integer limited to 1 through 3,999');
        }
      
        const numerals = [
          ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'], // 1-9
          ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'], // 10-90
          ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'], // 100-900
          ['M', 'MM', 'MMM'], // 1000-3000
        ];
      
        // TODO: Could expand to support fractions, simply rounding for now
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
    // const [data, setData] = useState(shipsData as unknown as IShipsData[])
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
            cell: (props: any) => <><span className={styles.ship_level}>{int2roman(props.getValue())}-й Уровень</span></> 
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

                    <tr  key={row.id} content={row.original.nation.color} className={styles.shipContainer}>
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


