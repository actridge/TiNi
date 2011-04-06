/**
 * Application window
 */
(function(_app) {    
    // Create the main application window
    _app.ui.createApplicationWindow = function(_args) {
        var win = Ti.UI.createWindow(app.combine($$.Window,{
            exitOnClose: true,
            orientationModes: [Ti.UI.PORTRAIT]
        }));
        var headerView = Ti.UI.createView(app.combine($$.headerView,{top:0}));
        
        // Assemble main app window
        win.add(headerView);
        
        // Ensure we have active network connection
        if (Ti.Network.online == false) {
            Ti.UI.createAlertDialog({
                title: 'No Network Connection', 
                message: L('error_network')
            }).show();
        }

        return win;
    };
})(app);