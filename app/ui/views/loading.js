/**
 * Application Loading View
 */
(function(_app) {
	_app.ui.createLoadingView = function(_args) {
		var loadingView = Ti.UI.createView(app.combine($$.stretch,{
			visible: false
		}));
		var backdrop = Ti.UI.createView(app.combine($$.stretch, {
			backgroundColor: '#787878',
			opacity: 0.85
		}));
		loadingView.add(backdrop);
		
		Ti.App.addEventListener('app:loader.show', function() {
			if (!loadingView.visible) {
				loadingView.visible = true;
			}
		});
		
		Ti.App.addEventListener('app:loader.hide', function() {
			loadingView.visible = false;
		});
		
		return loadingView;
	};
})(app);