import { Plugin } from 'obsidian';
import { TaskStatusPluginInterface, TaskStatusPluginSettings } from 'src/types';
import Settings from 'src/settings';
import registerRibbon from 'src/register-ribbon';
import registerCheckboxHandlers from 'src/register-checkbox-handlers';
import changeTaskStatus from 'src/commands/open-task-quick-menu';
import DEFAULT_SETTINGS from 'src/default-settings';

export default class TaskStatusPlugin extends Plugin implements TaskStatusPluginInterface {
  settings: TaskStatusPluginSettings;

  async onload() {
    console.log('loading Obsidian Task Status');
    await this.loadSettings();
    registerRibbon(this);
    registerCheckboxHandlers(this);
    this.addCommand(changeTaskStatus(this));
    this.addSettingTab(new Settings(this.app, this));
  }

  onunload() {
    console.log('unloading Obsidian Task Status');
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
