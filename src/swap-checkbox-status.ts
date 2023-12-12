import { Editor, EditorSelection } from "obsidian";

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

  /*
  (?!^#+)                                   Ignore Heading (negative lookahead)
  (?!^\s*$)                                 Ignore blank lines
  (?!^\s{0,3}([-_*]) *(?:\1 *){2,}$)        Ignore horizontal rules and thematic breaks
  (?!^[\s>]* \[![\w-]+\])                   Ignore first line of Obsidian Callouts
  ^                                         start of a line
  (?!(?:\s*>?)*\s*[-*+]\s+\[[^\]]\])        Ignore lines that are tasks (they may or may not be inside block quotes)
  ([>\s]*)?                                 capture any amount of indentation and nested blockquote markers
  (?:(?:[-*+]|[0-9]+\.)\s)?                 don't capture any ordered or unordered list markings
  (.*)                                      capture the rest of the text
  */

  // matches a line that is not a checklist
  public static readonly nonTaskRegex = /(?!^#+)(?!^\s*$)(?!^\s{0,3}([-_*])\s*(?:\1 *){2,}$)(?!^[\s>]* \[![\w-]+\])^(?!(?:\s*>?)*\s*[-*+]\s+\[[^\]]\])([>\s]*)?(?:(?:[-*+]|[0-9]+\.)\s)?(.*)/gm

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
    const replacement = this.getLineReplacement(original, target);

    this.editor.setLine(line, replacement);

    // TODO: make this configurable in the settings (jump to end of line)
    // TODO: retain jumping to the end of the line when it is blank
    // TODO: this only retains the final cursor selection, nothing else; maybe use `setSelections`
    this.editor.setSelection({ line, ch: replacement.length });
  }

  getLineReplacement(original: string, target: string): string {
    switch (true) {
      // when the line is a task, replace the task marker
      case SwapCheckboxStatus.taskRegex.test(original):
        return original.replace(SwapCheckboxStatus.taskRegex, `$1[${target}]$2`);
      // when the line is not a task, transform it into a task
      case SwapCheckboxStatus.nonTaskRegex.test(original):
        return original.replace(SwapCheckboxStatus.nonTaskRegex, `$1- [${target}] $3`);
      // when the line is blank, start a blank task
      case SwapCheckboxStatus.blankLineRegex.test(original):
        return original.replace(SwapCheckboxStatus.blankLineRegex, `$1- [${target}] `);
      // otherwise don't apply any transformation
      default:
        return original
    }
  }

  /**
   * transform a selection of text
   * @param selection
   * @param target
   */
  transformSelection(selection: EditorSelection, target: string) {
    const { anchor, head } = selection;

    // determine the start and end
    const anchorIsStart = (anchor.ch <= head.ch) && (anchor.line <= head.line);
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
      replacement = replacement.replace(SwapCheckboxStatus.nonTaskRegex, `$2- [${target}] $3`);
    }

    this.editor.replaceRange(replacement, cursorStart, cursorEnd);
  }
}

export default SwapCheckboxStatus;
