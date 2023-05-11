import React from 'react';
import { useSelector } from 'react-redux';
import { Header as MantineHeader, Group, Image, Text, CopyButton, Tooltip, Button } from '@mantine/core';
import { IconCopy } from '@tabler/icons-react';
import { getBase64Query } from '../../store/sandbox';
import { Search } from '../Search/Search';

export function Header() {
    const base64Query = useSelector(getBase64Query);
    const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';
    return (
        <MantineHeader height={60} p="xs">
            <Group position="apart">
                <Group position="left">
                    <Image width={30} height={30} src="./logo.png" alt="Logo" />
                    <Text c="white">Elasticsearch Sandbox</Text>
                </Group>
                <Group position="right">
                    <Search />
                    <CopyButton
                      value={`${origin}/sandbox/${base64Query}`}
                      timeout={2000}
                    >
                        {({ copied, copy }) => (
                            <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                                <Button variant="outline" size="xs" leftIcon={<IconCopy size="1rem" />} onClick={copy}>
                                    Share
                                </Button>
                            </Tooltip>
                        )}
                    </CopyButton>
                </Group>
            </Group>
        </MantineHeader>
    );
}
