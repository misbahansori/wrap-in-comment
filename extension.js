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

      const startComment = "<!-- Start of -->";
      const endComment = "<!-- End of -->";
      // Get the document
      const doc = editor.document;
      // Get the line number before and the selection
      const start = doc.lineAt(editor.selection.start).range.start;
      // make sure the indentation is correct
      const startIndent = doc.lineAt(
        editor.selection.start
      ).firstNonWhitespaceCharacterIndex;
      // Insert HTML comment in a new line before the selection with the correct indentation
      editor.edit((editBuilder) => {
        editBuilder.insert(
          start,
          `${" ".repeat(startIndent)}${startComment}\n`
        );
      });

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
