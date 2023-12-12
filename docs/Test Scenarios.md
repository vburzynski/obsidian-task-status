# Test/Define Behavior on various content

- This is the start of an attempt to enumerate the number of scenarios that might need to be handled and/or tested
- There's probably opportunity to combine a lot of this, and focus on outliers and patterns instead.

## Leaf Blocks

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

## Container Blocks

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

## References for the specifications and syntax

- <https://www.markdownguide.org/cheat-sheet/>
- <https://www.markdownguide.org/basic-syntax/>
- <https://help.obsidian.md/Editing+and+formatting/Advanced+formatting+syntax>
- <https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax>
- <https://help.obsidian.md/Editing+and+formatting/Obsidian+Flavored+Markdown>
