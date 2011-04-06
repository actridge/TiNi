/**
 * Application models base
 */
(function(_app) {
    _app.model = {
        dbname: 'bisok_maxclient' // Overwrite this before creating your first entity to change
    };
    
    // Create a persistent entity
    _app.model.Entity = function(/*String*/ _class, /*Object*/ _properties) {
        // Mixin all properties for the object passed in
        _app.mixin(this,_properties);
        
        this._className = _class;
        
        // Create a table for this entity type
        var db = Ti.Database.open(_app.model.dbname);
        db.execute('CREATE TABLE IF NOT EXISTS '+_class+' (id INTEGER PRIMARY KEY, json TEXT)');
        db.close();
        
        // Save this entity - returns the ID of this entity
        this.save = function() {
            db = Ti.Database.open(_app.model.dbname);
            db.execute('INSERT INTO '+this._className+' (json) VALUES (?)',JSON.stringify(this));
            var id = db.lastInsertRowId;
            this.id = id;
            db.close();
            Ti._app.fireEvent('app:entity.saved',{
                className:this._className,
                id:id
            });
            return id;
        };
    };
    
    // Helper function to hydrate a JSON graph with class functions
    function hydrate(/*String*/ _className, /*String*/ _json) {
        return (_app.model[_className]) ? new _app.model[_className](JSON.parse(_json)) : JSON.parse(_json);
    }
    
    // Load an entity by the given ID
    _app.model.load = function(/*String*/ _className, /*Number*/ _id) {
        var obj = null,
        db = Ti.Database.open(_app.model.dbname);
        
        // Be tolerant of entities that don't exist - create a table for them
        db.execute('CREATE TABLE IF NOT EXISTS '+_className+' (id INTEGER PRIMARY KEY, json TEXT)');
        
        var rs = db.execute('SELECT * FROM '+_className+' WHERE id = ?', _id);
        
        if (rs.isValidRow()) {
            var json = rs.fieldByName('json');
            obj = hydrate(_className,json);
            obj.id = rs.fieldByName('id');
        }
        
        rs.close();
        db.close();
        return obj;
    };
    
    // Get a list of all entities of the given class
    _app.model.list = function(/*String*/ _className) {
        var results = [],
        db = Ti.Database.open(_app.model.dbname);
        
        // Be tolerant of entities that don't exist - create a table for them
        db.execute('CREATE TABLE IF NOT EXISTS '+_className+' (id INTEGER PRIMARY KEY, json TEXT)');
        
        var rs = db.execute('SELECT * FROM '+_className);
        
        while(rs.isValidRow()) {
            var json = rs.fieldByName('json');
            
            obj = hydrate(_className,json);
            obj.id = rs.fieldByName('id');
            
            results.push(obj);
            rs.next();
        }
        
        rs.close();
        db.close();
        return results;
    };
})(app);