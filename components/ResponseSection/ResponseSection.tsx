import React from 'react';
import { Prism } from '@mantine/prism';
import { Center, Image, Stack, Text, Button, LoadingOverlay } from '@mantine/core';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/hooks';
import { getHits, getResponse, fetchData, getLoadingStatus } from '../../store/sandbox';
import { HitsTable } from '../HitsTable/HitsTable';

export function ResponseSection({ responseMode }: { responseMode: string }) {
    const hits = useSelector(getHits);
    const response = useSelector(getResponse);
    const loadingStatus = useSelector(getLoadingStatus);
    const dispatch = useAppDispatch();

    if (loadingStatus === 'idle') {
        return (
            <Center h="100%">
                <Stack>
                    <Center>
                        <Image width={100} src="./search.png" />
                    </Center>
                    <Text>No data to show you yet</Text>
                    <Button onClick={() => { dispatch(fetchData()); }}> Send request</Button>
                </Stack>
            </Center>
        );
    }

    return (
        <>
            <LoadingOverlay visible={loadingStatus === 'pending'} overlayBlur={2} />
            {responseMode === 'preview' && (<HitsTable hits={hits} />)}
            {responseMode === 'json' && (
                <Prism
                  language="json"
                  withLineNumbers
                >
                    {JSON.stringify(response, null, 2)}
                </Prism>)}

        </>
    );
}
