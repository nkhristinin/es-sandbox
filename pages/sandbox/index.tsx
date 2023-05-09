import { useState } from 'react';
import { createStyles, Button, SegmentedControl, Box, Center, ActionIcon } from '@mantine/core';
import { LeftResizable, Fill, TopResizable, ViewPort, Top, SSR, Bottom } from 'react-spaces';
import { IconEye, IconCode, IconLayoutNavbarExpand, IconLayoutNavbarCollapse } from '@tabler/icons-react';

import { OriginalData } from '../../components/OriginalData/OriginalData';
import { ResponseSection } from '../../components/ResponseSection/ResponseSection';
import { Header } from '../../components/Header/Header';
import { Editor } from '../../components/Editor/Editor';
import { useAppDispatch } from '../../store/hooks';
import { fetchData } from '../../store/sandbox';
import { PanelSection } from '../../components/PanelSection/PanelSection';

const useStyles = createStyles(() => ({
    data: { borderTop: '2px solid rgb(52, 52, 52)' },
    response: { borderTop: '2px solid rgb(70 70 70)' },
    editor: { borderRight: '2px solid rgb(52, 52, 52)', borderTop: '2px solid rgb(52, 52, 52)' },
    sectionTitle: {
        borderBottom: '1px solid rgb(52, 52, 52)',
        paddingLeft: '8px',
        paddingTop: '8px',
        paddingRight: '8px',
    },
}));

export default function Sandbox() {
    const { classes } = useStyles();
    const dispatch = useAppDispatch();
    const [responseMode, setResponseMode] = useState('preview');
    const [isCollapse, setIsCollapse] = useState(false);

    return (
        <>
            <SSR />
            <ViewPort>
                <Top size={60}>
                    <Header />
                </Top>

                <Fill>
                    <LeftResizable size={400} className={classes.editor}>
                        <PanelSection title="Request">
                            <Button
                              compact
                              size="xs"
                              onClick={() => { dispatch(fetchData()); }}
                            >Send
                            </Button>
                        </PanelSection>

                        <Fill scrollable>
                            <Editor />
                        </Fill>
                    </LeftResizable>
                    <Fill>
                        <TopResizable
                          minimumSize={40}
                          size={isCollapse ? '40px' : '40%'}
                          className={classes.data}
                          onResizeEnd={value => {
                                if (value === 40) {
                                    setIsCollapse(true);
                                } else {
                                    setIsCollapse(false);
                                }
                            }}
                        >
                            <PanelSection title="Original Data">
                                <ActionIcon
                                  onClick={() => { setIsCollapse(!isCollapse); }}
                                >
                                    {isCollapse ?
                                        <IconLayoutNavbarExpand size="1.125rem" /> : <IconLayoutNavbarCollapse size="1.125rem" />}
                                </ActionIcon>

                            </PanelSection>

                            <Fill scrollable>
                                <OriginalData />
                            </Fill>
                            <Bottom size={10} />
                        </TopResizable>
                        <Fill className={classes.response}>

                            <PanelSection title="Response">
                                <SegmentedControl
                                  onChange={setResponseMode}
                                  defaultValue="preview"
                                  size="xs"
                                  data={[
                                        {
                                            value: 'preview',
                                            label: (
                                                <Center>
                                                    <IconEye size="1rem" />
                                                    <Box ml={10}>Preview</Box>
                                                </Center>
                                            ),
                                        },
                                        {
                                            value: 'json',
                                            label: (
                                                <Center>
                                                    <IconCode size="1rem" />
                                                    <Box ml={10}>JSON</Box>
                                                </Center>
                                            ),
                                        },
                                    ]}
                                />
                            </PanelSection>
                            <Fill scrollable>
                                <ResponseSection responseMode={responseMode} />
                            </Fill>
                            <Bottom size={10} />
                        </Fill>
                    </Fill>
                </Fill>
            </ViewPort>
        </>
    );
}
