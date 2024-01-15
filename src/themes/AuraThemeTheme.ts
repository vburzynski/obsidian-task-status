import { Theme } from './types';

/**
 * Status supported by the Aura theme.
 * {@link https://github.com/ashwinjadhav818/obsidian-aura}
 */
export const AuraTheme: Theme = {
  name: 'Aura Theme',
  statuses: [
    { character: ' ', title: 'incomplete' },
    { character: 'x', title: 'complete / done' },
    { character: '-', title: 'cancelled' },
    { character: '>', title: 'deferred' },
    { character: '/', title: 'in progress, or half-done' },
    { character: '!', title: 'Important' },
    { character: '?', title: 'question' },
    { character: 'R', title: 'review' },
    { character: '+', title: 'Inbox / task that should be processed later' },
    { character: 'b', title: 'bookmark' },
    { character: 'B', title: 'brainstorm' },
    { character: 'D', title: 'deferred or scheduled' },
    { character: 'I', title: 'Info' },
    { character: 'i', title: 'idea' },
    { character: 'N', title: 'note' },
    { character: 'Q', title: 'quote' },
    { character: 'W', title: 'win / success / reward' },
    { character: 'P', title: 'pro' },
    { character: 'C', title: 'con' },
  ],
};
