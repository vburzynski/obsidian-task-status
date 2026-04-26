import { Command, MarkdownView, Editor } from "obsidian";
import { TaskStatusPluginInterface } from "src/types";
import QuickActionModal from '../modals/quick-action-modal';

const changeTaskStatus = (plugin: TaskStatusPluginInterface): Command => ({
  id: 'change-task-status',
  name: 'change task status',
  editorCallback: (editor: Editor, _view: MarkdownView) => {
    new QuickActionModal(plugin.app, plugin, { kind: 'editor', editor }).open();
  }
});

export default changeTaskStatus;
