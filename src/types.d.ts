import { Command, Plugin } from "obsidian";

interface CommandCreator {
  (plugin: MyPluginInterface): Command;
}

interface MyPluginSettings {
  mySetting: string;
}

interface MyPluginInterface extends Plugin {
  settings: MyPluginSettings;
  loadSettings(): Promise<void>;
  saveSettings(): Promise<void>;
}
