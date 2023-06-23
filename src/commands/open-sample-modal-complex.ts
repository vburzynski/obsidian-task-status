import { Command, MarkdownView } from 'obsidian';
import SampleModal from '../sample-modal';
import { MyPluginInterface } from "src/types";

// a complex command that can check whether the current state of the app allows execution of the command
export default (plugin: MyPluginInterface): Command => ({
  id: 'open-sample-modal-complex',
  name: 'Open sample modal (complex)',
  checkCallback: (checking: boolean) => {
    const markdownView = plugin.app.workspace.getActiveViewOfType(MarkdownView);

    // when the active view is of type markdown view
    if (markdownView) {
      // If checking is true, we're simply "checking" if the command can be run.
      // If checking is false, then we want to actually perform the operation.
      if (!checking) {
        new SampleModal(plugin.app).open();
      }

      // plugin.command will only show up in Command Palette when the check function returns true
      return true;
    }
  }
});
