    const {app, BrowserWindow} = require('electron')
    const express = require('express')
    const url = require("url");
    const path = require("path");

    const {createProxyMiddleware} = require('http-proxy-middleware');
    let mainWindow

    function createWindow () {
      mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true,
        }
      })

      mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, `/dist/ar-glasses/index.html`),
          protocol: "file:",
          slashes: true
        })
      );

        const ser = express();

        // Set up proxy
        const proxy = electron.use('/api', createProxyMiddleware({ target: 'http://localhost:4200', changeOrigin: true }));


        mainWindow.webContents.session.webRequest.onBeforeRequest(
          { urls: ['*://*/*'] },
          (details, callback) => {
            proxy(details, mainWindow.webContents, callback);
          }
        );
      // Open the DevTools.
      mainWindow.webContents.openDevTools()

      mainWindow.on('closed', function () {
        mainWindow = null
      })
    }

    app.on('ready', createWindow)

    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') app.quit()
    })

    app.on('activate', function () {
      if (mainWindow === null) createWindow()
    })
