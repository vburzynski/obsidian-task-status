import { Theme } from "./types";

/**
 * Statuses supported by the Things theme.
 * {@link https://github.com/colineckert/obsidian-things}
 */
export const ThingsTheme: Theme = {
  name: 'Things Theme',
  statuses: [
    // Basic
    { character: ' ', title: 'to-do' },
    { character: '/', title: 'incomplete' },
    { character: 'x', title: 'done' },
    { character: '-', title: 'canceled' },
    { character: '>', title: 'forwarded' },
    { character: '<', title: 'scheduling' },
    // Extras
    { character: '?', title: 'question' },
    { character: '!', title: 'important' },
    { character: '*', title: 'star' },
    { character: '"', title: 'quote' },
    { character: 'l', title: 'location' },
    { character: 'b', title: 'bookmark' },
    { character: 'i', title: 'information' },
    { character: 'S', title: 'savings' },
    { character: 'I', title: 'idea' },
    { character: 'p', title: 'pros' },
    { character: 'c', title: 'cons' },
    { character: 'f', title: 'fire' },
    { character: 'k', title: 'key' },
    { character: 'w', title: 'win' },
    { character: 'u', title: 'up' },
    { character: 'd', title: 'down' },
  ]
};

