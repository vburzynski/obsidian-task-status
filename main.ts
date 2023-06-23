import { Plugin, TAbstractFile } from 'obsidian';
import { MyPluginInterface, MyPluginSettings } from 'src/types';
import Settings from 'src/settings';
import openSampleModalSimple from 'src/commands/open-sample-modal-simple';
import sampleEditorCommand from 'src/commands/sample-editor-command';
import openSampleModalComplex from 'src/commands/open-sample-modal-complex';
import registerRibbon from 'src/register-ribbon';

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

    this.addSettingTab(new Settings(this.app, this));

    // If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
    // Using this function will automatically remove the event listener when this plugin is disabled.
    // this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
    //   console.log('click', evt);
    // });

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
    this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
