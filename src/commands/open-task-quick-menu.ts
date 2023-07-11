import { Command, MarkdownView, Editor } from "obsidian";
import { MyPluginInterface } from "src/types";
import QuickActionModal from '../modals/quick-action-modal';

export default (plugin: MyPluginInterface): Command => ({
  id: 'open-task-quick-menu',
  name: 'open task quick menu',
  hotkeys: [{ modifiers: ["Mod", "Shift"], key: "l" }],
  editorCallback: (editor: Editor, view: MarkdownView) => {
    new QuickActionModal(plugin.app, plugin, editor).open();
  }
});


