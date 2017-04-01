var Action = (function () {
    function Action($scope, key, time) {
        this.$scope = null;
        this.key = null;
        this.buildSupply = 0;
        this.objects = null;
        this.time = "";
        this.$scope = $scope;
        this.key = key;
        this.buildSupply = key.charCodeAt(0);
        this.objects = {};
        this.time = time;
    }
    /** Merges and actions units with this one  */
    Action.prototype.mergeObjects = function (action) {
        var keys = Object.keys(action.objects);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key !== '$$hashKey' && action.objects.hasOwnProperty(key)) {
                var newObject = action.objects[keys[i]];
                // If the object is already in the action just merge counts
                if (this.objects[key]) {
                    this.objects[key].Count += newObject.Count;
                }
                else {
                    this.objects[key] = newObject;
                }
            }
        }
    };
    /** Add an object to the action. If object exists add to count of existing object. */
    Action.prototype.addObject = function (obj) {
        if (this.objects[obj.Name]) {
            this.objects[obj.Name].Count += obj.Count;
        }
        else {
            this.objects[obj.Name] = obj;
        }
    };
    return Action;
}());
