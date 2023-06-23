import { Command, MarkdownView, Editor } from 'obsidian';
import { MyPluginInterface } from "src/types";

// an editor command that can perform some operation on the current editor instance
export default (plugin: MyPluginInterface): Command => ({
  id: 'sample-editor-command',
  name: 'Sample editor command',
  editorCallback: (editor: Editor, view: MarkdownView) => {
    console.log(editor.getSelection());
    editor.replaceSelection('Sample Editor Command');
  }
});
