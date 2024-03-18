import { Editor, EditorPosition, EditorSelection } from 'obsidian';

// TODO: ignore certain types of blocks -- like comment blocks and code blocks

class SwapCheckboxStatus {
  editor: Editor;

  /**
   * When true, the class will output debug console messages
   */
  DEBUG = true;

  // matches a checklist item:
  // start of a line; any amount of whitespace or `>` characters (for callouts);
  // then a dash or asterix for a bullet point, a single whitespace, then square bracket syntax
  // for the checkbox; followed by any remaining characters til the end of the line.
  // Capturing Groups:
  //   $1 - everything before the checkbox
  //   $2 - everything after the checkbox
  public static readonly taskRegex = /^([\s>]*[-*+]\s)\[[^\]]\](?!\()(.*)$/gm;

  /*
  (?!^#+)                                   Ignore Heading (negative lookahead)
  (?!^\s*$)                                 Ignore blank lines
  (?!^\s{0,3}([-_*]) *(?:\1 *){2,}$)        Ignore horizontal rules and thematic breaks
  (?!^[\s>]* \[![\w-]+\])                   Ignore first line of Obsidian Callouts
  ^                                         start of a line
  (?!(?:\s*>?)*\s*[-*+]\s+\[[^\]]\](?!\())  Ignore lines that are tasks (they may or may not be inside block quotes)
  ([>\s]*)?                                 capture any amount of indentation and nested blockquote markers
  (?:(?:[-*+]|[0-9]+\.)\s)?                 don't capture any ordered or unordered list markings
  (.*)                                      capture the rest of the text
  */

  // matches a line that is not a checklist
  // Capturing Groups:
  //  $1 - used internally to detect horizontal rules
  //  $2 - indentation
  //  $3 - bullet character
  //  $4 - content
  public static readonly nonTaskRegex =
    /(?!^#+)(?!^\s*$)(?!^\s{0,3}([-_*])\s*(?:\1 *){2,}$)(?!^[\s>]* \[![\w-]+\])^(?!(?:\s*>?)*\s*[-*+]\s+\[[^\]]\](?!\())([>\s]*)?(?:(?:([-*+])|[0-9]+\.)\s)?(.*)/gm;

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
      this.transformSelectionOrLine(selection, marker);
    });
  }

  /**
   * execute the appropriate transform depending on whether a single line or multiple are selected
   * @param selection an editor selection
   * @param marker the status marker to put inside the checkbox
   */
  transformSelectionOrLine(selection: EditorSelection, marker: string) {
    this.log(`selection:\n${selection}`);
    if (selection.anchor.line === selection.head.line && selection.anchor.ch === selection.head.ch) {
      this.transformLine(selection.anchor, marker);
    } else {
      this.transformSelection(selection, marker);
    }
  }

  /**
   * transform a single line by it's line number
   * @param line the line number
   * @param target the status marker to put inside the checkbox
   */
  transformLine(anchor: EditorPosition, target: string) {
    const line: number = anchor.line;
    this.log('start transformLine');
    const original = this.editor.getLine(line);
    const replacement = this.getLineReplacement(original, target);

    this.log(`original:\n${original}`);
    this.log(`replacement:\n${replacement}`);

    this.editor.setLine(line, replacement);

    let ch = replacement.length;
    if (original.length === replacement.length) {
      ch = anchor.ch;
    } else {
      ch = anchor.ch + replacement.length - original.length;
    }
    this.editor.setSelection({ line, ch });
  }

  getLineReplacement(original: string, target: string): string {
    SwapCheckboxStatus.taskRegex.lastIndex = 0;
    SwapCheckboxStatus.nonTaskRegex.lastIndex = 0;
    SwapCheckboxStatus.blankLineRegex.lastIndex = 0;
    switch (true) {
      // when the line is a task, replace the task marker
      case SwapCheckboxStatus.taskRegex.test(original):
        return this.transformTasks(original, target);
      // when the line is not a task, transform it into a task
      case SwapCheckboxStatus.nonTaskRegex.test(original):
        return this.transformNonTasks(original, target);
      // when the line is blank, start a blank task
      case SwapCheckboxStatus.blankLineRegex.test(original):
        return this.transformBlankLines(original, target);
      // otherwise don't apply any transformation
      default:
        this.log('detected other');
        return original;
    }
  }

  transformTasks(original: string, target: string) {
    this.log('transforming task(s)');
    SwapCheckboxStatus.taskRegex.lastIndex = 0;
    return original.replace(SwapCheckboxStatus.taskRegex, `$1[${target}]$2`);
  }

  transformNonTasks(original: string, target: string) {
    this.log('transforming non-task(s)');

    SwapCheckboxStatus.nonTaskRegex.lastIndex = 0;
    const parts = SwapCheckboxStatus.nonTaskRegex.exec(original);
    if (parts === null) return original;

    // match 1 is a used inside the regex to detect horizontal rules
    // use matches 2 (indentation) and 3 (the content);
    const bullet = parts[3] || '-';
    return original.replace(SwapCheckboxStatus.nonTaskRegex, `$2${bullet} [${target}] $4`);
  }

  transformBlankLines(original: string, target: string) {
    this.log('transforming blank line(s)');
    SwapCheckboxStatus.blankLineRegex.lastIndex = 0;
    return original.replace(SwapCheckboxStatus.blankLineRegex, `$1- [${target}] `);
  }

  /**
   * transform a selection of text
   * @param selection
   * @param target
   */
  transformSelection(selection: EditorSelection, target: string) {
    this.log('start transformSelection');
    this.log('selection', selection);

    const { anchor, head } = selection;

    // determine the start and end
    const anchorIsStart = anchor.ch <= head.ch && anchor.line <= head.line;
    const cursorStart = anchorIsStart ? anchor : head;
    const cursorEnd = anchorIsStart ? head : anchor;

    // expand the selection to cover entire lines
    cursorStart.ch = 0;
    cursorEnd.ch = 0;
    cursorEnd.line += 1;

    // get the existing original text
    let replacement = this.editor.getRange(cursorStart, cursorEnd);

    // transform selected lines that contain tasks
    SwapCheckboxStatus.taskRegex.lastIndex = 0;
    if (SwapCheckboxStatus.taskRegex.test(replacement)) {
      replacement = this.transformTasks(replacement, target);
    }

    // all selected non-blank lines are transformed into tasks as well
    SwapCheckboxStatus.nonTaskRegex.lastIndex = 0;
    if (SwapCheckboxStatus.nonTaskRegex.test(replacement)) {
      replacement = this.transformNonTasks(replacement, target);
    }

    // NOTE: non-blank lines are left blank when muli-line selection is used

    this.log('replacement', replacement);
    this.editor.replaceRange(replacement, cursorStart, cursorEnd);
  }

  /**
   * conditional log output
   * @param args arguments to pass on to console.log
   */
  log(...args: unknown[]) {
    this.DEBUG && console.log(...args);
  }
}

export default SwapCheckboxStatus;
