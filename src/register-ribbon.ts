import { MarkdownView, addIcon } from 'obsidian';
import { TaskStatusPluginInterface } from "./types";
import QuickActionModal from './modals/quick-action-modal';

/**
 * Registers a Ribbon Icon that can open the action modal
 */
export default (plugin: TaskStatusPluginInterface) => {
  // Add an icon (modified version of https://lucide.dev/icons/search-check)
  addIcon(
    'search-check',
    `<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
      <g transform="translate(3, 3)" stroke="currentcolor" stroke-width="6">
        <polyline points="26.1111111 41.7777778 36.5555556 52.2222222 57.4444444 31.3333333"></polyline>
        <circle cx="41.7777778" cy="41.7777778" r="41.7777778"></circle>
        <line x1="94" y1="94" x2="71.5444444" y2="71.5444444"></line>
      </g>
    </g>`
  );

  // create an icon in the left ribbon.
  plugin.addRibbonIcon(
    'search-check',
    'Change Checkbox Status',
    (_event: MouseEvent) => {
      const activeView = plugin.app.workspace.getActiveViewOfType(MarkdownView);
      if (!activeView) return;

      const editor = activeView.editor;
      new QuickActionModal(plugin.app, plugin, editor).open();
    }
  );
}
