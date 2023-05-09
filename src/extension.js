// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "wrap-in-comment.wrap-in-comment",
    function () {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        vscode.window.showInformationMessage("No editor is active");
        return; // No open text editor
      }

      const startWord = "Start of";
      const endWord = "End of";

      const startComment = `<!-- ${startWord} -->`;
      const endComment = `<!-- ${endWord} -->`;

      const doc = editor.document;
      const selection = editor.selection;

      const start = doc.lineAt(selection.start).range.start;
      const end = doc.lineAt(selection.end).range.end;

      const indent = doc.lineAt(
        selection.start
      ).firstNonWhitespaceCharacterIndex;

      editor.edit((editBuilder) => {
        editBuilder.insert(start, `${" ".repeat(indent)}${startComment}\n`);
        editBuilder.insert(end, `\n${" ".repeat(indent)}${endComment}`);
      });

      const startPosition = new vscode.Position(
        start.line,
        indent + 5 + startWord.length
      );

      const endPosition = new vscode.Position(
        end.line + 2,
        indent + 5 + endWord.length
      );

      editor.selections = [
        new vscode.Selection(startPosition, startPosition),
        new vscode.Selection(endPosition, endPosition),
      ];
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
