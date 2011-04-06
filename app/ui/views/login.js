/**
 * Login View
 **/
(function(app) {
    app.ui.createLoginView = function(_args) {
        var loginView = Ti.UI.createView($$.padding);
        var container = Ti.UI.createView({layout:'vertical'});
        var unLabel = Ti.UI.createLabel(app.combine($$.boldHeaderText,{text:L('username')}));
        var unField = Ti.UI.createTextField(app.combine($$.TextField,{
            top: 10,
            left: 0,
            right: 0,
            value: ''
        }));
        var pwLabel = Ti.UI.createLabel(app.combine($$.boldHeaderText,{
            text: L('password'),
            top: 10
        }));
        var pwField = Ti.UI.createTextField(app.combine($$.TextField,{
            top: 10,
            left: 0,
            right: 0,
            passwordMask: true,
            value: ''
        }));
        var addButton = Ti.UI.createButton(app.combine($$.Button,{
            title: L('button_login'),
            top: 20
        }));
        
        container.add(unLabel);
        container.add(unField);
        container.add(pwLabel);
        container.add(pwField);
        container.add(addButton);
        loginView.add(container);
        
        // Handle login click
        addButton.addEventListener('click', function() {
            Ti.App.fireEvent('app:loader.show');

            // Login request
            app.utils.ajax({
                url: "http://localhost",
                type: "json",
                success: function(data, xhr) {
                    Ti.App.fireEvent('app:loader.hide');

                    // Do something with 'data'
                },
                error: function(xhr) {
                    app.ui.alert( L('error_login') );

                    // Error
                    Ti.App.fireEvent('app:loader.hide');
                }
            });
        });
        return loginView;
    };
})(app);