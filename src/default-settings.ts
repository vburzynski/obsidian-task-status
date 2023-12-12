import { MyPluginSettings } from './types';

const DEFAULT_SETTINGS: MyPluginSettings = {
  mySetting: 'default',

  // prettier-ignore
  checkboxOptions: [
    { title: 'to-do',               character: ' ' },
    { title: 'incomplete',          character: '/' },
    { title: 'done',                character: 'x' },
    { title: 'canceled',            character: '-' },
    { title: 'forwarded',           character: '>' },
    { title: 'scheduling',          character: '<' },
    { title: 'question',            character: '?' },
    { title: 'important',           character: '!' },
    { title: 'star',                character: '*' },
    { title: 'quote',               character: '"' },
    { title: 'location',            character: 'l' },
    { title: 'bookmark',            character: 'b' },
    { title: 'information',         character: 'i' },
    { title: 'savings',             character: 'S' },
    { title: 'idea',                character: 'I' },
    { title: 'pros',                character: 'p' },
    { title: 'cons',                character: 'c' },
    { title: 'fire',                character: 'f' },
    { title: 'key',                 character: 'k' },
    { title: 'win',                 character: 'w' },
    { title: 'up',                  character: 'u' },
    { title: 'down',                character: 'd' },
    { title: 'draft pull request',  character: 'D' },
    { title: 'open pull request',   character: 'P' },
    { title: 'merged pull request', character: 'M' },
  ],
};

export default DEFAULT_SETTINGS;
