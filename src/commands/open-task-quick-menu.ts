import { Command, MarkdownView, Editor, MarkdownFileInfo } from "obsidian";
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
  editorCallback: (editor: Editor, _view: MarkdownView | MarkdownFileInfo) => {
    new QuickActionModal(plugin.app, plugin, { kind: 'editor', editor }).open();
  }
});

export default changeTaskStatus;
