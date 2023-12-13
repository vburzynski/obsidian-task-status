import { Plugin } from 'obsidian';
import { TaskStatusPluginInterface, TaskStatusPluginSettings } from 'src/types';
import Settings from 'src/settings';
import registerRibbon from 'src/register-ribbon';
import changeTaskStatus from 'src/commands/open-task-quick-menu';
import DEFAULT_SETTINGS from 'src/default-settings';

export default class TaskStatusPlugin extends Plugin implements TaskStatusPluginInterface {
  settings: TaskStatusPluginSettings;

  /**
   * Setup the plugin when it loads in obsidian
   */
  async onload() {
    await this.loadSettings();
    registerRibbon(this);
    this.addCommand(changeTaskStatus(this));
    this.addSettingTab(new Settings(this.app, this));
  }

  /**
   * Teardown the plugin when it gets unloaded
   */
  onunload() {}

  /**
   * Trigger the rendering of the settings view
   */
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  /**
   * persist/save the plugin settings
   */
  async saveSettings() {
    await this.saveData(this.settings);
  }
}
