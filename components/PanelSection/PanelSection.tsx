import React from 'react';
import { createStyles, Title, Group } from '@mantine/core';
import { Top } from 'react-spaces';

const useStyles = createStyles(() => ({

    container: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        height: '100%',
    },
    sectionTitle: {
        borderBottom: '1px solid rgb(52, 52, 52)',
        paddingLeft: '8px',
        paddingRight: '8px',
    },
}));

export function PanelSection({ children, title }: { children?: React.ReactNode, title: string }) {
    const { classes } = useStyles();
    return (
        <Top size={40} className={classes.sectionTitle}>
            <div className={classes.container}>
                <Group w="100%" position="apart">
                    <Title c="white" order={6}>{title}</Title>
                    {children}
                </Group>
            </div>
        </Top>
    );
}
