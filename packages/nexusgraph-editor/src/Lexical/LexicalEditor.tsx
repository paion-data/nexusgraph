// Copyright 2023 Paion Data. All rights reserved.
import {LexicalComposer} from '@paiondata/lexical-react/LexicalComposer';
import {SharedHistoryContext} from '@paiondata/lexical-playground/context/SharedHistoryContext';
import { TableContext } from '@paiondata/lexical-playground/plugins/TablePlugin'
import { SharedAutocompleteContext } from '@paiondata/lexical-playground/context/SharedAutocompleteContext'
import { default as EditorNodes } from '@paiondata/lexical-playground/nodes/PlaygroundNodes'
import { default as EditorTheme } from '@paiondata/lexical-playground/themes/PlaygroundEditorTheme'
import Editor from '@paiondata/lexical-playground/Editor'
import Settings from '@paiondata/lexical-playground/Settings'

/**
 * {@link LexicalEditor} does not initialize editor contents.
 * @returns  
 */
export default function LexicalEditor(): JSX.Element {
  const initialConfig = {
    namespace: 'nexusgraph',
    nodes: [...EditorNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: EditorTheme,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <TableContext>
          <SharedAutocompleteContext>
            {/* <header>
              <a href="https://lexical.dev" target="_blank" rel="noreferrer">
                <img src={logo} alt="Lexical Logo" />
              </a>
            </header> */}
            <div className="editor-shell">
              <Editor />
            </div>
            <Settings />
            {/* {isDevPlayground ? <DocsPlugin /> : null}
            {isDevPlayground ? <PasteLogPlugin /> : null}
            {isDevPlayground ? <TestRecorderPlugin /> : null}

            {measureTypingPerf ? <TypingPerfPlugin /> : null} */}
          </SharedAutocompleteContext>
        </TableContext>
      </SharedHistoryContext>
    </LexicalComposer>
  );
}