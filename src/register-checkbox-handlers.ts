import { MarkdownView, TFile } from 'obsidian';
import { TaskStatusPluginInterface } from './types';
import QuickActionModal from './modals/quick-action-modal';

const MOVEMENT_THRESHOLD_PX = 10;

export default function registerCheckboxHandlers(plugin: TaskStatusPluginInterface) {
  const root = plugin.app.workspace.containerEl;

  let timer: number | null = null;
  let startX = 0;
  let startY = 0;
  let pendingTarget: HTMLInputElement | null = null;
  let suppressClick = false;

  const cancel = () => {
    if (timer !== null) {
      window.clearTimeout(timer);
      timer = null;
    }
    pendingTarget = null;
  };

  const isCheckbox = (n: EventTarget | null): n is HTMLInputElement =>
    n instanceof HTMLInputElement && n.classList.contains('task-list-item-checkbox');

  plugin.registerDomEvent(
    root,
    'pointerdown',
    (evt: PointerEvent) => {
      if (!isCheckbox(evt.target)) return;
      if (!plugin.settings.enableReadingModeLongPress) return;
      cancel();
      pendingTarget = evt.target;
      startX = evt.clientX;
      startY = evt.clientY;
      timer = window.setTimeout(() => {
        const target = pendingTarget;
        timer = null;
        pendingTarget = null;
        if (!target) return;
        suppressClick = true;
        openModalForCheckbox(plugin, target);
      }, plugin.settings.longPressDurationMs);
    },
    true
  );

  plugin.registerDomEvent(
    root,
    'pointermove',
    (evt: PointerEvent) => {
      if (timer === null) return;
      const dx = evt.clientX - startX;
      const dy = evt.clientY - startY;
      if (dx * dx + dy * dy > MOVEMENT_THRESHOLD_PX * MOVEMENT_THRESHOLD_PX) cancel();
    },
    true
  );

  plugin.registerDomEvent(root, 'pointerup', cancel, true);
  plugin.registerDomEvent(root, 'pointercancel', cancel, true);
  plugin.registerDomEvent(root, 'pointerleave', cancel, true);

  plugin.registerDomEvent(
    root,
    'click',
    (evt: MouseEvent) => {
      if (!isCheckbox(evt.target)) return;
      if (suppressClick) {
        suppressClick = false;
        evt.preventDefault();
        evt.stopPropagation();
      }
    },
    true
  );

  plugin.registerDomEvent(
    root,
    'contextmenu',
    (evt: MouseEvent) => {
      if (!isCheckbox(evt.target)) return;
      if (!plugin.settings.enableReadingModeLongPress) return;
      evt.preventDefault();
      cancel();
      openModalForCheckbox(plugin, evt.target);
    },
    true
  );
}

async function openModalForCheckbox(
  plugin: TaskStatusPluginInterface,
  checkbox: HTMLInputElement
) {
  const view = findOwningMarkdownView(plugin, checkbox);
  if (!view || !view.file) return;

  if (view.getMode() === 'preview') {
    openForReadingMode(plugin, view, checkbox);
  } else {
    openForLivePreview(plugin, view, checkbox);
  }
}

function findOwningMarkdownView(
  plugin: TaskStatusPluginInterface,
  node: HTMLElement
): MarkdownView | null {
  let owner: MarkdownView | null = null;
  plugin.app.workspace.iterateAllLeaves((leaf) => {
    if (owner) return;
    const v = leaf.view;
    if (v instanceof MarkdownView && v.containerEl.contains(node)) owner = v;
  });
  return owner;
}

function openForReadingMode(
  plugin: TaskStatusPluginInterface,
  view: MarkdownView,
  checkbox: HTMLInputElement
) {
  const file = view.file as TFile;
  const previewRoot = view.previewMode.containerEl;
  const all = previewRoot.querySelectorAll<HTMLInputElement>('input.task-list-item-checkbox');
  const domIndex = Array.from(all).indexOf(checkbox);
  if (domIndex < 0) return;

  const taskLines = (plugin.app.metadataCache.getFileCache(file)?.listItems ?? [])
    .filter((li) => li.task !== undefined)
    .map((li) => li.position.start.line);
  const taskLine = taskLines[domIndex];
  if (taskLine === undefined) return;

  new QuickActionModal(plugin.app, plugin, { kind: 'file', file, line: taskLine }).open();
}

function openForLivePreview(
  plugin: TaskStatusPluginInterface,
  view: MarkdownView,
  checkbox: HTMLInputElement
) {
  const editor = view.editor;
  // editor.cm is the underlying CodeMirror 6 EditorView; not in obsidian.d.ts but stable.
  const cm = (editor as unknown as { cm?: { posAtDOM?: (n: Node) => number } }).cm;
  if (!cm || typeof cm.posAtDOM !== 'function') return;

  const pos = cm.posAtDOM(checkbox);
  const lineCh = editor.offsetToPos(pos);
  editor.setSelection({ line: lineCh.line, ch: 0 }, { line: lineCh.line, ch: 0 });
  new QuickActionModal(plugin.app, plugin, { kind: 'editor', editor }).open();
}
