import { Theme } from "./types";

/**
 * Statuses supported by the Border theme.
 * {@link https://github.com/Akifyss/obsidian-border}
 */
export const BorderTheme: Theme = {
  name: 'Border Theme',
  statuses: [
    // Basic
    { character: ' ', title: 'To Do' },
    { character: '/', title: 'In Progress' },
    { character: 'x', title: 'Done' },
    { character: '-', title: 'Canceled' },
    { character: '>', title: 'Rescheduled' },
    { character: '<', title: 'Scheduled' },
    // Extras
    { character: '!', title: 'Important' },
    { character: '?', title: 'Question' },
    { character: 'i', title: 'Information' },
    { character: 'S', title: 'Amount' },
    { character: '*', title: 'Star' },
    { character: 'b', title: 'Bookmark' },
    { character: '"', title: 'Quote' },
    { character: 'n', title: 'Note' },
    { character: 'l', title: 'Location' },
    { character: 'I', title: 'Idea' },
    { character: 'p', title: 'Pro' },
    { character: 'c', title: 'Con' },
    { character: 'u', title: 'up' },
    { character: 'd', title: 'down' },
  ]
};
