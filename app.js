/**
 * Application bootstrap file
 */
Ti.include('/app/namespace.js');

/*
// Create base UI tab and root window
app.vars.mainWindow = Ti.UI.createWindow({  
    title: 'Login',
    backgroundColor: '#fff',
    url: '/window/login.js'
});
app.vars.mainWindow.open();
*/

app.vars.loadingView = app.ui.createLoadingView();
app.vars.mainWindow = app.ui.createApplicationWindow();
app.vars.mainWindow.open();