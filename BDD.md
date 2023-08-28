# Behaviors

This isn't a complete set of behaviors, just some that I started writing

```gherkin
Feature: Single-Line Selections

Scenario: blank line
  GIVEN a blank line is selected
  WHEN a selection is made with the checkbox status quick menu
  THEN insert a task item accented with the selected status marker

Scenario: Ignore Headings
  GIVEN a heading is selected
  WHEN a custom task status is selected
  THEN the heading doesn't change

Feature: Multi-Line Selections

Scenario: blank lines
  GIVEN a selection range spanning multiple lines
  AND some of those lines are blank
  WHEN a custom task status is selected
  THEN the blank lines do not change

Scenario: headings
  GIVEN a selection range spanning multiple lines
  AND some of those lines are headings
  WHEN a custom task status is selected
  THEN the headings do not change

Scenario: Selection includes an Obsidian Callout
  GIVEN a user has selected multiple lines of text
  WHEN an obsidian callout is part of that selection
  THEN don't apply a task marker to the first line of any callout blocks

Feature: Auto-correct mid-line selections

Scenario: fragment of a single-line
  GIVEN a selection range spanning a fragment of a single line
  AND the start of the selection is midway through the line
  WHEN a custom task status is selected
  THEN the task marking is applied at the start of the line 
  AND not in the middle of the line

Scenario: mid-line selection
  GIVEN an editor selection
  AND the start of the selection is mid-line
  AND the first line contains plain text
  WHEN a custom task marker is applied
  THEN the marker should appear at the start of the content
  AND the marker should appear after any indentation
  AND the marker should appear after any callout or block quote markers
```
