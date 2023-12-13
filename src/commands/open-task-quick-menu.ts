import { Command, MarkdownView, Editor } from "obsidian";
import { TaskStatusPluginInterface } from "src/types";
import QuickActionModal from '../modals/quick-action-modal';

/**
 * command creator which constructs a command object configured to open the quick action modal
 * @param plugin the plugin instance
 * @returns a command object
 */
const changeTaskStatus = (plugin: TaskStatusPluginInterface): Command => ({
  id: 'change-task-status',
  name: 'change task status',
  // hotkeys: [{ modifiers: ["Mod", "Shift"], key: "l" }],
  editorCallback: (editor: Editor, view: MarkdownView) => {
    new QuickActionModal(plugin.app, plugin, editor).open();
  }
});

export default changeTaskStatus;

