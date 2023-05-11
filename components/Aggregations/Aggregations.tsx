import { Paper, Space, Badge } from '@mantine/core';
import { Aggregation } from '../../types';

export function BucketAggregations({ aggregation }: { aggregation: Aggregation }) {
    return (
        <div>
            {aggregation?.buckets.map((bucket: any) => (
                <>
                    <Paper shadow="sm" p="sm" withBorder>
                        <div>key: {bucket?.key}</div>
                        <div>doc_count: {bucket?.doc_count}</div>
                    </Paper>
                    <Space h="xs" />
                </>
            ))}
        </div>);
}

export function MetricAggregations({ aggregation }: { aggregation: Aggregation }) {
    return (
        <>
            <Paper shadow="sm" p="sm" withBorder>
                <div>value: {aggregation?.value}</div>
            </Paper>
            <Space h="xs" />
        </>);
}

export function Aggregations({ aggregations }: { aggregations: Aggregation[] }) {
    return (
        <div>
            {aggregations.map(aggregation => (
                <div>
                    <Badge variant="outline">{aggregation.name}</Badge>
                    <Space h="xs" />
                    {aggregation.type === 'bucket' && (<BucketAggregations aggregation={aggregation} />)}
                    {aggregation.type === 'metric' && (<MetricAggregations aggregation={aggregation} />)}
                </div>))}
        </div>
    );
}
