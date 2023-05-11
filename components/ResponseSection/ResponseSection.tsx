import React from 'react';
import { Prism } from '@mantine/prism';
import { Center, Image, Stack, Text, Title, Button, LoadingOverlay, Box } from '@mantine/core';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/hooks';
import { getHits, getResponse, fetchData, getLoadingStatus, getAggs } from '../../store/sandbox';
import { HitsTable } from '../HitsTable/HitsTable';
import { Aggregations } from '../Aggregations/Aggregations';

export function ResponseSection({ responseMode }: { responseMode: string }) {
    const hits = useSelector(getHits);
    const response = useSelector(getResponse);
    const loadingStatus = useSelector(getLoadingStatus);
    const aggs = useSelector(getAggs);
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
            {responseMode === 'preview' && (
                <Box p="sm">
                    {aggs.length > 0 && (
                        <>
                            <Title order={6}>Aggregations:</Title>
                            <Aggregations aggregations={aggs} />
                        </>)}
                    {hits.length > 0 && (
                        <>
                            <Title order={6}>Hits:</Title>
                            <HitsTable hits={hits} />
                        </>)}
                </Box>)}
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
