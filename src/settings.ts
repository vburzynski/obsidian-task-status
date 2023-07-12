import { App, PluginSettingTab, Setting } from 'obsidian';
import { MyPluginInterface } from './types';

function swap<T>(arr: T[], indexA: number, indexB: number): void {
  if (indexB < 0 || indexB === arr.length) return;

  const temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
}

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

  display(): void {
    const { containerEl } = this;

    containerEl.empty();
    containerEl.createEl('h2', { text: 'Settings for my awesome plugin.' });

    new Setting(containerEl)
      .setName('Setting #1')
      .setDesc("It's a secret")
      .addText((text) =>
        text
          .setPlaceholder('Enter your secret')
          .setValue(this.plugin.settings.mySetting)
          .onChange(async (value) => {
            console.log('Secret: ' + value);
            this.plugin.settings.mySetting = value;
            await this.plugin.saveSettings();
          })
      );

    this.displayTaskStatuses();
  }

  displayTaskStatuses(): void {
    this.containerEl.createEl('h2', { text: 'Task Statuses' });

    // TODO: double-down-arrow-glyph for move to bottom of list
    // TODO: double-up-arrow-glyph for move to top of list
    this.plugin.settings.checkboxOptions.forEach((checkboxOption, index) => {
      new Setting(this.containerEl)
        .setName(checkboxOption.title)
        .setDesc(`- [${checkboxOption.character}]`)
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

    new Setting(this.containerEl).addButton((button) => {
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
}
