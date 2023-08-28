import { App, PluginSettingTab, Setting } from 'obsidian';
import { MyPluginInterface } from './types';

/**
 * Swap two indexes in an array
 * @param arr
 * @param indexA
 * @param indexB
 * @returns
 */
function swap<T>(arr: T[], indexA: number, indexB: number): void {
  if (indexB < 0 || indexB === arr.length) return;

  const temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
}

/**
 * move an array item to the top of the list
 * @param arr the list to modify
 * @param index the index of the item to move to the top
 */
function moveToTop<T>(arr: T[], index: number): void {
  const item = arr.splice(index, 1);
  arr.unshift(item[0]);
}

export default class Settings extends PluginSettingTab {
  plugin: MyPluginInterface;

  constructor(app: App, plugin: MyPluginInterface) {
    super(app, plugin);
    this.plugin = plugin;
  }

  /**
   * Render (display) the settings view
   */
  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    // containerEl.createEl('h2', { text: 'Settings for the Task Status Quick Menu' });

    // const taskLine = containerEl.createEl('div')
    // taskLine.addClasses(['HyperMD-list-line', 'HyperMD-list-line-1', 'HyperMD-task-line', 'cm-line']);
    // const taskLabel = taskLine.createEl('label')
    // taskLabel.addClass('task-list-label');
    // const taskInput = taskLabel.createEl('input', { type: 'checkbox', attr: { 'data-task': ' ', disabled: true } });
    // taskInput.addClass('task-list-item-checkbox');
    // const taskSpan = taskLine.createEl('span', { text: 'task item' });
    // taskSpan.addClass('cm-list-1');

    this.displayTaskStatuses();
  }

  /**
   * Render the custom task statuses editing section
   */
  displayTaskStatuses(): void {
    this.containerEl.createEl('h2', { text: 'Task Statuses' });

    // create a series of settings to edit the list of custom task statuses
    // the setting will have a name, two inputs (status name and marker), and buttons to move the
    // item or remove it
    this.plugin.settings.checkboxOptions.forEach((checkboxOption, index) => {
      new Setting(this.containerEl)
        .setName(`${index + 1}.`)
        // .setName(checkboxOption.title)
        // .setDesc(`- [${checkboxOption.character}]`)
        .addText(async (text) => {
          text
            .setPlaceholder('name')
            .setValue(checkboxOption.title)
            .onChange(async (value) => {
              this.plugin.settings.checkboxOptions[index].title = value;
              this.plugin.saveSettings();
            });
        })
        .addText(async (text) => {
          text
            .setPlaceholder('character')
            .setValue(checkboxOption.character)
            .onChange(async (value) => {
              this.plugin.settings.checkboxOptions[index].character = value;
              this.plugin.saveSettings();
            });
        })
        .addExtraButton((button) => {
          button
            .setIcon('double-up-arrow-glyph')
            .setTooltip('Move to top')
            .onClick(() => {
              moveToTop(this.plugin.settings.checkboxOptions, index);
              this.plugin.saveSettings();
              this.display();
            });
        })
        .addExtraButton((button) => {
          button
            .setIcon('up-chevron-glyph')
            .setTooltip('Move up')
            .onClick(() => {
              swap(this.plugin.settings.checkboxOptions, index, index - 1);
              this.plugin.saveSettings();
              this.display();
            });
        })
        .addExtraButton((button) => {
          button
            .setIcon('down-chevron-glyph')
            .setTooltip('Move down')
            .onClick(() => {
              swap(this.plugin.settings.checkboxOptions, index, index + 1);
              this.plugin.saveSettings();
              this.display();
            });
        })
        .addExtraButton((button) => {
          button
            .setIcon('cross')
            .setTooltip('Delete')
            .onClick(() => {
              this.plugin.settings.checkboxOptions.splice(index, 1);
              this.plugin.saveSettings();
              this.display();
            });
        });
    });

    // Include a button to append new items to the list of custom task statuses
    new Setting(this.containerEl).addButton((button) => {
      button
        .setButtonText('Add New Status')
        .setCta()
        .onClick(() => {
          this.plugin.settings.checkboxOptions.push({ title: 'undefined', character: 'x' });
          this.plugin.saveSettings();
          this.display();
        });
    });
  }
}
