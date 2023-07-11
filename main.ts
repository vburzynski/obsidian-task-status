import { Plugin } from 'obsidian';
import { MyPluginInterface, MyPluginSettings } from 'src/types';
import Settings from 'src/settings';
import registerRibbon from 'src/register-ribbon';

import sampleEditorCommand from 'src/commands/test-command';
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

    this.addCommand(sampleEditorCommand(this));
    this.addCommand(testCommand(this));
    this.addCommand(quickActionMenu(this));

    this.addSettingTab(new Settings(this.app, this));
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
