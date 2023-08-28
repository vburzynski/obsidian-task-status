import { Editor, EditorSelection } from "obsidian";

// TODO: on single-line selections, should headings be transformed into tasks? (strip out heading)?
// TODO: ignore certain types of blocks -- like comment blocks and code blocks
class SwapCheckboxStatus {
  // reference to the obsidian Editor
  editor: Editor;

  // matches a checklist item:
  // start of a line; any amount of whitespace or `>` characters (for callouts);
  // then a dash or asterix for a bullet point, a single whitespace, then square bracket syntax
  // for the checkbox; followed by any remaining characters til the end of the line.
  // 1st capturing group = everything before the checkbox
  // 2nd capturing group = everything after the checkbox
  public static readonly taskRegex = /^([\s>]*[-*]\s)\[[^\]]\]?(.*)$/gm;

  // matches a line that is not a checklist
  // The description below may need an update
  // negative lookahead 1 - ignore headings
  // negative lookahead 2 - make sure line isn't blank
  // negative lookahead 3 - make sure line isn't a hozontal rule / thematic break
  // capturing group 1
  // - throw away (used for the negative lookaheads)
  // capturing group 2
  // - match any amount of indentation or whitespace, and also blockquote markers
  // capturing group 3
  // - optional unordered list marker (dash or asterix), or ordered list marker
  // capturing group 4
  // - matches content of length 0..n
  // - includes a negative lookahead to ensure this isn't a task already
  // - uses a non-capturing group to encapsulate the negative lookahead with the any character operator
  // public static readonly nonTaskRegex = /(?!^#+)(?!^\s*$)^([\s>]*)((?:[-*]|[0-9]+\.)\s)?((?:(?!\[[^\]]\].*).)*)$/gm
  // public static readonly nonTaskRegex = /(?!^#+)(?!^\s*$)(?!^(?:---|***)$)^([\s>]*)((?:[-*+]|[0-9]+\.)\s)?((?:(?!\[[^\]]\].*|\[![\w-]+\].*).)*)$/gm
  public static readonly nonTaskRegex = /(?!^#+)(?!^\s*$)(?!^\s{0,3}([-_*]) *(?:\1 *){2,}$)(?!^[\s>]* \[![\w-]+\])^([\s>]*)(?:(?!(?:\s*>?)*\s*[-*+]\s+\[[^\]]\])((?:[-*+]|[0-9]+\.)\s)?(.*))/gm

  // matches a blank line
  public static readonly blankLineRegex = /^(\s*)$/gm;

  constructor(editor: Editor) {
    this.editor = editor;
  }

  /**
   * Initiates the transformation of editor selected lines
   * @param marker the status marker string to put inside the checkbox
   */
  swap(marker: string) {
    const selections = this.editor.listSelections();
    selections.forEach((selection) => {
      this.transformSelectionOrLine(selection, marker)
    });
  }

  /**
   * execute the appropriate transform depending on whether a single line or multiple are selected
   * @param selection an editor selection
   * @param marker the status marker to put inside the checkbox
   */
  transformSelectionOrLine(selection: EditorSelection, marker: string) {
    console.log('selection', selection);
    if ((selection.anchor.line === selection.head.line) && (selection.anchor.ch === selection.head.ch)) {
      this.transformLine(selection.anchor.line, marker);
    } else {
      this.transformSelection(selection, marker);
    }
  }

  /**
   * transform a single line by it's line number
   * @param line the line number
   * @param target the status marker to put inside the checkbox
   */
  transformLine(line: number, target: string) {
    const original = this.editor.getLine(line);
    let replacement = original;

    if (SwapCheckboxStatus.taskRegex.test(original)) {
      // when the line is a task...
      replacement = original.replace(SwapCheckboxStatus.taskRegex, `$1[${target}]$2`);
    } else if (SwapCheckboxStatus.nonTaskRegex.test(original)) {
      // when the line is not a task...
      replacement = original.replace(SwapCheckboxStatus.nonTaskRegex, `$1- [${target}] $3`);
    } else if (SwapCheckboxStatus.blankLineRegex.test(original)) {
      // when the line is blank...
      replacement = original.replace(SwapCheckboxStatus.blankLineRegex, `$1- [${target}] `);
    }
    this.editor.setLine(line, replacement);

    // TODO: make this configurable in the settings (jump to end of line)
    // TODO: retain jumping to the end of the line when it is blank
    // FIXME: this only retains the final cursor selection, nothing else; maybe use `setSelections`
    this.editor.setSelection({ line, ch: replacement.length });
  }

  /**
   * transform a selection of text
   * @param selection
   * @param target
   */
  transformSelection(selection: EditorSelection, target: string) {
    const { anchor, head } = selection;

    // determine the start and end
    const anchorIsStart = anchor.ch <= head.ch && anchor.line <= head.line;
    const cursorStart = (anchorIsStart) ? anchor : head;
    const cursorEnd = (anchorIsStart) ? head : anchor;

    // expand the selection to cover entire lines
    cursorStart.ch = 0;
    cursorEnd.ch = 0;
    cursorEnd.line += 1;

    // get the existing original text
    let replacement = this.editor.getRange(cursorStart, cursorEnd);

    // replace all the current task lines
    if (SwapCheckboxStatus.taskRegex.test(replacement)) {
      replacement = replacement.replace(SwapCheckboxStatus.taskRegex, `$1[${target}]$2`);
    }

    // all selected non-blank lines are transformed into tasks as well
    if (SwapCheckboxStatus.nonTaskRegex.test(replacement)) {
      replacement = replacement.replace(SwapCheckboxStatus.nonTaskRegex, `$2- [${target}] $4`);
    }

    this.editor.replaceRange(replacement, cursorStart, cursorEnd);
  }
}

export default SwapCheckboxStatus;
