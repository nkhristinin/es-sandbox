import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LoadingOverlay } from '@mantine/core';
import { useAppDispatch } from '../../store/hooks';
import {
    getHits,
    fetchOriginalData,
    getLoadingStatus,
    getSort,
    changeSort,
    getTotalHits,
    getPerPage,
    changePage,
    changePerPage,
    getPaginationFrom,
    changeSearch,
    getSearch,
} from '../../store/originalData';
import { HitsTable } from '../HitsTable/HitsTable';
import { getSortableField } from '../../types/mappings';

export function OriginalData() {
    const hits = useSelector(getHits);
    const loadingStatus = useSelector(getLoadingStatus);
    const dispatch = useAppDispatch();
    const sort = useSelector(getSort);
    const totalHits = useSelector(getTotalHits);
    const perPage = useSelector(getPerPage);
    const paginationFrom = useSelector(getPaginationFrom);
    const search = useSelector(getSearch);

    useEffect(() => {
        dispatch(fetchOriginalData());
    }, [fetchOriginalData, sort?.field, sort?.order, paginationFrom, perPage, search]);

    const onSort = (column: any, sortDirection: string) => {
        dispatch(changeSort({
            field: getSortableField(column.field),
            order: sortDirection,
        }));
    };

    const handlePageChange = (page: number) => {
        dispatch(changePage(page));
    };

    const handlePerRowsChange = (newPerPage: number, page: number) => {
        dispatch(changePerPage(newPerPage));
        dispatch(changePage(page));
    };

    const handleSearch = (newSearch:string) => {
        dispatch(changeSearch(newSearch));
    };

    return (
        <>
            <LoadingOverlay visible={loadingStatus === 'pending'} overlayBlur={2} />
            <HitsTable
              hits={hits}
              onSort={onSort}
              paginationTotalRows={totalHits}
              handlePageChange={handlePageChange}
              handlePerRowsChange={handlePerRowsChange}
              handleSearch={handleSearch}
            />
        </>
    );
}
