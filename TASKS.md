# Tasks

## Brainstorming

### Feature: Quickly apply previously selected status

- [ ] auto memoize/cache/store/persist the previously used status
- [ ] command to quickly re-apply last status
- [ ] ability to toggle between no marker and last used marker
  - for now, you can use a combination of `Cycle bullet/checkbox`; `Toggle bullet list`; and the checkbox quick-menu
- [ ] test dynamically changing the set of custom statuses and having commands for each one.
  - this would allow direct access to set a keyboard shortcut to a single item, also using the command pallette
  - `this.app.commands.removeCommand(ID)` -- this is unsafe and not part of the public API it seems.

### Commands and Hotkeys

- [ ] implement individual command for each type of custom checkbox accent
  - this would allow users to directly apply a custom accent through either a hotkey or command palette.

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

## Release Workflow

```shell
git tag -a 1.1.0 -m "1.1.0"
git push origin 1.1.0
gh release create "1.1.0" --title="1.1.0" --draft main.js manifest.json styles.css
```
