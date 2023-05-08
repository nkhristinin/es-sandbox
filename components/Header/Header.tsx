import React from 'react';
import { Header as MantineHeader, Group, Image, Text } from '@mantine/core';

export function Header() {
    return (
        <MantineHeader height={60} p="xs">
            <Group position="left">
                <Image width={30} height={30} src="./logo.png" alt="Logo" />
                <Text c="white">Elasticsearch Sandbox</Text>
            </Group>
        </MantineHeader>
    );
}
