import { Plugin } from 'obsidian';
import { MyPluginInterface, MyPluginSettings } from 'src/types';
import Settings from 'src/settings';
import registerRibbon from 'src/register-ribbon';
import openTaskQuickMenu from 'src/commands/open-task-quick-menu';
import DEFAULT_SETTINGS from 'src/default-settings';

export default class MyPlugin extends Plugin implements MyPluginInterface {
  settings: MyPluginSettings;

  async onload() {
    await this.loadSettings();
    registerRibbon(this);
    this.addCommand(openTaskQuickMenu(this));
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
