import { Editor, EditorSelection } from "obsidian";

class SwapCheckboxStatus {
  editor: Editor;

  constructor(editor: Editor) {
    this.editor = editor;
  }

  swap(target: string) {
    const selections = this.editor.listSelections();
    selections.forEach((selection, index) => {
      this.toggleSelectionOrLine(selection, target)
    });
  }

  toggleSelectionOrLine(selection: EditorSelection, target: string) {
    if ((selection.anchor.line === selection.head.line) && (selection.anchor.ch === selection.head.ch)) {
      this.toggleLine(selection.anchor.line, target);
    } else {
      this.toggleSelection(selection, target);
    }
  }

  toggleLine(line: number, target: string) {
    const original = this.editor.getLine(line);
    const regex = /^(\s*[-*]\s)\[[^\]]\]?(.*)$/gm
    const replacement = original.replace(regex, `$1[${target}]$2`)
    this.editor.setLine(line, replacement);
  }

  toggleSelection(selection: EditorSelection, target: string) {
    const original = this.editor.getRange(selection.anchor, selection.head);
    const regex = /^(\s*[-*]\s)\[[^\]]\]?(.*)$/gm
    const replacement = original.replace(regex, `$1[${target}]$2`);
    this.editor.replaceRange(replacement, selection.anchor, selection.head);
  }
}

export default SwapCheckboxStatus;
