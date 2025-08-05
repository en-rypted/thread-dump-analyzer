
const fs = require('fs');
const path = require('path');
const vscode = require('vscode');
const cp = require('child_process');
const express = require('express');
const WebSocket = require('ws');
let server, wss;
const java =  vscode.workspace.getConfiguration("thread-dump-analyzer").get("jdkPath") ? vscode.workspace.getConfiguration("jarExplorer").get("jdkPath").endsWith(".exe") ? vscode.workspace.getConfiguration("jarExplorer").get("jdkPath") : vscode.workspace.getConfiguration("jarExplorer").get("jdkPath")+".exe" : "java";
let reactClientSocket = null;
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
 
 


 const disposable = vscode.commands.registerCommand('thread-dump-analyzer.viewThreadDump', async (uri) => {
  const panel = vscode.window.createWebviewPanel(
      'reactPanel',
      'React Webview',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.file(path.join(context.extensionPath, 'media', 'dist'))
        ]
      }
    );
  
	  let threadsAnalysis;
	  let filePath = uri.fsPath;
    try {
     //  const { wss, client } = await connectReactUI();
      const output = await runJarTool(filePath, context);
      threadsAnalysis = JSON.parse(output);

      
      // client.send(JSON.stringify({
      //   type: 'threadsAnalysis',
      //   payload: threadsAnalysis,
      // }));

    } catch (error) {
      vscode.window.showErrorMessage("Failed to analyze thread dump: " + error.message);
      return;
    }
       const htmlPath = path.join(context.extensionPath, 'media', 'dist', 'index.html');
    let html = fs.readFileSync(htmlPath, 'utf8');
     html = html.replace(/(href|src)="(.+?)"/g, (match, p1, p2) => {
      const resourcePath = vscode.Uri.file(path.join(context.extensionPath, 'media', 'dist', p2));
      const webviewUri = panel.webview.asWebviewUri(resourcePath);
      return `${p1}="${webviewUri}"`;
    });
     panel.webview.html = html;
    panel.webview.onDidReceiveMessage((message) => {
      if (message.command === 'hello') {
        vscode.window.showInformationMessage('React says: ' + message.text);
        setTimeout(() => {
             panel.webview.postMessage({
              command: 'loadThreads',
              data: threadsAnalysis
            });
          }, 100);
      }
    });
  
  });

  context.subscriptions.push(disposable);
}


function runJarTool(filePath, context) {
   const jarTool = path.join(
      context.extensionPath,
      "resources",
      "ThreadDumpAnalyzerService.jar"
    );


  return new Promise((resolve, reject) => {
    const cmd = cp.spawn(java, ["-jar", jarTool,filePath]);

    let output = "";
    let error = "";

    cmd.stdout.on(
      "data",
      (data) => (output += data.toString())
    );
    cmd.stderr.on("data", (data) => (error += data.toString()));

    cmd.on("close", (code) => {
      if (code === 0) resolve(output);
      else reject(new Error(error || `Tool failed with exit code ${code}`));
    });
  });
}

 /**
 * Deploys the React app from dist and sets up a WebSocket server.
 * @returns {Promise<WebSocket.Server>} Resolves with WebSocket server instance.
 */
function connectReactUI() {
  return new Promise((resolve, reject) => {
    try {
      const app = express();
      const port = 3000;
      const distPath = path.join(__dirname, 'media/dist');

      // Serve React build
      app.use(express.static(distPath));

      // Start HTTP server
      server = app.listen(port, () => {
        console.log(`React UI available at http://localhost:${port}`);

        // Open in external browser
        vscode.env.openExternal(vscode.Uri.parse(`http://localhost:${port}`));
      });

      // WebSocket setup
      wss = new WebSocket.Server({ server });

      wss.on('connection', (ws) => {
        console.log('✅ React client connected via WebSocket');
          reactClientSocket = ws;
        
        ws.on('message', (message) => {
          console.log('📩 Received from client:', message.toString());

          // Echo back or send useful data
          ws.send(JSON.stringify(message));
        });

          ws.on('close', () => {
        console.log('❌ React app disconnected');
        reactClientSocket = null;
      });

        // Optional: Initial message
        ws.send(JSON.stringify({ type: 'welcome', payload: 'Hello from VS Code!' }));
         resolve({ wss, client: ws }); 
      });

      // wss.on('listening', () => {
      //   resolve(wss); // WebSocket server ready
      // });

    } catch (err) {
      reject(err);
    }
  });
}

// This method is called when your extension is deactivated
function deactivate() {

   if (server) server.close();
  if (wss) wss.close();
}

module.exports = {
	activate,
	deactivate
}
