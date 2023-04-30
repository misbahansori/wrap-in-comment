// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "wrap-in-comment" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "wrap-in-comment.wrap-in-comment",
    function () {
      // The code you place here will be executed every time your command is executed

      // Get the active text editor
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        vscode.window.showInformationMessage("No editor is active");
        return; // No open text editor
      }

      const startWord = "Start of";
      const endWord = "End of";

      const startComment = `<!-- ${startWord} -->`;
      const endComment = `<!-- ${endWord} -->`;

      // Get the document
      const doc = editor.document;
      const selection = editor.selection;

      // Get the line number before and the selection
      const start = doc.lineAt(selection.start).range.start;
      const end = doc.lineAt(selection.end).range.end;

      // make sure the indentation is correct
      const indent = doc.lineAt(
        selection.start
      ).firstNonWhitespaceCharacterIndex;

      editor.edit((editBuilder) => {
        // Insert HTML comment in a new line before the selection with the correct indentation
        editBuilder.insert(start, `${" ".repeat(indent)}${startComment}\n`);

        // Insert HTML comment in a new line after the selection with the correct indentation
        editBuilder.insert(end, `\n${" ".repeat(indent)}${endComment}`);
      });

      // Place multiple cursor in the start comment and end comment
      editor.selections = [
        new vscode.Selection(
          start.line,
          indent + 5 + startWord.length,
          start.line,
          indent + 5 + startWord.length
        ),
        new vscode.Selection(
          end.line + 2,
          indent + 5 + endWord.length,
          end.line + 2,
          indent + 5 + endWord.length
        ),
      ];

      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from wrap-in-comment!");
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
