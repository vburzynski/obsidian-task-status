# Behavior

This is a bunch of notes attempting to capture and define the rules and behavior of the plugin

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
