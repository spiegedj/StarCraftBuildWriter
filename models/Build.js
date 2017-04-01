/// <reference path="Action.ts"/>
var Build = (function () {
    function Build($scope, $timeout) {
        this.$scope = null;
        this.$timeout = null;
        this.name = "";
        this.supply = 7;
        this.supplyCap = 10;
        this.actions = null;
        this.supplyChangePromise = null;
        this.actions = {};
        this.$scope = $scope;
        this.$timeout = $timeout;
    }
    Build.prototype.changeBuildSupply = function (action, change) {
        action.buildSupply += change;
        action.buildSupply = Math.max(0, action.buildSupply);
        if (this.supplyChangePromise)
            this.$timeout.cancel(this.supplyChangePromise);
        this.supplyChangePromise = this.$timeout(this.mergeActions.bind(this, action), 1000);
    };
    Build.prototype.mergeActions = function (action) {
        var newSupplyChar = this.__toKey(action.buildSupply);
        if (this.actions[newSupplyChar]) {
            var newAction = this.actions[newSupplyChar];
            newAction.mergeObjects(action);
            delete this.actions[action.key];
        }
        else {
            // No action exists at that supply. So just change the property key to match the Action's Build Supply
            this.actions[newSupplyChar] = action;
            delete this.actions[action.key];
            action.key = newSupplyChar;
        }
    };
    Build.prototype.addToBuild = function (obj, supplyChar) {
        if (!supplyChar) {
            if (this.$scope.useSupplyInsert) {
                supplyChar = this.__toKey(this.$scope.supplyInsert);
            }
            else {
                supplyChar = this.__toKey(this.supply);
            }
        }
        // If the action was not created yet do so
        var action = this.actions[supplyChar];
        if (!action) {
            action = new Action(this.$scope, supplyChar, this.$scope.timeString);
            this.actions[supplyChar] = action;
        }
        if (obj.Type === 'U') {
            obj.Count = 1;
            action.addObject(obj);
        }
        else {
            var clone = this.__shallowCopy(obj);
            //clone.Count = 1;
            action.addObject(clone);
        }
        if (obj.Supply)
            this.supply += (obj.Supply);
        if (obj.Name === 'Pylon')
            this.supplyCap += (8);
        if (obj.Type === 'U') {
            obj.Built = true;
        }
        this.$scope.constructed[obj.Name]++;
        this.$scope.updateUnlocked();
    };
    Build.prototype.removeFromBuild = function (obj, count, supplyChar) {
        var i, upgrade;
        var action = this.actions[supplyChar];
        if (obj.Supply)
            this.supply -= (obj.Supply * count);
        if (obj.Name === 'Pylon')
            this.supplyCap -= (8 * count);
        if (obj.Type === 'U') {
            obj.Built = false;
        }
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
    };
    Build.prototype.deleteAction = function (supplyChar) {
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
    };
    Build.prototype.__toKey = function (supply) {
        return String.fromCharCode(supply);
    };
    Build.prototype.__shallowCopy = function (obj) {
        var copy = {};
        for (var attr in obj) {
            if (attr !== '$$hashKey' && obj.hasOwnProperty(attr)) {
                copy[attr] = obj[attr];
            }
        }
        return copy;
    };
    return Build;
}());
