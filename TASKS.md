# Roadmap

- [x] expand beyond a single line
  - [x] add the ability to select multiple lines (range of lines)
  - [x] support multiple selections
- [ ] Functionality
  - [ ] on a non-checkbox lines, add the checkbox markup with the selected character marking
- [ ] customization
  - [ ] make the accents customizable through the settings
  - [ ] customize the checkbox options using the settings menu
  - [ ] ability to customize all of the options
  - [ ] ability to add and remove options
  - [ ] ability to rename
  - [ ] ability to have aliases (maybe this is just extending the description and showing a comma separated list)
  - [ ] ability to reorder the options
  - [ ] the settings should have presets for common themes like Things, Minimal, etc.
- [ ] reuse
  - [ ] auto memoize/cache/store the previously used status
  - [ ] command to quickly reuse re-apply last status
  - [ ] command to toggle between no marker and last used marker
  - [ ] command for each type of checkbox accent;

## Bug Fixes

- [ ] making a multi-line selection in reverse (down to up), doesn't work

## Other Ideas

- [ ] ability to quickly make a checkbox into a non-checkbox. (would this become a list item or regular text?)
- [ ] test dynamically changing the set of custom statuses and having commands for each one.
  - this would allow direct access to set a keyboard shortcut to a single item, also using the command pallette
  - this.app.commands.removeCommand(ID) -- this is unsafe and not part of the public API it seems.
