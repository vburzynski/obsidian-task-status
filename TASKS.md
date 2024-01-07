# Release Roadmap

- [x] expand beyond a single line
  - [x] add the ability to select multiple lines (range of lines)
  - [x] support multiple selections
- [x] Functionality
  - [x] on a non-checkbox lines, add the checkbox markup with the selected character marking
- [ ] Testing
  - [x] Test on mac
  - [ ] Test on mobile (iOS)
  - [ ] Test on windows
  - [ ] Test on linux
- [x] Review the README
- [ ] check the `manifest.json`
- [ ] check the semantic versioning
- [ ] follow the obsidian guide to release the plugin
  - [x] create repository on GitHub
  - [ ] create a release
  - [ ] submit plugin for review
  - [ ] address review comments
- [ ] Pick out a License
- [ ] Figure out the workflow and steps needed to submit plugin officially

## Future Roadmap

### customization and configuration

- [x] make the accents customizable through the settings
- [x] customize the checkbox options using the settings menu
- [x] ability to customize all of the options
- [x] ability to add and remove options
- [x] ability to rename
- [x] ability to reorder the options
- [ ] ability to have aliases
  - maybe this is just extending the description and showing a comma separated list)
- [ ] the settings should have presets for common themes like Things, Minimal, etc.
- [ ] Implement Workflow Customization
  - [ ] enable/disable transforming non-task lines into tasks
  - [ ] enable an optional second step which prompts whether to transform tasks, non-tasks, or both.
  - [ ] alternatively -- split into three commands:
    - [ ] apply the task status transformation only to task lines
    - [ ] apply the task status transformation only to non-task lines
    - [ ] apply the task status transformation to both types of lines
  - [ ] should the commands not have default hotkeys assigned?

### Feature: Quickly apply previously selected status

- [ ] auto memoize/cache/store/persist the previously used status
- [ ] command to quickly re-apply last status
- [ ] ability to toggle between no marker and last used marker
  - for now, you can use a combination of `Cycle bullet/checkbox`; `Toggle bullet list`; and the checkbox quick-menu
- [ ] test dynamically changing the set of custom statuses and having commands for each one.
  - this would allow direct access to set a keyboard shortcut to a single item, also using the command pallette
  - `this.app.commands.removeCommand(ID)` -- this is unsafe and not part of the public API it seems.

### Commands and Hotkeys

- implement individual command for each type of custom checkbox accent
  - this is allow users to directly apply a custom accent through either a hotkey or command palette.

### Multiple Line Selection Features

```text
Feature: Ignore certain content blocks

Scenario: Selection includes a Code Block
  GIVEN a user has selected multiple lines of text
  WHEN a code block is part of that selection
  THEN don't add check box markers to any lines of the code block

Scenario: Selection includes a Single Line Obsidian Comment
  GIVEN a user has selected multiple lines of text
  AND some of those lines are single-line comments
  WHEN a custom task status is applied
  THEN don't modify any of the single-line comments

Scenario: Selection includes a Multi-Line Obsidian Comment
  GIVEN a user has selected multiple lines of text
  AND some of those lines are multi-line comments
  WHEN a custom task status is applied
  THEN don't modify any lines of the comments

Scenario: start of selection intersects with a multi-line comment block
Scenario: end of selection intersects with a multi-line comment block
Scenario: start of selection intersects with a code block
Scenario: end of selection intersects with a code block
Scenario: start of selection intersects with a callout block
Scenario: end of selection intersects with a callout block
```

## Bug Fixes

- [x] making a multi-line selection in reverse (down to up), doesn't work
- [x] when a selection range doesn't start at the beginning of a line, the checkbox marker gets added at the start of the selection, not the start of the line.

## Other Ideas

- [ ] ability to quickly make a checkbox into a non-checkbox.
  - would this become a list item or regular text? (probably an unordered list item)

## Release Workflow

```shell
git tag -a 1.0.5 -m "1.0.5"
git push origin 1.0.5
gh release create "1.0.5" --title="1.0.5" --draft main.js manifest.json styles.css
```
