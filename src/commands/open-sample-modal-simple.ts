import { Command } from 'obsidian';
import SampleModal from '../sample-modal';
import { MyPluginInterface } from "src/types";

// adds a simple command that can be triggered anywhere
export default (plugin: MyPluginInterface): Command => ({
  id: 'open-sample-modal-simple',
  name: 'Open sample modal (simple)',
  callback: () => {
    new SampleModal(plugin.app).open();
  }
});
