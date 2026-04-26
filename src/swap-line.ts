import SwapCheckboxStatus from './swap-checkbox-status';

export default function swapInLine(content: string, line: number, marker: string): string {
  const lines = content.split('\n');
  if (line < 0 || line >= lines.length) return content;

  const original = lines[line];
  const replacement = SwapCheckboxStatus.replaceLine(original, marker);
  if (replacement === original) return content;

  lines[line] = replacement;
  return lines.join('\n');
}
