import { Theme } from "./types";

/**
 * Status supported by the LYT Mode theme.
 * {@link https://github.com/nickmilo/LYT-Mode}
 */
export const LYTModeTheme: Theme = {
  name: 'LYT Mode Theme',
  statuses: [
    { character: ' ', title: 'Unchecked' },
    { character: 'x', title: 'Checked' },
    { character: '>', title: 'Rescheduled' },
    { character: '<', title: 'Scheduled' },
    { character: '!', title: 'Important' },
    { character: '-', title: 'Cancelled' },
    { character: '/', title: 'In Progress' },
    { character: '?', title: 'Question' },
    { character: '*', title: 'Star' },
    { character: 'n', title: 'Note' },
    { character: 'l', title: 'Location' },
    { character: 'i', title: 'Information' },
    { character: 'I', title: 'Idea' },
    { character: 'S', title: 'Amount' },
    { character: 'p', title: 'Pro' },
    { character: 'c', title: 'Con' },
    { character: 'b', title: 'Bookmark' },
    { character: 'f', title: 'Fire' },
    { character: 'k', title: 'Key' },
    { character: 'w', title: 'Win' },
    { character: 'u', title: 'Up' },
    { character: 'd', title: 'Down' },
  ],
};
