/**
 * Application Styles and Theme
 */
(function(_app) {    
    // Globally available theme object to hold theme colors/constants
    _app.ui.theme = {
        textColor: '#000000',
        textColor2: '#888888',
        headerTextColor: '#333333',
        fontFamily: app.os({
            iphone: 'Helvetica Neue',
            android: 'Droid Sans'
        })
    };

    // Sets the background color of the master UIView (when there are no windows/tab groups on it)
    Ti.UI.setBackgroundColor('#fff');

    // All shared property sets are declared here.
    _app.ui.properties = {
        // Grab platform dimensions only once to save a trip over the bridge
        platformWidth: Ti.Platform.displayCaps.platformWidth,
        platformHeight: Ti.Platform.displayCaps.platformHeight,
        
        // Defaults for UI components
        Button: {
            height: 50,
            width: 250,
            color: '#000',
            font: {
                fontSize: 18,
                fontWeight: 'bold'
            }
        },
        Label: {
            color: app.ui.theme.textColor,
            font: {
                fontFamily: app.ui.theme.fontFamily,
                fontSize: 12
            },
            height: 'auto'
        },
        Window: {
            backgroundColor: '#fff',
            navBarHidden: true,
            softInputMode: (Ti.UI.Android) ? Ti.UI.Android.SOFT_INPUT_ADJUST_RESIZE : ''
        },
        TableView: {
            backgroundColor: '#eee',
            separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE
        },
        TableViewRow: {
            selectedBackgroundColor: '#93caed', // Dumb, but it's currently inconsistent x-platform
            backgroundSelectedColor: '#93caed',
            className: 'tvRow'
        },
        TextField: {
            height: 35,
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            color: '#000000'
        },
        TextArea: {
            borderRadius: 10,
            backgroundColor: '#efefef',
            //gradient will only work on iOS
            backgroundGradient:{
                type: 'linear',
                colors: [
                    {color: '#efefef', position: 0.0},
                    {color: '#cdcdcd', position: 0.50},
                    {color: '#efefef', position: 1.0}
                ]
            }
        },
        
        // We use these as JS-based 'style classes'
        animationDuration: 500,
        stretch: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        },
        pad: {
            top: 10,
            bottom: 10,
            left: 10,
            right: 10
        },
        variableTopRightButton: {
            top: 5,
            right: 5,
            height: 30,
            width: app.os({
                iphone: 60,
                android: 'auto'
            }),
            color: '#ffffff',
            font: {
                fontSize: 12,
                fontWeight: 'bold'
            }
        },
        topRightButton: {
            top: 5,
            right: 5,
            height: 30,
            width: 38
        },
        headerText: {
            top: 8,
            height: 'auto',
            textAlign: 'center',
            color: app.ui.theme.headerTextColor,
            font: {
                fontFamily: app.ui.theme.fontFamily,
                fontSize: 18,
                fontWeight: 'bold'
            }
        },
        headerView: {
            height: 40
        },
        boldHeaderText: {
            height:'auto',
            color:'#000000',
            font: {
                fontFamily: app.ui.theme.fontFamily,
                fontSize:14,
                fontWeight:'bold'
            }
        },
        smallText: {
            color: app.ui.theme.grayTextColor,
            font: {
                fontFamily: app.ui.theme.fontFamily,
                fontSize: 10
            },
            height: 'auto'
        },
        spacerRow: {
            backgroundImage: 'images/spacer_row.png',
            height: 30,
            className: 'spacerRow'
        }
    };
})(app);

// Global shortcut for UI properties, since these get used A LOT
var $$ = app.ui.properties;
