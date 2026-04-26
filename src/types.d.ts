import { Command, Editor, Plugin, TFile } from "obsidian";

interface CommandCreator {
  (plugin: TaskStatusPluginInterface): Command;
}

interface TaskStatusPluginSettings {
  checkboxOptions: CheckboxOption[];
  enableReadingModeLongPress: boolean;
  longPressDurationMs: number;
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

type ModalTarget =
  | { kind: 'editor'; editor: Editor }
  | { kind: 'file'; file: TFile; line: number };
