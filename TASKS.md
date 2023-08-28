# Roadmap

- [x] expand beyond a single line
  - [x] add the ability to select multiple lines (range of lines)
  - [x] support multiple selections
- [x] Functionality
  - [x] on a non-checkbox lines, add the checkbox markup with the selected character marking

## Current Behavior

- the initial code processes most things as single lines of text
  - incidentally, most inline formatting or inline blocks are handled in a natural manner.
  - anything not identified as having a special purpose is just treated as if it's another line of text.
- Lines of text and paragraphs
  - Each selected line of text will be transformed into a task item
- Indentation
  - when applying a custom tasks status, indentation should be preserved
  - supports various kinds of whitespace (spaces and tabs)
- Quote Blocks
  - Markers for quote blocks `>` are handled properly
  - Nested markers for quote blocks are handled properly
  - The custom task status will be applied inside the block
  - **example**: line nested inside two quote blocks
    - original text: `> > content`
    - transformed text: `> > -[x] content`
- Lists
  - task list items, ordered list items, and unordered list items, are transformed into task list items with the selected custom task marker.
- multi-line content isn't accounted for yet.
  - **examples**: setext headings, code blocks, and HTML
  - does not detect content that continues onto multiple lines
  - this includes both the lazy and non-lazy continuation syntax
- Callouts
  - the first line of a callout is ignored (it contains the callout type and optional title)

## Test/Define Behavior on various content

This is the start of an attempt to enumerate the number of scenarios that might need to be handled and/or tested

### Leaf Blocks

- [ ] Paragraphs and lines of text
  - [ ] paragraphs separated by blank line
  - [ ] paragraph with double space line break
  - [ ] paragraph with HTML line break `<br/>`
- [ ] thematic breaks (horizontal rules)
- [ ] ATX Headings
- [ ] Setext Headings
- [ ] Indented code blocks
- [ ] Fenced code blocks
  - [ ] Including extended syntax: `mermaid`, `dataview`, etc.
  - [ ] Including syntax theme
  - [ ] Excluding syntax theme
  - [ ] with tildas or with backticks
- [ ] HTML blocks
  - [ ] `<code>`, `<caption>`, `<div>`, `<img>` etc...
- [ ] Links
  - [ ] wiki links `[[link]]`
  - [ ] link with label and url `[label](url)`
  - [ ] link with label, url, and title `[label](http://example.com "title")`
  - [ ] reference-style link `[label][ref]`
  - [ ] MD Link with only reference `<url>`
  - [ ] Image Link - `![alt text](url-or-path)`
- [ ] Paragraphs
- [ ] Blank Lines

### Container Blocks

- [ ] Block Quotes
  - [ ] lazy continuation lines (omitting `>`)
  - [ ] non-lazy continuation lines (with `>`)
  - [ ] lines including a space after the marker
  - [ ] lines exclusing a space after the marker
  - [ ] lazy lines that don't include the marker itself
- [ ] Lists
  - [ ] lists included as part of a paragraph
  - [ ] lists included as part of a block (example: quote block)
- [ ] List Items
  - [ ] ordered (`*`, `-`, `+`)
  - [ ] unordered
  - [ ] alternating / mixed
  - [ ] with indented paragraphs (spanning multiple lines)
  - [ ] with indendted code blocks

## Inline

Note, for the most part all of these should just be incidentally handled already. There's little need to specifically test all scenarios here

- [ ] code span (inline code)
- [ ] emphasis / italics
- [ ] strong emphasis / bold
- [ ] inline links
  - [ ] inline markdown link
  - [ ] auto links
- [ ] inline images
- [ ] inline HTML
- [ ] hard-line breaks
  - [ ] double spaces
  - [ ] `<br/>`
- [ ] soft-line breaks
- [ ] strikethrough `~~text~~`
- [ ] task lists `- [x]`
- [ ] emoji `:emoji:` (not obsidian supported)
- [ ] highlight `==text==`
- [ ] subscript `~1~` (not obsidian supported)
- [ ] superscript `^1^` (not obsidian supported)
- [ ] inline HTML
  - [ ] subscript: `<sub>text</sub>`
  - [ ] superscript: `<sup>text</sup>`
  - [ ] hyperlinks: `<a href="example.com">label</a>`
  - [ ] others: `<i>`, `<b>`, `<span>` etc.

### Extended Syntax

This list includes a mix of leaf, container, and inline syntax

- [ ] Obsidian Links
  - [ ] internal links `[[link]]` (aka wikilinks)
  - [ ] internal links `[[path/link]]`
  - [ ] internal links `[[link|title]]`
  - [ ] internal links `[[path/link|title]]`
  - [ ] embedded files `![[path]]`
  - [ ] block reference `![[link#^id]]`
  - [ ] block anchor `^id`
- [ ] Obsidian Callouts `> [!note] title`
- [ ] Obsidian Comments
  - [ ] single line
  - [ ] inline
  - [ ] multi-line
- [ ] (Obsidian) MathJax / LaTex
  - [ ] inline (wrapped with single dollar signs `$`)
  - [ ] block notation (wrapped with double dollar signs `$$`)
- [ ] YAML Frontmatter
- [ ] JSON Frontmatter
- [ ] Definition Lists
  this is a line of text accompanied with a second line prefixed with a colon `:` marker.
- [ ] Tables
  - [ ] with vertial bars on the outside
  - [ ] omitting outside vertical bars
  - [ ] aligned and unaligned columns
- [ ] Footnotes
  - [ ] inline anchor `[^1]`
  - [ ] the reference at the bottom `[^1]: content`
- [ ] MDX

### Content Continuation

Some of these are captured above, but there's interesting ways to compose all the syntax situations.

- paragraphs with soft line breaks
- list items with paragraph continuation text
- list items with code block continuation text
- list items with quote block continuation text
- consecutive blocks with blank lines in between
- consecutive lists or blocks separated by thematic breaks (horizontal rules).
- lazy continuation of blocks
- non-lazy continuation of blocks
- nested block quotes with various combinations of continuation texts

A lot of continuation text lines may just need to not be transformed into task items; but I'm curious if there's situations where the indentation may need to be adjusted.

### List Considerations

- list markers can have `1<=N<=4` spaces of width
- continuations lines match that width in indentation
- a list marker might start with a width of 4: `1.  text`
  - then be changed to a width of 2 `- [ ] text`
  - the continuation content must also change.

```markdown
1. list item
   continuation paragraph
```

I believe you would have this:

```md
- [ ] list item
  continuation paragraph
```

```markdown
1. list item
   continuation paragraph
2. text
3. text
4. text
5. text
6. text
7. text
8. text
9. text
10. text
11. text
    text
```

### Notes

### References for the specifications and syntax

- <https://www.markdownguide.org/cheat-sheet/>
- <https://www.markdownguide.org/basic-syntax/>
- <https://help.obsidian.md/Editing+and+formatting/Advanced+formatting+syntax>
- <https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax>
- <https://help.obsidian.md/Editing+and+formatting/Obsidian+Flavored+Markdown>

## Future Roadmap

### customization and configuration

- [x] make the accents customizable through the settings
- [x] customize the checkbox options using the settings menu
- [x] ability to customize all of the options
- [x] ability to add and remove options
- [x] ability to rename
- [x] ability to reorder the options
- [ ] ability to have aliases (maybe this is just extending the description and showing a comma separated list)
- [ ] the settings should have presets for common themes like Things, Minimal, etc.

### reuse last status

- [ ] auto memoize/cache/store/persist the previously used status
- [ ] command to quickly re-apply last status
- [ ] ability to toggle between no marker and last used marker
  - for now, you can use a combination of `Cycle bullet/checkbox`; `Toggle bullet list`; and the checkbox quick-menu

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
- [ ] test dynamically changing the set of custom statuses and having commands for each one.
  - this would allow direct access to set a keyboard shortcut to a single item, also using the command pallette
  - this.app.commands.removeCommand(ID) -- this is unsafe and not part of the public API it seems.
