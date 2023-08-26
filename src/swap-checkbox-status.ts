import { Editor, EditorSelection } from "obsidian";

class SwapCheckboxStatus {
  editor: Editor;

  // matches a checklist item:
  // start of a line; any amount of whitespace or `>` characters (for callouts);
  // then a dash or asterix for a bullet point, a single whitespace, then square bracket syntax
  // for the checkbox; followed by any remaining characters til the end of the line.
  // 1st capturing group = everything before the checkbox
  // 2nd capturing group = everything after the checkbox
  public static readonly taskRegex = /^([\s>]*[-*]\s)\[[^\]]\]?(.*)$/gm;

  // matches a line that is not a checklist
  // negative lookahead - ignore headings
  // negative lookahead - make sure line isn't blank
  // 1st capturing group
  // - match any amount of indentation or whitespace, and blockquote markers
  // 2nd capturing group
  // - optional unordered list marker (dash or asterix), or ordered list marker
  // 3rd capturing group
  // - matches content of length 0..n
  // - includes a negative lookahead to ensure this isn't a task already
  // - uses a non-capturing group to encapsulate the negative lookahead with the any character operator
  public static readonly nonTaskRegex = /(?!^#+)(?!^\s*$)^([\s>]*)((?:[-*]|[0-9]+\.)\s)?((?:(?!\[[^\]]\].*).)*)$/gm

  // TODO: on single-line selections, should headings be transformed into tasks? (strip out heading)?
  // TODO: if the start of a selection isn't the start of the line, extend it?
  // TODO: ignore certain types of blocks -- like comment blocks and code blocks

  // QUESTION: Is it better to process line by line, or do selections?


  // matches a blank line
  public static readonly blankLineRegex = /^\s*$/gm;

  constructor(editor: Editor) {
    this.editor = editor;

  }

  swap(target: string) {
    const selections = this.editor.listSelections();
    selections.forEach((selection) => {
      this.toggleSelectionOrLine(selection, target)
    });
  }

  toggleSelectionOrLine(selection: EditorSelection, target: string) {
    if ((selection.anchor.line === selection.head.line) && (selection.anchor.ch === selection.head.ch)) {
      this.toggleLine(selection.anchor.line, target);
    } else {
      this.toggleSelection(target);
    }
  }

  toggleLine(line: number, target: string) {
    const original = this.editor.getLine(line);
    let replacement = original;
    if (SwapCheckboxStatus.taskRegex.test(original)) {
      replacement = original.replace(SwapCheckboxStatus.taskRegex, `$1[${target}]$2`);
    } else if (SwapCheckboxStatus.nonTaskRegex.test(original)) {
      replacement = original.replace(SwapCheckboxStatus.nonTaskRegex, `$1- [${target}] $3`);
    }
    this.editor.setLine(line, replacement);
  }

  toggleSelection(target: string) {
    const cursorStart = this.editor.getCursor("from");
    cursorStart.ch = 0;

    const cursorEnd = this.editor.getCursor("to");
    cursorEnd.ch = 0;
    cursorEnd.line += 1;

    const original = this.editor.getRange(cursorStart, cursorEnd);
    let replacement = original;

    // first replace all the current task lines
    if (SwapCheckboxStatus.taskRegex.test(original)) {
      replacement = original.replace(SwapCheckboxStatus.taskRegex, `$1[${target}]$2`);
      this.editor.replaceRange(replacement, cursorStart, cursorEnd);
    }

    // next, any non blank lines that are selected are transformed into tasks as well
    if (SwapCheckboxStatus.nonTaskRegex.test(original)) {
      replacement = original.replace(SwapCheckboxStatus.nonTaskRegex, `$1- [${target}] $3`);
      this.editor.replaceRange(replacement, cursorStart, cursorEnd);
    }
  }
}

export default SwapCheckboxStatus;
