function Build($scope, $timeout) {
    this.actions = {};
    this.$scope = $scope;
    this.$timeout = $timeout;

}

Build.prototype = {
    $scope: null,
    $timeout: null,
    name: "",
    supply: 7,
    supplyCap: 10,
    actions: null,
    supplyChangePromise: null,

    changeBuildSupply: function (action, change) {
        action.buildSupply += change;
        action.buildSupply = Math.max(0, action.buildSupply);

        if (this.supplyChangePromise) this.$timeout.cancel(this.supplyChangePromise);
        this.supplyChangePromise = this.$timeout(this.mergeActions.bind(this, action), 1000);
    },

    mergeActions: function(action) {
        var newSupplyChar = this.__toKey(action.buildSupply);
        if (this.actions[newSupplyChar]) {
            var newAction = this.actions[newSupplyChar];
            newAction.mergeObjects(action);
            delete this.actions[action.key];
        } else {
            // No action exists at that supply. So just change the property key to match the Action's Build Supply
            this.actions[newSupplyChar] = action;
            delete this.actions[action.key];
            action.key = newSupplyChar;
        }
    },

    addToBuild: function (obj, supplyChar) {
        if (!supplyChar) {
            if (this.$scope.useSupplyInsert) {
                supplyChar = this.__toKey(this.$scope.supplyInsert);
            } else {
                supplyChar = this.__toKey(this.supply);
            }
        }

        var action = this.actions[supplyChar];
        var clone = shallowCopy(obj);
        clone.Count = 1;

        // If the action was not created yet do so
        if (!action) {
            action = new Action(this.$scope, supplyChar, this.$scope.timeString);
            this.actions[supplyChar] = action;
        }

        action.addObject(clone);

        if (obj.Supply) this.supply += (obj.Supply);
        if (obj.Name === 'Pylon') this.supplyCap += (8);
        this.$scope.constructed[obj.Name]++;

        this.$scope.updateUnlocked();
    },

    removeFromBuild: function (obj, count, supplyChar) {
        var i;
        var action = this.actions[supplyChar];

        if (obj.Supply) this.supply -= (obj.Supply * count);
        if (obj.Name === 'Pylon') this.supplyCap -= (8 * count);
        this.$scope.constructed[obj.Name] -= count;

        obj.Count -= count;
        // We  have removed all of the object from an action
        if (obj.Count <= 0) {
            delete action.objects[obj.Name];

            // There are no objects left on an action
            if (Object.keys(action.objects).length === 0) {
                delete this.actions[supplyChar];
            }

            this.$scope.updateUnlocked();
        }
    },

    deleteAction: function (supplyChar) {
        var object, i, length, key, keys;
        var objects = this.actions[supplyChar].objects;

        keys = Object.keys(objects);
        for (i = 0; i < keys.length; i++) {
            key = keys[i];
            if (key !== '$$hashKey' && objects.hasOwnProperty(key)) {
                // Objects are removed from the array as removeFromBuild is called.  So always grab the first index.
                object = objects[key];
                this.removeFromBuild(object, object.Count, supplyChar);
            }
        }
    },

    __toKey: function (supply) {
        return String.fromCharCode(supply);
    }
}