import { Editor, Notice, SuggestModal, App } from "obsidian";
import SwapCheckboxStatus from "src/swap-checkbox-status";
import { CheckboxOption, TaskStatusPluginInterface } from "src/types";

/**
 * A serchable modal that allows the user to select a checkbox status symbol
 */
export default class QuickActionModal extends SuggestModal<CheckboxOption> {
  editor: Editor;
  plugin: TaskStatusPluginInterface;

  /**
   *
   * @param app Obsidian instance
   * @param plugin plugin instance
   * @param editor editor instance
   */
  constructor(app: App, plugin: TaskStatusPluginInterface, editor: Editor) {
    super(app);
    this.plugin = plugin;
    this.editor = editor;
  }

  /**
   * filters the checkbox options; the results are used as suggestions
   * @param query the search string
   * @returns collection of options
   */
  getSuggestions(query: string): CheckboxOption[] {
    return this.plugin.settings.checkboxOptions.filter((option) =>
      option.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  /**
   * renders each suggestion
   * @param option the checkbox option to display
   * @param el the suggestion HTML element
   */
  renderSuggestion(option: CheckboxOption, el: HTMLElement) {
    el.setCssStyles({
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      textAlign: 'center',
    });

    // show a preview of the checkbox
    const input = el.createEl('input', {
      attr: {
        'type': 'checkbox',
        'data-task': option.character,
      },
    });
    input.classList.add('task-list-item');
    input.checked = option.character !== ' ';

    // show the name of the checkbox option
    const span = el.createEl("span", { text: option.title });
    span.classList.add('cm-list-1')
  }

  /**
   * Handler for when the user chooses an option
   * @param option the option selected by the user
   * @param evt the triggering mouse or keyboard event
   */
  onChooseSuggestion(option: CheckboxOption, evt: MouseEvent | KeyboardEvent) {
    new Notice(`Selected ${option.title}`);
    new SwapCheckboxStatus(this.editor).swap(option.character);
  }
}
