import React from 'react';
import { Table } from '@mantine/core';
import { useTable, Column } from 'react-table';
import { Order } from '../../types';

export function HitsTable({
    hits,
}: {
    hits: Order[]
}) {
    const columns:Column[] = React.useMemo(() =>
        [
            {
                Header: 'Category',
                accessor: 'category',
            },
            {
                Header: 'Currency',
                accessor: 'currency',
            },
            // {
            //     Header: 'Customer First Name',
            //     accessor: 'customer_first_name',
            // },
            {
                Header: 'Customer Full Name',
                accessor: 'customer_full_name',
            },
            // {
            //     Header: 'Customer gender',
            //     accessor: 'customer_gender',
            // },
            // {
            //     Header: 'Customer ID',
            //     accessor: 'customer_id',
            // },
            // {
            //     Header: 'Customer Last Name',
            //     accessor: 'customer_last_name',
            // },
            // {
            //     Header: 'Customer Phone',
            //     accessor: 'customer_phone',
            // },
            // {
            //     Header: 'Day of week',
            //     accessor: 'day_of_week',
            // },
            // {
            //     Header: 'Day of week i',
            //     accessor: 'day_of_week_i',
            // },
            {
                Header: 'Email',
                accessor: 'email',
            },
            // {
            //     Header: 'Manufacturer',
            //     accessor: 'manufacturer',
            // },
            // {
            //     Header: 'Order date',
            //     accessor: 'order_date',
            // },
            // {
            //     Header: 'Order id',
            //     accessor: 'order_id',
            // },
            // {
            //     Header: 'Products',
            //     accessor: 'products',
            // },
            // {
            //     Header: 'sku',
            //     accessor: 'sku',
            // },
            {
                Header: 'Taxful total price',
                accessor: 'taxful_total_price',
            },
            {
                Header: 'Taxless total price',
                accessor: 'taxless_total_price',
            },
            {
                Header: 'Total quantity',
                accessor: 'total_quantity',
            },
            // {
            //     Header: 'Total unique products',
            //     accessor: 'total_unique_products',
            // },
            // {
            //     Header: 'Type',
            //     accessor: 'type',
            // },
            // {
            //     Header: 'User',
            //     accessor: 'user',
            // },
            // {
            //     Header: 'Geoip',
            //     accessor: 'geoip',
            // },
            // {
            //     Header: 'Event',
            //     accessor: 'event',
            // },
        ], []);

    const data = React.useMemo(() => hits, [hits]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    });

    return (

        <Table {...getTableProps()} verticalSpacing="xs" fontSize="xs">
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
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => <td {...cell.getCellProps()}>{cell.render('Cell')}</td>)}
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
}
