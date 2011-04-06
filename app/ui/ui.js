/**
 * Application UI Helpers and methods
 */
(function(app) {
    app.ui = {};
    
    // Shorthand for alert dialog
    app.ui.alert = function(/*String*/ _title, /*String*/ _message) {
        Ti.UI.createAlertDialog({
            title:_title, 
            message:_message
        }).show();
    };
})(app);

// Include major UI components and styling properties
Ti.include(
    '/app/ui/styles.js',
    '/app/ui/views/loading.js',
    '/app/ui/views/login.js',
    '/app/ui/views/app.js'
);