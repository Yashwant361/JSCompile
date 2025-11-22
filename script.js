  const outputBox = document.getElementById('output');

        // Setup CodeMirror
        const editor = CodeMirror.fromTextArea(document.getElementById('code'), {
            mode: 'javascript',
            theme: 'dracula',
            lineNumbers: true,
            smartIndent: true,
            tabSize: 2,
            autoCloseBrackets: true,
            matchBrackets: true,
            indentWithTabs: false,
            lineWrapping: true,
            extraKeys: {
                'Shift-Alt-F': cm => formatCode(),
                'Ctrl-Shift-F': cm => formatCode(),
                'Enter': cm => runCode(),
                'Cmd-Enter': cm => runCode()
            }
        });

        const originalLog = console.log;

        // Override console.log to show output
        console.log = function(...args) {
            outputBox.textContent += args.join(' ') + '\n';
            originalLog.apply(console, args);
        };

        // Format Code Function
        function formatCode() {
            let code = editor.getValue();

            try {
                let formatted = js_beautify(code, {
                    indent_size: 2,
                    indent_char: ' ',
                    max_preserve_newlines: 2,
                    preserve_newlines: true,
                    keep_array_indentation: false,
                    break_chained_methods: false,
                    brace_style: 'collapse',
                    space_before_conditional: true,
                    end_with_newline: false
                });
                editor.setValue(formatted);
            } catch (error) {
                outputBox.textContent = "⚠️ Formatting Error: " + error.message;
                outputBox.style.color = "#ffa500";
                setTimeout(() => {
                    outputBox.style.color = "#00ff00";
                }, 2000);
            }
        }

        // Run JS code
        function runCode() {
            outputBox.textContent = '';
            let code = editor.getValue();

            try {
                eval(code);
            } catch (err) {
                outputBox.textContent = "❌ Error: " + err.message;
                outputBox.style.color = "#ff6b6b";
                setTimeout(() => {
                    outputBox.style.color = "#00ff00";
                }, 100);
            }
        }

        // Clear Editor + Output
        function clearAll() {
            editor.setValue('');
            outputBox.textContent = 'Output will appear here...';
        }

        // Set default code
        editor.setValue(`// Write your JavaScript code here
console.log('Hello, World!');
`);
