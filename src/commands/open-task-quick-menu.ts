import { Command, MarkdownView, Editor } from "obsidian";
import { TaskStatusPluginInterface } from "src/types";
import QuickActionModal from '../modals/quick-action-modal';

/**
 * command creator which constructs a command object configured to open the quick action modal
 * @param plugin the plugin instance
 * @returns a command object
 */
const openTaskQuickMenu = (plugin: TaskStatusPluginInterface): Command => ({
  id: 'open-task-quick-menu',
  name: 'open task quick menu',
  hotkeys: [{ modifiers: ["Mod", "Shift"], key: "l" }],
  editorCallback: (editor: Editor, view: MarkdownView) => {
    new QuickActionModal(plugin.app, plugin, editor).open();
  }
});

export default openTaskQuickMenu;

