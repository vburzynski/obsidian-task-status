import { Editor, Notice, SuggestModal, App } from "obsidian";
import SwapCheckboxStatus from "src/swap-checkbox-status";
import { CheckboxOption, MyPluginInterface } from "src/types";

export default class ExampleModal extends SuggestModal<CheckboxOption> {
  editor: Editor;
  plugin: MyPluginInterface;

  constructor(app: App, plugin: MyPluginInterface, editor: Editor) {
    super(app);
    this.plugin = plugin;
    this.editor = editor;
  }

  getSuggestions(query: string): CheckboxOption[] {
    return this.plugin.settings.checkboxOptions.filter((option) =>
      option.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  renderSuggestion(option: CheckboxOption, el: HTMLElement) {
    el.setCssStyles({
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      textAlign: 'center',
    });

    const input = el.createEl('input', {
      attr: {
        'type': 'checkbox',
        'data-task': option.character,
      },
    });
    input.classList.add('task-list-item');
    input.checked = option.character !== ' ';

    const span = el.createEl("span", { text: option.title });
    span.classList.add('cm-list-1')
  }

  onChooseSuggestion(option: CheckboxOption, evt: MouseEvent | KeyboardEvent) {
    new Notice(`Selected ${option.title}`);
    new SwapCheckboxStatus(this.editor).swap(option.character);
  }
}
