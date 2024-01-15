import { Theme } from "./types";

/**
 * Status supported by the Ebullientworks theme.
 * {@link https://github.com/ebullient/obsidian-theme-ebullientworks}
 */
export const EbullientworksTheme: Theme = {
  name: 'Ebullientworks Theme',
  statuses: [
    { character: ' ', title: 'Unchecked' },
    { character: 'x', title: 'Checked' },
    { character: '-', title: 'Cancelled' },
    { character: '/', title: 'In Progress' },
    { character: '>', title: 'Deferred' },
    { character: '!', title: 'Important' },
    { character: '?', title: 'Question' },
    { character: 'r', title: 'Review' },
  ],
};
