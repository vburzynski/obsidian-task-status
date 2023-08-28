# Obsidian Task Status Quick Menu

A plugin to dynamically and indiscriminately change the task checkbox markers (aka status, accent, or signifier) on the current line of text.

## Instructions

Select one or more lines of text using cursors or a selection range. Then use `⌘ + Shift + L` on a
mac, or `CTRL + Shift + L` on windows, to display a semantically searchable quick menu to navigate
and apply one of several custom task status markers. Applying a task status marker will both swap
existing task markers and transform non-task content into tasks. The custom statues are configurable
and customizable through the plugin settings. Please note, that this plugin assumes that you have
either installed an Obsidian theme which includes custom task status styling (such as Things or
Minimal), or that you've created and applied your own CSS snippet to style tasks.

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

## Overview of Behavior

- The plugin works with various types of selections:
  - single cursor placement
  - a selection range covering one or more lines
  - multiple cursors
  - multiple selection ranges
- general transformation behavior:
  - headings are ignored - no text transformation is applied
  - horizontal rules are ignored - no text transformation is applied
  - 
  - the text transformation detects and retains any indentation
  - you can select and transform content within a quote block or a nested quote block
  - you can select content within an obsidian callout
  - a cursor selection on a blank line will transform it into a task
  - on the other hand, blank lines within a selection range are ignored

## Current Known Limitations

- **Headings**
  - I've not yet determined if there's a use case or scenario where one might desire for a heading to be transformed into a task.
  - To avoid accidentally transforming a heading, they are ignored by the plugin when selected
  - Plugin currently supports ATX Headings (with `#` prefix); it will treat Setext headings a
- **Code Blocks**
  - Any part of a code block that is selected will have the task markers appended to the front
  - Until this is fixed, avoid including any part of a code block inside your text selections
- **Obsidian Comments**
  - If a comment is part of your selection range, those lines will also have the checkbox marker appended to the front of the line (as if they were just text content and not a comment).
