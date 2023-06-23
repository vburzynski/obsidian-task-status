import { Notice } from 'obsidian';
import { MyPluginInterface } from "./types";

export default (plugin: MyPluginInterface) => {
  // This creates an icon in the left ribbon.
  // see https://lucide.dev/icons/list-restart
  const ribbonIconEl: HTMLElement = plugin.addRibbonIcon(
    'list',
    'Sample Plugin',
    (evt: MouseEvent) => {
      new Notice('This is a notice!');
    }
  );

  ribbonIconEl.addClass('my-plugin-ribbon-class');
}
