/// <reference path="models/Build.ts"/>
/// <reference path="node_modules/@types/angular/index.d.ts" />

var data = data || {};

var app = angular.module('myApp', []);
app.controller('homeController', ["$scope", "$timeout", function ($scope, $timeout) {
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
            var minutes = Math.floor(elapsed / 60)
            var seconds = Math.floor(elapsed % 60);
            var minutesString = String(minutes);
            var secondsString = String(seconds);

            if (minutes < 10) { minutesString = "0" + minutes };
            if (seconds < 10) { secondsString = "0" + seconds };

            $scope.timeString = minutesString + ":" + secondsString;
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
        var probe = {
            "Name": "Probe",
            "Minerals": 50,
            "Gas": 0,
            "Supply": 1,
            "BuildTime": 17
        };

        $scope.addUnit(probe);
    }
}]);

app.directive('ngRightClick', function ($parse) {
    return function (scope, element, attrs) {
        var anyAttr: any = attrs;
        var fn = $parse(anyAttr.ngRightClick);
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