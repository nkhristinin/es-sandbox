/* eslint-disable no-template-curly-in-string */

import { MonacoEditor } from 'monaco-types';

const matchByField = `"match":  { 
  "\${1:field}": "\${2:value}"
}`;

function createDependencyProposals(monaco: MonacoEditor, range:any) {
    // returning a static list of proposals, not even looking at the prefix (filtering is done by the Monaco editor),
    // here you could do a server side lookup
    return [
        {
            label: '"match-by-field"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: 'The Lodash library exported as Node.js modules.',
            insertText: matchByField,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
        },
    ];
}

export function applySuggestions(monaco: MonacoEditor, modelUri:string) {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas: [
            {
                uri: 'http://myserver/foo-schema.json', // id of the first schema
                fileMatch: [modelUri.toString()], // associate with our model
                schema: {
                    type: 'object',
                    properties: {
                        query: {
                            type: 'object',
                            properties: {
                                match: {
                                    type: 'object',
                                    patternProperties: {
                                        '^.*$': {
                                            type: 'object',
                                            properties: {
                                                allo: {
                                                    type: 'string',
                                                },
                                            },
                                        },
                                      },
                                },
                                match_all: {
                                    type: 'object',
                                },
                            },
                        },
                        sort: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                },
                            },
                        },
                        size: {
                            type: 'number',
                        },
                        from: {
                            type: 'number',
                        },
                        _source: {
                            type: 'object',
                            properties: {
                                includes: {
                                    type: 'array',
                                    items: {
                                        type: 'string',
                                    },
                                },
                                excludes: {
                                    type: 'array',
                                    items: {
                                        type: 'string',
                                    },
                                },
                            },
                        },
                        aggs: {
                            type: 'object',
                        },
                    },
                },
            },
        ],
    });

    monaco.languages.registerCompletionItemProvider('json', {
        provideCompletionItems(model, position) {
            // find out if we are completing a property in the 'dependencies' object.
            const textUntilPosition = model.getValueInRange({
                startLineNumber: 1,
                startColumn: 1,
                endLineNumber: position.lineNumber,
                endColumn: position.column,
            });
            const match = textUntilPosition.match(
                /"query"\s*:\s*\{\s*("[^"]*"\s*:\s*"[^"]*"\s*,\s*)*([^"]*)?$/
            );
            if (!match) {
                return { suggestions: [] };
            }
            const word = model.getWordUntilPosition(position);
            const range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endColumn: word.endColumn,
            };
            return {
                suggestions: createDependencyProposals(monaco, range),
            };
        },
    });
}
