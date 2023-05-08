import { createStyles } from '@mantine/core';
import { OriginalData } from '../../components/OriginalData/OriginalData';
import { ResponseSection } from '../../components/ResponseSection/ResponseSection';
import { Editor } from '../../components/Editor/Editor';

const useStyles = createStyles(() => ({
    grid: {
        height: 'calc(100vh - 60px)',
        display: 'grid',
        'grid-template-columns': '1fr 2fr',
        'grid-template-rows': '1fr 1fr',
        'grid-template-areas': `
            "request data"
            "request response"`,
    },
    request: {
        'grid-area': 'request',
        'border-right': '1px solid rgb(52, 52, 52)',
    },
    data: {
        'grid-area': 'data',
        overflow: 'scroll',
        'border-bottom': '1px solid rgb(52, 52, 52)',
    },
    response: { 'grid-area': 'response', overflow: 'scroll' },
}));

export default function Sandbox() {
    const { classes } = useStyles();

    return (
        <div className={classes.grid}>
            <div className={classes.request}>
                <Editor />

            </div>
            <div className={classes.data}>
                <OriginalData />
            </div>
            <div className={classes.response}>
                <ResponseSection />
            </div>
        </div>
    );
}
