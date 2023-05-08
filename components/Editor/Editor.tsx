import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/hooks';
import { getQuery, changeQuery } from '../../store/sandbox';
import { applySuggestions } from './suggestions';

export function Editor() {
    const query = useSelector(getQuery);
    const dispatch = useAppDispatch();
    const modelUri = 'a://b/foo.json';

    function handleEditorWillMount(monaco:any) {
    // here is the monaco instance
    // do something before editor is mounted

    applySuggestions(monaco, modelUri);

    // const model = monaco.editor.createModel(query, 'json', modelUri);
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
        />

    );
}
