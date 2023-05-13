import React from 'react';
import { Prism } from '@mantine/prism';
import { Center, Image, Stack, Text, Title, Button, LoadingOverlay, Box, Badge } from '@mantine/core';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/hooks';
import { getHits, getResponse, fetchData, getLoadingStatus, getAggs, getError, getTotalHits } from '../../store/sandbox';
import { HitsTable } from '../HitsTable/HitsTable';
import { Aggregations } from '../Aggregations/Aggregations';

export function ResponseSection({ responseMode }: { responseMode: string }) {
    const hits = useSelector(getHits);
    const totalHits = useSelector(getTotalHits);
    const response = useSelector(getResponse);
    const error = useSelector(getError);
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
                <>
                    {error ? (
                        <Center h="100%">
                            <Stack>
                                <Center>
                                    <Image width={150} src="./error.png" />
                                </Center>
                                <Text c="white">{error}</Text>
                            </Stack>
                        </Center>
                    ) : (
                        <Box p="sm">
                            <Badge mb={10} color="green" variant="light">Total hits: {totalHits}</Badge>
                            {aggs.length > 0 && (
                                <>
                                    <Title order={6}>Aggregations:</Title>
                                    <Aggregations aggregations={aggs} />
                                </>)}
                            {hits.length > 0 && (
                                <>
                                    <Title order={6}>Hits: {hits.length}</Title>
                                    <HitsTable hits={hits} />
                                </>)}
                        </Box>
                    )}
                </>)
            }
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
