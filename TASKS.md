# Roadmap

- [x] expand beyond a single line
  - [x] add the ability to select multiple lines (range of lines)
  - [x] support multiple selections
- [x] Functionality
  - [x] on a non-checkbox lines, add the checkbox markup with the selected character marking

## Future Roadmap

### customization and configuration

- [ ] make the accents customizable through the settings
- [ ] customize the checkbox options using the settings menu
- [ ] ability to customize all of the options
- [ ] ability to add and remove options
- [ ] ability to rename
- [ ] ability to have aliases (maybe this is just extending the description and showing a comma separated list)
- [ ] ability to reorder the options
- [ ] the settings should have presets for common themes like Things, Minimal, etc.

### reuse last status

- [ ] auto memoize/cache/store/persist the previously used status
- [ ] command to quickly re-apply last status
- [ ] ability to toggle between no marker and last used marker
  - for now, you can use a combination of `Cycle bullet/checkbox`; `Toggle bullet list`; and the checkbox quick-menu

### Commands and Hotkeys

- implement individual command for each type of custom checkbox accent
  - this is allow users to directly apply a custom accent through either a hotkey or command palette.

### Single Line Selection Feature

```text
Feature: Single-Line Selections

Scenario: blank line
  GIVEN a blank line is selected
  WHEN a selection is made with the checkbox status quick menu
  THEN insert a task item accented with the selected status marker

Scenario: mid-line selection
  GIVEN an editor selection
  WHEN the start of the selection is mid-line
  AND a checkbox marker is applied to the first line 
  THEN the marker should appear at the start of the line
  BUT the marker should appear after any indentation
  AND the marker should appear after any callout or block quote markers
```

### Multiple Line Selection Features

```text
Feature: Multi-Line Selections

Scenario: Obsidian Callouts
  GIVEN a user has selected a multiple lines of text
  WHEN an obsidian callout is part of that selection
  THEN don't add a check box markers to the lines comprising the callout

Scenario: Code Blocks
  GIVEN a user has selected multiple lines of text
  WHEN a code block is part of that selection
  THEN don't add check box markers to any lines of the code block
```

## Bug Fixes

- [x] making a multi-line selection in reverse (down to up), doesn't work
- [ ] when a selection range doesn't start at the beginning of a line, the checkbox marker gets added at the start of the selection, not the start of the line.

## Other Ideas

- [ ] ability to quickly make a checkbox into a non-checkbox.
  - would this become a list item or regular text?
- [ ] test dynamically changing the set of custom statuses and having commands for each one.
  - this would allow direct access to set a keyboard shortcut to a single item, also using the command pallette
  - this.app.commands.removeCommand(ID) -- this is unsafe and not part of the public API it seems.
