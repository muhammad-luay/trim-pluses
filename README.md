# Trim Pluses

**Trim Pluses** is a lightweight Visual Studio Code extension that removes leading plus signs (`+`) from the beginning of each line in the selected text, or the entire document if no selection is made. It's particularly useful for cleaning up diff outputs, versioned changelogs, or other documents with leading markers.

---

## ✨ Features

- 🧹 **One-Click Cleanup**: Automatically removes all `+` prefixes from lines in your selection or file.
- 🔍 **Smart Selection Handling**: Works on current selections or the full document if nothing is selected.
- ⚡ **Fast and Efficient**: Uses native VS Code APIs for quick editing without external dependencies.

---

## 🚀 Getting Started

To activate the extension:

1. Launch the command palette:

   - **macOS**: `Cmd + Shift + P`
   - **Windows/Linux**: `Ctrl + Shift + P`

2. Type and select `Trim Pluses: Trim Pluses`.

### Using Keyboard Shortcut:

- **macOS**: `Shift + Option + T`
- **Windows/Linux**: `Shift + Alt + T`

This will remove all leading `+` characters from the selected lines or the entire document if nothing is selected.

---

## 🛠️ Development

To build and run the extension locally:

1. **Install dependencies**:

```bash
npm install
```

2. **Build using esbuild**:

```bash
node esbuild.js
```

3. Press `F5` in VS Code to open a new Extension Development Host with the extension loaded.

---

## 🔍 Project Structure

| File/Folders                  | Purpose                                          |
| ----------------------------- | ------------------------------------------------ |
| `src/`                        | Source TypeScript code.                          |
| `dist/`                       | Compiled output using esbuild.                   |
| `.vscodeignore`               | Defines what files to exclude when packaging.    |
| `esbuild.js`                  | Custom build script with problem matcher plugin. |
| `.vscode-test.mjs`            | Config for test discovery.                       |
| `eslint.config.mjs`           | Linting configuration for TypeScript.            |
| `vsc-extension-quickstart.md` | VS Code generated starter help.                  |

---

## 📦 Packaging & Publishing

To bundle your extension:

```bash
npx vsce package
```

To publish (after setting up your publisher):

```bash
npx vsce publish
```
