import { Command, MarkdownView, Editor, Notice, SuggestModal, FuzzySuggestModal, App } from "obsidian";
import { MyPluginInterface } from "src/types";

// How is this different from what is available?
//
// `obsidian-tasks`
// - lets you toggle/cycle through a user-configurable pre-determined sequence / state machine
// - directed acyclic graph / state-machine. single outgoing state transition
// - more focus on adding metadata to tasks
//
// `obsidian-task-collector`
// - the task marker modal is mouse dependent/driven
// - focuses on grouping task mechanism a bit
// - you can add any status, but you have to remember the character you want to not lift your hands from the keyboard
// - grid layout optimizes for space and cursor movement
// - scan of options necessitates a Z or F pattern eye movement
// - not searchable
//
// `obsidian-task-marker`
// - another task marker modal that is mouse dependent/driven
// - you can add any status, but you have to remember the character you want to not lift your hands from the keyboard
// - grid layout optimizes for space and cursor movement
// - scan of options necessitates a Z or F pattern eye movement
// - not searchable
//
// `obsidian-toggle-list`
// - another way of doing a pre-determined toggle sequence / state machine?
// - initially complex

// WHY this plugin?
// ================
// - keyboard driven - your hands don't need to jump between keys and mouse/trackball/trackpad
// - ability to indiscriminately jump between any checkbox status
// - don't have to remember the text characters
// - add pre-defined sets of status via settings (similar to obsidian-tasks).
// - quick linear scan through the list of options (as opposed to a grid)
// - attempt to complement other task related plugins

// TODO: memoize/cache/store the previously used status
// TODO: create a command to quickly reuse last status
// TODO: make the accents customizable through the settings
// TODO: customize the checkbox options using the settings menu
// TODO: ability to customize all of the options
// TODO: ability to add and remove options
// TODO: ability to rename
// TODO: ability to have aliases (maybe this is just extending the description and showing a comma separated list)
// TODO: ability to reorder the options
// TODO: the settings should have presets for common themes like Things, Minimal, etc.

// STRETCH GOALS
// TODO: ability to quickly make a checkbox into a non-checkbox. (would this become a list item or regular text?)
// TODO: on a non-checkbox item; should it convert it into a checkbox? an option to turn on and off?
// TODO: context menu to trigger modal?
// TODO: create a command for each type of checkbox accent;
// this would allow direct access to set a keyboarch shortcut to a single item, also using the command pallette
// TODO: test dynamically changing the set of custom statuses and having commands for each one.
// this.app.commands.removeCommand(ID) -- this is unsafe and not part of the public API it seems.

interface CheckboxOption {
  title: string;
  character: string;
}

const ALL_CHECKBOXES = [
  {
    title: 'to-do',
    character: ' ',
  },
  {
    title: 'incomplete',
    character: '/',
  },
  {
    title: 'done',
    character: 'x',
  },
  {
    title: 'canceled',
    character: '-',
  },
  {
    title: 'forwarded',
    character: '>',
  },
  {
    title: 'scheduling',
    character: '<',
  },
  {
    title: 'question',
    character: '?',
  },
  {
    title: 'important',
    character: '!',
  },
  {
    title: 'star',
    character: '*',
  },
  {
    title: 'quote',
    character: '"',
  },
  {
    title: 'location',
    character: 'l',
  },
  {
    title: 'bookmark',
    character: 'b',
  },
  {
    title: 'information',
    character: 'i',
  },
  {
    title: 'savings',
    character: 'S',
  },
  {
    title: 'idea',
    character: 'I',
  },
  {
    title: 'pros',
    character: 'p',
  },
  {
    title: 'cons',
    character: 'c',
  },
  {
    title: 'fire',
    character: 'f',
  },
  {
    title: 'key',
    character: 'k',
  },
  {
    title: 'win',
    character: 'w',
  },
  {
    title: 'up',
    character: 'u',
  },
  {
    title: 'down',
    character: 'd',
  },
  {
    title: 'draft pull request',
    character: 'D',
  },
  {
    title: 'open pull request',
    character: 'P',
  },
  {
    title: 'merged pull request',
    character: 'M',
  },
];

export default (plugin: MyPluginInterface): Command => ({
  id: 'quick-command',
  name: 'quick command',
  hotkeys: [{ modifiers: ["Mod", "Shift"], key: "l" }],
  editorCallback: (editor: Editor, view: MarkdownView) => {
    new ExampleModal(plugin.app, editor).open();
  }
});

export class ExampleModal extends SuggestModal<CheckboxOption> {
  editor: Editor;

  constructor(app: App, editor: Editor) {
    super(app);
    this.editor = editor;
  }

  getSuggestions(query: string): CheckboxOption[] {
    return ALL_CHECKBOXES.filter((option) =>
      option.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  renderSuggestion(option: CheckboxOption, el: HTMLElement) {
    el.setCssStyles({
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      textAlign: 'center',
    });

    // const label = el.createEl("label");
    // label.classList.add('task-list-label');
    const input = el.createEl('input', { attr: { 'type': 'checkbox', 'data-task': option.character } });
    input.classList.add('task-list-item');
    input.checked = option.character !== ' ';

    const span = el.createEl("span", { text: option.title });
    span.classList.add('cm-list-1')
  }

  onChooseSuggestion(option: CheckboxOption, evt: MouseEvent | KeyboardEvent) {
    new Notice(`Selected ${option.title}`);

    const currentLine = this.editor.getCursor().line;
    const text = this.editor.getLine(currentLine);
    console.log(text);

    const regex = /^(\s*[-*]\s)\[[^\]]\]?(.*)$/
    const newText = text.replace(regex, `$1[${option.character}]$2`)
    console.log(newText);

    this.editor.setLine(currentLine, newText);
  }
}

export class ExampleModal1 extends FuzzySuggestModal<CheckboxOption> {
  editor: Editor;

  constructor(app: App, editor: Editor) {
    super(app);
    this.editor = editor;
  }

  getItems(): CheckboxOption[] {
    return ALL_CHECKBOXES;
  }

  getItemText(book: CheckboxOption): string {
    return book.title;
  }

  onChooseItem(selection: CheckboxOption, evt: MouseEvent | KeyboardEvent) {
    new Notice(`Selected ${selection.title}`);

    const currentLine = this.editor.getCursor().line;
    const text = this.editor.getLine(currentLine);
    console.log(text);

    const regex = /^(\s*[-*]\s)\[[^\]]\]?(.*)$/
    const newText = text.replace(regex, `$1[${selection.character}]$2`)
    console.log(newText);

    this.editor.setLine(currentLine, newText);
  }
}
