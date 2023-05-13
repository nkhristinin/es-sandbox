import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDebouncedState, useLocalStorage } from '@mantine/hooks';
import { Input, MultiSelect, Box, Group, Switch, HoverCard, Text, CopyButton, Tooltip, ActionIcon } from '@mantine/core';
import { IconSearch, IconCheck, IconCopy } from '@tabler/icons-react';
import { Order } from '../../types';
import { getSortableField } from '../../types/mappings';

export function HitsTable({
    hits,
    onSort,
    handlePageChange,
    paginationTotalRows,
    handlePerRowsChange,
    handleSearch,
}: {
    hits: Order[]
        onSort: (column: any, sortDirection: string) => void,
        handlePageChange: (page: number) => void,
        handlePerRowsChange: (perPage: number, page: number) => void,
        paginationTotalRows: number,
        handleSearch: (search: string) => void,
}) {
    const [debounceSearch, setDebounceSearch] = useDebouncedState('', 200);
    const [selectedColumns, setSelectedColumns] = useLocalStorage({ key: 'hits-table', defaultValue: ['category', 'customer_full_name', 'email', 'order_date'] });
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (handleSearch) {
            handleSearch(debounceSearch);
        }
    }, [debounceSearch]);

    const columns = React.useMemo(() => [
        {
            field: 'category',
            name: 'Category',
        },
        {
            field: 'currency',
            name: 'Currency',
        },
        {
            field: 'customer_first_name',
            name: 'Customer First Name',
        },
        {
            field: 'customer_full_name',
            name: 'Customer Full Name',
        },
        {
            field: 'customer_gender',
            name: 'Customer gender',
        },
        {
            field: 'customer_id',
            name: 'Customer ID',
        },
        {
            field: 'customer_last_name',
            name: 'Customer Last Name',
        },
        {
            field: 'customer_phone',
            name: 'Customer Phone',
        },
        {
            field: 'day_of_week',
            name: 'Day of week',
        },
        {
            field: 'day_of_week_i',
            name: 'Day of week i',
        },
        {
            field: 'email',
            name: 'Email',
        },
        {
            field: 'manufacturer',
            name: 'Manufacturer',
        },
        {
            field: 'order_date',
            name: 'Order date',
        },
        {
            field: 'order_id',
            name: 'Order id',
        },
        // {
        //     field: 'products',
        //     name: 'Products',
        //     selector: row => row.products,
        //
        // },
        {
            field: 'sku',
            name: 'sku',
        },
        {
            field: 'taxful_total_price',
            name: 'Taxful total price',
        },
        {
            field: 'taxless_total_price',
            name: 'Taxless total price',
        },
        {
            field: 'total_quantity',
            name: 'Total quantity',
        },
        {
            field: 'total_unique_products',
            name: 'Total unique products',
        },
        {
            field: 'type',
            name: 'Type',
        },
        {
            field: 'user',
            name: 'User',
        },
        // {
        //     field: 'geoip',
        //     name: 'Geoip',
        //     selector: row => row.geoip,
        // },
        // {
        //     field: 'event',
        //     name: 'Event',
        //     selector: row => row.event,
        // },
    ].map(column => ({
        ...column,
        sortable: !!getSortableField(column.field),
        omit: !selectedColumns.includes(column.field),
        selector: (row: any) => row[column.field],
        cell: (row: any) => (
            <div>
                <HoverCard shadow="md">
                    <HoverCard.Target>
                        <div>{row[column.field]}</div>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                        <div>
                            {[row[column.field], column.field, `"${column.field}":"${row[column.field]}"`].map(item =>
                                <Group mb={4}>
                                    <Text size="xs" weight={500}>{item}</Text>
                                    <CopyButton value={item} timeout={2000}>
                                        {({ copied, copy }) => (
                                            <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                                                <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                                                    {copied ? <IconCheck size="0.75rem" /> : <IconCopy size="0.75rem" />}
                                                </ActionIcon>
                                            </Tooltip>
                                        )}
                                    </CopyButton>
                                </Group>)}
                        </div>
                    </HoverCard.Dropdown>
                </HoverCard>
            </div>),
    })), [getSortableField, selectedColumns]);

    const data = React.useMemo(() => hits, [hits]);
    const style = {
        style: {
            backgroundColor: '#1a1b1e',
            color: 'rgb(193, 194, 197)',
        },
    };
    const customStyles = {
        table: style,
        header: style,
        pagination: style,
        headRow: {
            style: {
                ...style.style,
                fontWeight: 'bold',
            },
        },
        rows: style,
    };

    const optionalParams: any = {
    };

    if (onSort) {
        optionalParams.onSort = onSort;
        optionalParams.sortServer = true;
    }

    if (handlePageChange) {
        optionalParams.pagination = true;
        optionalParams.paginationServer = true;
        optionalParams.onChangePage = handlePageChange;
        optionalParams.paginationTotalRows = paginationTotalRows;
        optionalParams.onChangeRowsPerPage = handlePerRowsChange;
    }

    return (
        <>
            <Box m={16}>
                <Group mb={16}>
                    {typeof handleSearch === 'function' && (
                        <Input
                          w={300}
                          size="sm"
                          icon={<IconSearch size="1rem" />}
                          placeholder="Search..."
                          onChange={(event) => setDebounceSearch(event.currentTarget.value)}
                        />)}
                    <Switch checked={checked} onChange={(event) => setChecked(event.currentTarget.checked)} label="Columns confuguration" />
                </Group>
                {
                    checked && (<MultiSelect
                      w="50%"
                      data={columns.map(column => ({ value: column.field, label: column.name }))}
                      value={selectedColumns}
                      onChange={setSelectedColumns}
                    />)
                }
            </Box>

            <DataTable
              columns={columns}
              data={data}
              customStyles={customStyles}
              theme="dark"
              persistTableHead
              {...optionalParams}
            />
        </>
    );
}
