app.controller('IndexController', ["$scope", "$timeout", function ($scope, $timeout) {
    // Object lists
    $scope.units = data.units;
    $scope.buildings = data.buildings;
    $scope.upgrades = data.upgrades;
    $scope.constructed = {};

    /// Settings
    $scope.autoBuildProbes = false;
    $scope.useSupplyInsert = false;

    // Game Data
    $scope.timeString = "00:00";
    $scope.mode = "Start";
    $scope.supplyInsert = 7;
    
    // Build
    $scope.build = new Build($scope, $timeout);
    $scope.buildOrderText = "";

    var timeInt = 0;
    var timeStart = 0;
    var timerPromise;
    var previousElapsed = -1;


    /// Initialize Function
    start();
    function start() {
        var unit, building, upgrade;
        $scope.units.forEach(function (unit) {
            unit.ThumbnailName = unit.Name.split(' ').join('-').toLowerCase();
            unit.Type = 'A';

            unit.Unlocked = !unit.Req;
            $scope.constructed[unit.Name] = 0;
        });

        $scope.buildings.forEach(function (building) {
            building.ThumbnailName = building.Name.split(' ').join('-').toLowerCase();
            building.Type = 'B';

            building.Unlocked = !building.Req;
            $scope.constructed[building.Name] = 0;
        });

        $scope.upgrades.forEach(function (upgrade) {
            upgrade.ThumbnailName = upgrade.Name.split(' ').join('-').toLowerCase();
            upgrade.Type = 'U';

            upgrade.Unlocked = !upgrade.Req;
            $scope.constructed[upgrade.Name] = 0;
        });
    }

    function timerUpdate() {
        var elapsed = (Date.now() - timeStart) / 1000;

        // Convert to StarCraft time
        elapsed = Math.floor(elapsed * 1.38);

        if (elapsed !== previousElapsed) {
            previousElapsed = elapsed;

            // Add probe if auto adding
            if ($scope.autoBuildProbes && ((elapsed % 17) === 0)) {
                $scope.addProbe();
            }

            // Convert to a time string
            var minutes = String(Math.floor(elapsed / 60));
            var seconds = String(Math.floor(elapsed % 60));

            if (minutes < 10) minutes = "0" + minutes;
            if (seconds < 10) seconds = "0" + seconds;

            $scope.timeString = minutes + ":" + seconds;
        }
        timerPromise = $timeout(function () { timerUpdate(); }, 100);
    }

    function stop() {
        $timeout.cancel(timerPromise);
        $scope.reset();
    }

    $scope.reset = function () {
        $scope.timeString = "00:00";
        $scope.build = new Build($scope, $timeout);
        $scope.buildOrderText = "";
    }

    $scope.updateUnlocked = function() {
        var i, unit, bulding, upgrade;

        $scope.units.forEach(function (unit) {
            unit.Unlocked = true;
            if (unit.Req) {
                for (i = 0; i < unit.Req.length; i++) {
                    if (!$scope.constructed[unit.Req[i]]) {
                        unit.Unlocked = false;
                        break;
                    }
                }
            }
        });

        $scope.buildings.forEach(function (building) {
            building.Unlocked = true;
            if (building.Req) {
                for (i = 0; i < building.Req.length; i++) {
                    if (!$scope.constructed[building.Req[i]]) {
                        building.Unlocked = false;
                        break;
                    }
                }
            }
        });

        $scope.upgrades.forEach(function (upgrade) {
            upgrade.Unlocked = true;
            if (upgrade.Req) {
                for (i = 0; i < upgrade.Req.length; i++) {
                    if (!$scope.constructed[upgrade.Req[i]]) {
                        upgrade.Unlocked = false;
                        break;
                    }
                }
            }
        });
    }

    $scope.toggleTimer = function () {
        if ($scope.mode === "Start") {
            $scope.mode = "Stop";
            timeStart = Date.now();
            timerUpdate();
        } else {
            stop();
            $scope.mode = "Start";
        }
    };

    $scope.addProbe = function () {
        probe = {
            "Name": "Probe",
            "Minerals": 50,
            "Gas": 0,
            "Supply": 1,
            "BuildTime": 17
        };

        $scope.addUnit(probe);
    }

    //function mergeActions(action, oldSupplyChar) {
    //    var i, keys, key, object;
    //    var newSupplyChar = String.fromCharCode(action.BuildSupply);
    //    if ($scope.build[newSupplyChar]) {
    //        var newAction = $scope.build[newSupplyChar];
            
    //        keys = Object.keys(action.Objects);
    //        for (i = 0; i < keys.length; i++) {
    //            key = keys[i];
    //            if (key !== '$$hashKey' && action.Objects.hasOwnProperty(key)) {
    //                object = action.Objects[keys[i]];

    //                // If the object is already in the action just merge counts
    //                if (newAction.Objects[key]) {
    //                    newAction.Objects[key].Count += object.Count;
    //                } else {
    //                    newAction.Objects[key] = object;
    //                }
    //            }
    //        }
    //    } else {
    //        // No action exists at that supply. So just change the property key to match the Action's Build Supply
    //        $scope.build[newSupplyChar] = action;
    //    }

    //    delete $scope.build[oldSupplyChar];
    //}

    //$scope.changeBuildSupply = function (action, supplyChar, change) {
    //    action.BuildSupply += change;
    //    action.BuildSupply = Math.max(0, action.BuildSupply);

    //    if (supplyChangePromise) $timeout.cancel(supplyChangePromise);
    //    supplyChangePromise = $timeout(mergeActions.bind(null, action, supplyChar), 1000);
    //}

    //$scope.addToBuild = function (obj, supplyChar) {
    //    if (!supplyChar) {
    //        if ($scope.useSupplyInsert) {
    //            supplyChar = String.fromCharCode($scope.supplyInsert);
    //        } else {
    //            supplyChar = String.fromCharCode($scope.supply);
    //        }
    //    }

    //    var action = $scope.build[supplyChar];
    //    var clone = shallowCopy(obj);
    //    clone.Count = 1;

    //    // If the action was not created yet do so
    //    if (!action) {
    //        action = {};
    //        action.Time = $scope.timeString;
    //        action.BuildSupply = supplyChar.charCodeAt(0);
    //        action.Objects = {};
    //        $scope.build[supplyChar] = action;

    //        action.Objects[obj.Name] = clone;
    //    } else {
    //        // Check if the object is already in the array
    //        if (action.Objects[obj.Name]) {
    //            action.Objects[obj.Name].Count++;
    //        } else {
    //            action.Objects[obj.Name] = clone;
    //        }
    //    }

    //    if (obj.Type === 'A') {
    //        $scope.supply += obj.Supply;
    //    } else if (obj.Type === 'B') {
    //        // If supply giver add to supply cap
    //        if (obj.Name === "Pylon") {
    //            $scope.supplyCap += 8;
    //        }
    //    }

    //    // Add to constructed
    //    $scope.constructed[obj.Name]++;
    //    updateUnlocked();
    //}

    //$scope.removeFromBuild = function (obj, count, supplyChar) {
    //    var i;
    //    var action = $scope.build[supplyChar];

    //    obj.Count -= count;
    //    if (obj.Supply) $scope.supply -= (obj.Supply * count);
    //    if (obj.Name === 'Pylon') $scope.supplyCap -= (8 * count);
    //    $scope.constructed[obj.Name] -= count;

    //    // We  have removed all of the object from an action
    //    if (obj.Count <= 0) {
    //        delete action.Objects[obj.Name];

    //        // There are no objects left on an action
    //        if (Object.keys(action.Objects).length === 0) {
    //            delete $scope.build[supplyChar];
    //        }

    //        updateUnlocked();
    //    }
    //}

    //$scope.addUpgrade = function (upgrade) {
    //    var line = "";
    //    line = "\n" + upgrade.Name + " at " + $scope.timeString;
    //    $scope.buildOrderText += line;

    //    AddToBuild(upgrade);
    //}

    //$scope.removeAction = function (supplyChar) {
    //    var object, i, length, key, keys;
    //    var objects = $scope.build[supplyChar].Objects;

    //    keys = Object.keys(objects);
    //    for (i = 0; i < keys.length; i++) {
    //        key = keys[i];
    //        if (key !== '$$hashKey' && objects.hasOwnProperty(key)) {
    //            // Objects are removed from the array as removeFromBuild is called.  So always grab the first index.
    //            object = objects[key];
    //            $scope.removeFromBuild(object, object.Count, supplyChar);
    //        }
    //    }
    //}
}]);

app.directive('ngRightClick', function ($parse) {
    return function (scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function (event) {
            scope.$apply(function () {
                event.preventDefault();
                fn(scope, { $event: event });
            });
        });
    };
});

app.filter('num', function () {
    return function (input) {
        return parseInt(input, 10);
    };
});
