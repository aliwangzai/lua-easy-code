import * as vscode from 'vscode';
export default class {
    static execute(uri: vscode.Uri, context: vscode.ExtensionContext) {
        let editor = vscode.window.activeTextEditor as vscode.TextEditor
        let selection = editor.selection
        const activeDocument = editor.document
        // sample for selection: {"start":{"line":2,"character":0},"end":{"line":2,"character":7},"active":{"line":2,"character":7},"anchor":{"line":2,"character":0}}
        const { start, end } = selection;
        // 当前行文本内容
        const curLineText = activeDocument.lineAt(start.line).text;
        const exp = curLineText.substring(start.character, end.character);
        let exp_var = exp.replace(/[\.\(\)]/g, "_")
        const firstLine = new vscode.Position(0, 0);

        editor.edit((TextEditorEdit) => {
            TextEditorEdit.insert(firstLine, `local ${exp_var} = ${exp}\n`);
            // TODO: replace all exp to exp_var 
            TextEditorEdit.replace(selection, exp_var)
        });
        // vscode.window.showInformationMessage('Hello World from lua-easy-code!');
    }
};