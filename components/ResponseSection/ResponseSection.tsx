import React from 'react';
import { Container } from '@mantine/core';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/hooks';
import { getHits, fetchData } from '../../store/sandbox';
import { HitsTable } from '../HitsTable/HitsTable';

export function ResponseSection() {
    const hits = useSelector(getHits);
    const dispatch = useAppDispatch();

    return (
        <Container>
            <button
              type="button"
              onClick={() => {
                dispatch(fetchData());
            }}
            > Fetch
            </button>
            <HitsTable hits={hits} />
        </Container>
    );
}
