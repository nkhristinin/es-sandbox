import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/hooks';
import { getHits, fetchOriginalData, getLoadingStatus } from '../../store/originalData';
import { HitsTable } from '../HitsTable/HitsTable';

export function OriginalData() {
    const hits = useSelector(getHits);
    const loadingStatus = useSelector(getLoadingStatus);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (loadingStatus === 'idle') {
            dispatch(fetchOriginalData());
        }
    }, [fetchOriginalData, loadingStatus]);

    return (
        <>
                <HitsTable hits={hits} />
        </>
    );
}
