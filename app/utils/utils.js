/**
 * Application Utilities and Helper Methods
 */
(function(_app) {
    _app.utils = {};
    
    // AJAX method that mimmicks jQuery's
    _app.utils.ajax = function(_props) {

        // Merge with default props
        var o = _app.combine({
            method: 'GET',
            url: null,
            contentType: 'application/json',

            // Callbacks
            success: null,
            error: null,
            beforeSend: null,
            complete: null
        }, _props);

        // Parse Datatype
        function parseDataType(xhr, type) {
            var data = false;
            switch(type) {
                case 'json':
                    data = JSON.parse(xhr.responseText);
                break;
                case 'xml':
                    data = (xhr.responseXML) ? xhr.responseXML : xhr.responseText;
                break;
            }
            return data;
        }

        // Start XHR
        Ti.API.info("XHR Fetch: \n'" + o.url + "'...");
        var xhr = Ti.Network.createHTTPClient();

        // URL + METHOD
        xhr.open(o.method, o.url);
        
        // Request Header
        xhr.setRequestHeader('Content-Type', o.contentType);

        if(o.beforeSend) {
            o.beforeSend(xhr);
        }
        
        // Errors
        xhr.setTimeout(8000);
        xhr.onerror = function() {
            Ti.API.info('XHR "onerror" ['+this.status+']: '+this.responseText+'');
            if(null !== o.error) {
                o.error(this);
            }
        };
        
        // Success
        xhr.onload = function() {
            // Log
            Ti.API.info('XHR "onload" ['+this.status+']: '+this.responseText+'');
            
            // Success = 1xx or 2xx (3xx = redirect)
            if(this.status < 400) {
                try {
                    if(null !== o.success) {
                        o.success(parseDataType(this, o.type), this);
                    }
                } catch(e) {
                    Ti.API.info('XHR success function threw Exception: ' + e + '');
                    return;
                }
            // Error = 4xx or 5xx
            } else {
                Ti.API.info('XHR error ['+this.status+']: '+this.responseText+'');
                if(null !== o.error) {
                    o.error(this);
                }
            }
        };
        
        // Send
        xhr.send();

        // Completed
        if(null !== o.complete) {
            o.complete(this);
        }
    };
})(app);