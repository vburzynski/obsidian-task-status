## AnuPpuccin

```css
.anp-custom-checkboxes [data-task=">"] > input[type=checkbox]:checked,
.anp-custom-checkboxes [data-task=">"] > p > input[type=checkbox]:checked, .anp-custom-checkboxes [data-task=">"][type=checkbox]:checked {
  --checkbox-color: transparent;
  --checkbox-color-hover: transparent;
  border-width: 0;
}
.anp-custom-checkboxes [data-task=">"] > input[type=checkbox]:checked:after,
.anp-custom-checkboxes [data-task=">"] > p > input[type=checkbox]:checked:after, 
.anp-custom-checkboxes [data-task=">"][type=checkbox]:checked:after {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3C!--!  --%3E%3Cpath d='M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z'/%3E%3C/svg%3E");
  -webkit-mask-size: contain;
  background-color: rgb(var(--ctp-sapphire));
  left: 0px;
}
.anp-custom-checkboxes [data-task=">"] > input[type=checkbox]:checked:before,
.anp-custom-checkboxes [data-task=">"] > p > input[type=checkbox]:checked:before, 
.anp-custom-checkboxes [data-task=">"][type=checkbox]:checked:before {
  color: rgb(var(--ctp-sapphire));
  margin: 0 3px;
  position: absolute;
  left: calc(var(--checkbox-size) * 1);
  font-weight: bold;
}
.anp-custom-checkboxes-labels [data-task=">"] input[type=checkbox]:checked:before, 
.anp-custom-checkboxes-labels [data-task=">"][type=checkbox]:checked:before {
  content: "RSCH";
}
```

<https://github.com/AnubisNekhet/AnuPpuccin/blob/main/src/modules/Features/custom-checkboxes.scss>

- `anp-custom-checkboxes-labels` goes into the `<body>` styles
- `.anp-custom-checkboxes [data-task=">"] > input[type=checkbox]:checked` has a specificity off **`0,4,1`**

## Minimal Theme

```css
/* [>] Forwarded */
input[data-task=">"],
li[data-task=">"] > input,
li[data-task=">"] > p > input, {
	&:checked {
		color:var(--text-faint);
		transform:rotate(90deg);
		-webkit-mask-position:50% 100%;
		-webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z' /%3E%3C/svg%3E");
	}
}
```

<https://github.com/kepano/obsidian-minimal/blob/8cb709a373c9601a9e9172eaa75fdbeba4412c43/src/scss/features/checklist-icons.scss#L9>

- `input[data-task=">"]` has a specificity of **`0,1,1`**
- `li[data-task=">"] > input` has a specificity off **`0,1,2`**

## Things Theme

```css
input[data-task='>']:checked,
li[data-task='>'] > input:checked,
li[data-task='>'] > p > input:checked {
  color: var(--text-faint);
  transform: rotate(90deg);
  -webkit-mask-position: 50% 100%;
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z' /%3E%3C/svg%3E");
}
```

<https://github.com/colineckert/obsidian-things/blob/main/theme.css>

- `input[data-task='>']:checked` has a specificity of **`0,2,1`**
- `li[data-task='>'] > input:checked` has a specificity of **`0,2,2`**

## ITS Theme

```css
body:not(.alt-chkbx-off) .markdown-source-view.mod-cm6 .HyperMD-task-line[data-task]:is([data-task=X],
[data-task=">"],
[data-task="<"]) :is(.task-list-label, p) > input:is([type=checkbox], [type=checkbox i]):checked, body:not(.alt-chkbx-off) .markdown-source-view.mod-cm6 .HyperMD-task-line[data-task]:is([data-task=X],
[data-task=">"],
[data-task="<"]) > input:is([type=checkbox], [type=checkbox i]):checked, body:not(.alt-chkbx-off) .task-list-item.is-checked:is([data-task=X],
[data-task=">"],
[data-task="<"]) :is(.task-list-label, p) > input:is([type=checkbox], [type=checkbox i]):checked, body:not(.alt-chkbx-off) .task-list-item.is-checked:is([data-task=X],
[data-task=">"],
[data-task="<"]) > input:is([type=checkbox], [type=checkbox i]):checked {
  background-color: transparent;
  font: var(--its);
  font-family: var(--its);
  font-size: inherit;
  font-weight: 10;
  text-align: center;
  border: 0;
  cursor: pointer;
  -webkit-mask-image: unset;
}

body:not(.alt-chkbx-off) .markdown-source-view.mod-cm6 .HyperMD-task-line[data-task]:is([data-task=X],
[data-task=">"],
[data-task="<"]) :is(.task-list-label, p) > input:is([type=checkbox], [type=checkbox i]):checked::after, body:not(.alt-chkbx-off) .markdown-source-view.mod-cm6 .HyperMD-task-line[data-task]:is([data-task=X],
[data-task=">"],
[data-task="<"]) > input:is([type=checkbox], [type=checkbox i]):checked::after, body:not(.alt-chkbx-off) .task-list-item.is-checked:is([data-task=X],
[data-task=">"],
[data-task="<"]) :is(.task-list-label, p) > input:is([type=checkbox], [type=checkbox i]):checked::after, body:not(.alt-chkbx-off) .task-list-item.is-checked:is([data-task=X],
[data-task=">"],
[data-task="<"]) > input:is([type=checkbox], [type=checkbox i]):checked::after {
  background-color: transparent;
  top: -4px;
  left: 0px;
  -webkit-mask-image: unset;
}

body:not(.alt-chkbx-off) .markdown-source-view.mod-cm6 .task-list-item-checkbox[data-task=">"]::after, 
body:not(.alt-chkbx-off) .task-list-item.is-checked[data-task=">"] > input[type=checkbox]:checked::after, 
body:not(.alt-chkbx-off) .task-list-item.is-checked[data-task=">"] p > input[type=checkbox]:checked::after {
  content: "\ec03";
  color: var(--text-normal);
}
```

<https://github.com/SlRvb/Obsidian--ITS-Theme/blob/main/Snippets/S%20-%20Checkboxes.css>

- `body:not(.alt-chkbx-off) .markdown-source-view.mod-cm6 .HyperMD-task-line[data-task]:is([data-task=X], [data-task=">"], [data-task="<"]) :is(.task-list-label, p) > input:is([type=checkbox], [type=checkbox i]):checked` has a specificity of `0,9,2`
- `body:not(.alt-chkbx-off) .markdown-source-view.mod-cm6 .task-list-item-checkbox[data-task=">"]::after` has a specificity of **`0,5,2`**
- `body:not(.alt-chkbx-off) .task-list-item.is-checked[data-task=">"] > input[type=checkbox]:checked::after` has a specificity of **`0,6,3`**

## Border

```css
body:not(.disable-alternative-checkboxes) input[data-task="!"]:checked,
body:not(.disable-alternative-checkboxes) li[data-task="!"]>input:checked,
body:not(.disable-alternative-checkboxes) li[data-task="!"]>p>input:checked {
    --checkbox-color: var(--color-orange);
    --checkbox-color-hover: var(--color-orange);
}
```

<https://github.com/Akifyss/obsidian-border/blob/main/theme.css>

- `body:not(.disable-alternative-checkboxes) input[data-task="!"]:checked` has a specificity of **`0,3,2`**
