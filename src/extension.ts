// FILE: src/extension.ts
// 🚨 REPLACE THE ENTIRE CONTENTS OF THIS FILE WITH THE BLOCK BELOW
import * as vscode from "vscode";

/**
 * Entry-point: called the first time the command is executed.
 */
export function activate(context: vscode.ExtensionContext) {
  // Register the command and wire it up to our implementation.
  const disposable = vscode.commands.registerCommand(
    "trim-pluses.trimPluses",
    trimPluses
  );

  context.subscriptions.push(disposable);
}

/**
 * Command implementation: strip a leading “+” from every line
 * in the current selection (or entire document if nothing selected).
 */
async function trimPluses() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  const { document, selections } = editor;

  // If no text is selected, operate on the whole file.
  const targetRanges = selections.some((sel) => !sel.isEmpty)
    ? selections
    : [
        new vscode.Range(
          document.positionAt(0),
          document.positionAt(document.getText().length)
        ),
      ];

  const edit = new vscode.WorkspaceEdit();

  for (const range of targetRanges) {
    const original = document.getText(range);
    const transformed = original.replace(/^\+/gm, "");
    if (original !== transformed) {
      edit.replace(document.uri, range, transformed);
    }
  }

  await vscode.workspace.applyEdit(edit);
}

export function deactivate() {}
