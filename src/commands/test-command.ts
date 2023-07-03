import { Command, MarkdownView, Editor } from 'obsidian';
import { MyPluginInterface } from "src/types";

// an editor command that can perform some operation on the current editor instance
export default (plugin: MyPluginInterface): Command => ({
  id: 'test-command',
  name: 'test command',
  editorCallback: (editor: Editor, view: MarkdownView) => {
    const currentLine = editor.getCursor().line;
    const text = editor.getLine(currentLine);
    console.log(text);

    const regex = /^(\s*[-*]\s)\[[^\]]\]?(.*)$/
    const match = text.match(regex);
    if (match) {
      const newText = text.replace(regex, "$1[>]$2")
      console.log(newText);
      editor.setLine(currentLine, newText);
    } else {
      console.log('not a todo')
    }
  }
});
