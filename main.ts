import { Plugin, TAbstractFile } from 'obsidian';
import { MyPluginInterface, MyPluginSettings } from 'src/types';
import Settings from 'src/settings';
import openSampleModalSimple from 'src/commands/open-sample-modal-simple';
import sampleEditorCommand from 'src/commands/test-command';
import openSampleModalComplex from 'src/commands/open-sample-modal-complex';
import registerRibbon from 'src/register-ribbon';
import testCommand from 'src/commands/test-command';
import quickActionMenu from 'src/commands/quick-action-menu';

const DEFAULT_SETTINGS: MyPluginSettings = {
  mySetting: 'default'
}

export default class MyPlugin extends Plugin implements MyPluginInterface {
  settings: MyPluginSettings;

  async onload() {
    await this.loadSettings();
    registerRibbon(this);

    this.addCommand(openSampleModalSimple(this));
    this.addCommand(sampleEditorCommand(this));
    this.addCommand(openSampleModalComplex(this));
    this.addCommand(testCommand(this));
    this.addCommand(quickActionMenu(this));

    this.addSettingTab(new Settings(this.app, this));

    this.registerEvent(this.app.vault.on('create', (file: TAbstractFile) => {
      console.log('create', file.name);
    }));

    this.registerEvent(this.app.vault.on('delete', (file: TAbstractFile) => {
      console.log('delete', file.name);
    }));

    this.registerEvent(this.app.vault.on('modify', (file: TAbstractFile) => {
      console.log('modify', file.name);
    }));

    this.registerEvent(this.app.vault.on('rename', (file: TAbstractFile) => {
      console.log('rename', file.name);
    }));

    // When registering intervals, this function will automatically clear the interval when the plugin is disabled.
    // this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
