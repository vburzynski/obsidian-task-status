import { Command, Plugin } from "obsidian";

interface CommandCreator {
  (plugin: TaskStatusPluginInterface): Command;
}

interface TaskStatusPluginSettings {
  mySetting: string;
  checkboxOptions: CheckboxOption[],
}

interface TaskStatusPluginInterface extends Plugin {
  settings: TaskStatusPluginSettings;
  loadSettings(): Promise<void>;
  saveSettings(): Promise<void>;
}

interface CheckboxOption {
  title: string;
  character: string;
}
