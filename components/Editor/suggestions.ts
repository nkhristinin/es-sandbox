/* eslint-disable no-template-curly-in-string */

import { MonacoEditor } from 'monaco-types';

const matchByField = `"match":  { 
    '"\${1:field}": "\${2:value}"'
}`;

function createDependencyProposals(monaco: MonacoEditor, range:any) {
    // returning a static list of proposals, not even looking at the prefix (filtering is done by the Monaco editor),
    // here you could do a server side lookup
    return [
        {
            label: '"match-byfield"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: 'The Lodash library exported as Node.js modules.',
            insertText: matchByField,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
        },
        {
            label: '"express"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: 'Fast, unopinionated, minimalist web framework',
            insertText: '"express": "*"',
            range,
        },
        {
            label: '"mkdirp"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: 'Recursively mkdir, like <code>mkdir -p</code>',
            insertText: '"mkdirp": "*"',
            range,
        },
        {
            label: '"my-third-party-library"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: 'Describe your library here',
            insertText: '"${1:my-third-party-library}": "${2:1.2.3}"',
            insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
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
                                    properties: {
                                        field: {
                                            type: 'object',
                                            properties: {},
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
                                    field3: {
                                        type: 'object',
                                        properties: {
                                            order: {
                                                type: 'string',
                                                enum: ['asc', 'desc'],
                                            },
                                        },
                                        required: ['order'],
                                    },
                                },
                                required: ['field3'],
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
                            properties: {
                                agg1: {
                                    type: 'object',
                                    properties: {
                                        terms: {
                                            type: 'object',
                                            properties: {
                                                field4: {
                                                    type: 'string',
                                                },
                                            },
                                            required: ['field4'],
                                        },
                                    },
                                    required: ['terms'],
                                },
                            },
                        },
                    },
                },
            },
            {
                uri: 'http://myserver/bar-schema.json', // id of the second schema
                schema: {
                    type: 'object',
                    properties: {
                        q1: {
                            enum: ['x1', 'x2'],
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
