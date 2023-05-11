import { Input, Kbd, Flex } from '@mantine/core';
import { spotlight } from '@mantine/spotlight';
import { IconSearch } from '@tabler/icons-react';

export function Search() {
    return (
        <Input
          icon={<IconSearch size="1rem" />}
          placeholder="Choose query"
          onClick={() => spotlight.open()}
          size="xs"
          rightSectionWidth={50}
          rightSection={
                <Flex align="center">
                    <Kbd size="xs">⌘</Kbd> + <Kbd size="xs">k</Kbd>
                </Flex>
            }
        />
    );
}
