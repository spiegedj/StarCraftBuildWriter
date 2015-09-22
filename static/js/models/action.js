function Action($scope, key, time) {
    this.$scope = $scope;
    this.key = key;
    this.buildSupply = key.charCodeAt(0);
    this.objects = {};
    this.time = time;
}

Action.prototype = {
    $scope: null,
    key: null,
    buildSupply: 0,
    objects: null,
    time: null,

    /// Merges an actions units with this one
    mergeObjects: function (action) {
        var i, keys;

        keys = Object.keys(action.objects);
        for (i = 0; i < keys.length; i++) {
            key = keys[i];
            if (key !== '$$hashKey' && action.objects.hasOwnProperty(key)) {
                newObject = action.objects[keys[i]];

                // If the object is already in the action just merge counts
                if (this.objects[key]) {
                    this.objects[key].Count += newObject.Count;
                } else {
                    this.objects[key] = newObject;
                }
            }
        }
    },

    // Add an object to the action. If object exists add to count of existing object.
    addObject: function (obj) {
        if (this.objects[obj.Name]) {
            this.objects[obj.Name].Count += obj.Count;
        } else {
            this.objects[obj.Name] = obj;
        }
    },
}