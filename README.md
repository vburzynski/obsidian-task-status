# Obsidian Task Quick Menu

A plugin to dynamically and indiscriminately change the checkbox markers (aka status, accent, or signifier) on the current line of text. using  `⌘ + Shift + L` on a mac, or `CTRL + Shift + L` on windows, will display a semantically searchable quick menu which displays the available checkbox statuses you have configured.

## Why this plugin?

- keyboard driven
  - there's a focus on keeping your hands on the keyboard
  - bypass the need for your hands to jump between keys and mouse/trackball/trackpad
- semantically searchable quick menu
  - stateless and enables the ability to quickly and indiscriminately jump between any checkbox status
  - fuzzy finder -- you don't have to remember which text character maps to a task status
  - presentation enables a quick linear scan through the list of options
- minimal configuration
  - add pre-defined sets of status markers via settings
  - easily customize your own status markers
- our goal is to complement other task related plugins

## How is this different from what is available?

`obsidian-tasks`

My impression is that the main focus of this plugin is on the management and searching of metadata related to tasks. This enables an impressive set of additional functionality to obsidian's built in tasks and checkboxes. You can edit all the tasks' inline metadata via UI modals or popups. Towards checkbox status (markings/accents), however, there's not an easy way to jump to another status. Every status state for a checkbox, the plugin allows you to define the next status that follows when that status is "done". You can create a user-configurable pre-determined state-machine like sequence of statuses represented by an acyclic graph where every single status node has a single output (a single outgoing transition). It supports many different statuses, but to set any of them, you would either have to manually type the marker yourself or configure the plugin so you could loop through your common statuses. This is great when you have a set of independent workflows or a small set of markers to iterate through.

`obsidian-task-collector`

The unique aspect of this plugin seems to be the collection mechanism. You can setup a workflow that, when you trigger the collection action, moves tasks to another heading group in the document. You could even configure a workflow where tasks have some simple transformations applied when getting collected into a group. There is a popup modal to select a task marker, but you only see the marker and the character used inside the checkbox. You don't see the semantic status names that the markings signify. The modal isn't searchable, though you can type the character you want to have appear in the checkbox. Scanning through the grid layout on the modal requires Z/F or S pattern eye movements. The layout is nicely optimized for mouse interaction as the options are clustered into a tight grouping.

`obsidian-task-marker`

The modal provided by this plugin seemed pretty similar to the one in `obsidian-task-collector` with some additional commands to mark the tasks in the current document

`obsidian-toggle-list`

This also has some mechanisms for adding custom markings and metadata to tasks, but I've admittedly not dug too deep into what's there. Towards the status markers, you can create different state groups and there are mechanisms to cycle through the states in the groups.

## Current Limitations

- Headings
- Code Blocks
  - Any part of a code block that is selected will have the task markers appended to the front
- Obsidian Callouts
  - While you can select content within a callout (or block quote), the plugin does not yet ignore the starting line of the callout (the line that contains the callout type `[!info]` and title)
- Obsidian Comments
  - The plugin doesn't yet ignore these lines either
  - If a comment is part of your selection range, those lines will also have the checkbox marker appended to the front of the line.
