import React, { useEffect, useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { MonacoEditor as MonacoType, editor } from 'monaco-types';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/hooks';
import { getQuery, fetchData, changeQuery, getChosenQuery } from '../../store/sandbox';

import { applySuggestions } from './suggestions';

export function Editor() {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const query = useSelector(getQuery);
  const chosenQuery = useSelector(getChosenQuery);
  const dispatch = useAppDispatch();
  const modelUri = 'a://b/foo.json';

  useEffect(() => {
    editorRef.current?.setValue(chosenQuery);
  }, [chosenQuery]);

  function handleEditorWillMount(monaco: MonacoType) {
    // here is the monaco instance
    // do something before editor is mounted

    applySuggestions(monaco, modelUri);
    // const model = monaco.editor.createModel(query, 'json', modelUri);
  }

  function handleEditorDidMount(e: editor.IStandaloneCodeEditor, monaco: MonacoType) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    editorRef.current = e;
    e.addAction({
      id: 'send-request',
      label: 'Send request',
      keybindings: [
        // eslint-disable-next-line no-bitwise
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      ],

      keybindingContext: undefined,
      contextMenuGroupId: 'help',
      contextMenuOrder: 1.5,
      run: () => { dispatch(fetchData()); },
    });
  }

  return (
    <MonacoEditor
      //   height="90vh"
      defaultLanguage="json"
      defaultValue={query}
      theme="vs-dark"
      path={modelUri}
      options={{
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        scrollbar: {
          alwaysConsumeMouseWheel: true,
        },
      }}
      onChange={(value) => dispatch(changeQuery(value || ''))}
      beforeMount={handleEditorWillMount}
      onMount={handleEditorDidMount}
    />

  );
}
