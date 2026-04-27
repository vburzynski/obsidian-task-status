import { SuggestModal, App } from "obsidian";
import SwapCheckboxStatus from "src/swap-checkbox-status";
import swapInLine from "src/swap-line";
import { CheckboxOption, ModalTarget, TaskStatusPluginInterface } from "src/types";

export default class QuickActionModal extends SuggestModal<CheckboxOption> {
  plugin: TaskStatusPluginInterface;
  target: ModalTarget;

  constructor(app: App, plugin: TaskStatusPluginInterface, target: ModalTarget) {
    super(app);
    this.plugin = plugin;
    this.target = target;
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

    el.setAttribute('data-task', option.character);
    el.classList.add('task-list-item');
    if (option.character !== ' ') {
      el.classList.add('is-checked');
    }

    const input = el.createEl('input', {
      attr: {
        'type': 'checkbox',
        'data-task': option.character,
      },
    });

    input.classList.add('task-list-item');
    input.checked = option.character !== ' ';
    if (option.character !== ' ') {
      input.classList.add('is-checked');
    }

    const span = el.createEl("span", { text: option.title });
    span.classList.add('cm-list-1')
  }

  onChooseSuggestion(option: CheckboxOption, _evt: MouseEvent | KeyboardEvent) {
    if (this.target.kind === 'editor') {
      new SwapCheckboxStatus(this.target.editor).swap(option.character);
    } else {
      const { file, line } = this.target;
      this.app.vault.process(file, (content) => swapInLine(content, line, option.character));
    }
  }
}
