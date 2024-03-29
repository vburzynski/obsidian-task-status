import { App, PluginSettingTab, Setting } from 'obsidian';
import { CheckboxOption, TaskStatusPluginInterface } from './types';
import { themes } from './themes';
import DEFAULT_SETTINGS from './default-settings';

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
  plugin: TaskStatusPluginInterface;

  /**
   * constructs the settings
   * @param app obsidian application instance
   * @param plugin plugin instance
   */
  constructor(app: App, plugin: TaskStatusPluginInterface) {
    super(app, plugin);
    this.plugin = plugin;
  }

  /**
   * Renders the settings view
   */
  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    this.displayTaskStatuses();
    this.displayListActions();
    this.displayImportOptions();
  }

  /**
   * Render the custom task statuses editing section
   */
  displayTaskStatuses(): void {
    // create a series of settings to edit the list of custom task statuses
    // the setting will have a name, two inputs (status name and marker), and buttons to move the
    // item or remove it
    this.plugin.settings.checkboxOptions.forEach((checkboxOption, index) => {
      new Setting(this.containerEl)
        .setName(`${(index + 1).toString().padStart(2, '0')}.`)
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
  }

  displayListActions() {
    new Setting(this.containerEl)
      .setName('Status List Actions')
      .addButton((button) => {
        button
          .setButtonText('Clear list')
          .setWarning()
          .onClick(() => {
            this.plugin.settings.checkboxOptions = [];
            this.plugin.saveSettings();
            this.display();
          });
      })
      .addButton((button) => {
        button
          .setButtonText('Reset to default')
          .onClick(() => {
            this.plugin.settings = structuredClone(DEFAULT_SETTINGS);
            this.plugin.saveSettings();
            this.display();
          });
      })
      .addButton((button) => {
        button
          .setButtonText('Add new status')
          .setCta()
          .onClick(() => {
            this.plugin.settings.checkboxOptions.push({ title: 'undefined', character: 'x' });
            this.plugin.saveSettings();
            this.display();
          });
      });
  }

  displayImportOptions() {
    themes.forEach(({name, statuses}) => {
      new Setting(this.containerEl)
        .setName(name)
        .setDesc(`Add any missing custom checkbox statuses supported by the ${name}.`)
        .addButton((button) => {
          button.setButtonText(name).onClick(async () => {
            statuses.forEach((option: CheckboxOption) => {
              const found = this.plugin.settings.checkboxOptions.some((o) => o.character == option.character)
              if(!found) {
                this.plugin.settings.checkboxOptions.push({ ...option });
              }
            });
            this.plugin.saveSettings();
            this.display();
          });
        });
    });
  }
}
