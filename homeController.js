data = {
    "units": [
        {
            "Name": "Probe",
            "Minerals": 50,
            "Gas": 0,
            "Supply" : 1,
            "BuildTime" : 17
        },

        {
            "Name": "Zealot",
            "Minerals": 100,
            "Gas": 0,
            "Supply": 2,
            "BuildTime": 38
        },

        {
            "Name": "Stalker",
            "Minerals": 125,
            "Gas": 50,
            "Supply": 2,
            "BuildTime": 42
        },
        {
            "Name": "Sentry",
            "Minerals": 50,
            "Gas": 100,
            "Supply": 2,
            "BuildTime": 37
        },
        {
            "Name": "Observer",
            "Minerals": 25,
            "Gas": 75,
            "Supply": 1,
            "BuildTime": 30
        },
        {
            "Name": "Immortal",
            "Minerals": 250,
            "Gas": 100,
            "Supply": 4,
            "BuildTime": 55
        },
        {
            "Name": "Warp Prism",
            "Minerals": 200,
            "Gas": 0,
            "Supply": 2,
            "BuildTime": 90
        },
        {
            "Name": "Colossus",
            "Minerals": 300,
            "Gas": 200,
            "Supply": 6,
            "BuildTime": 75
        },
        {
            "Name": "Phoenix",
            "Minerals": 150,
            "Gas": 100,
            "Supply": 2,
            "BuildTime": 35
        },
        {
            "Name": "Void Ray",
            "Minerals": 250,
            "Gas": 150,
            "Supply": 4,
            "BuildTime": 60
        },
        {
            "Name": "High Templar",
            "Minerals": 50,
            "Gas": 150,
            "Supply": 2,
            "BuildTime": 55
        },
        {
            "Name": "Dark Templar",
            "Minerals": 125,
            "Gas": 125,
            "Supply": 2,
            "BuildTime": 55
        },
        {
            "Name": "Carrier",
            "Minerals": 350,
            "Gas": 250,
            "Supply": 6,
            "BuildTime": 120
        },
        {
            "Name": "Mothership",
            "Minerals": 300,
            "Gas": 300,
            "Supply": 6,
            "BuildTime": 100
        },
        {
            "Name": "Mothership Core",
            "Minerals": 100,
            "Gas": 100,
            "Supply": 2,
            "BuildTime": 30
        },
        {
            "Name": "Oracle",
            "Minerals": 150,
            "Gas": 150,
            "Supply": 3,
            "BuildTime": 50
        },
        {
            "Name": "Tempest",
            "Minerals": 300,
            "Gas": 200,
            "Supply": 4,
            "BuildTime": 60
        }
    ],

    "buildings": [
        {
            "Name": "Pylon",
            "Minerals": 100,
            "Gas": 0,
            "BuildTime": 25
        },
        {
            "Name": "Nexus",
            "Minerals": 400,
            "Gas": 0,
            "BuildTime": 100
        },
        {
            "Name": "Assimilator",
            "Minerals": 75,
            "Gas": 0,
            "BuildTime": 30
        },
        {
            "Name": "Photon Cannon",
            "Minerals": 150,
            "Gas": 0,
            "BuildTime": 40
        },
        {
            "Name": "Gateway",
            "Minerals": 150,
            "Gas": 0,
            "BuildTime": 65
        },
        {
            "Name": "Stargate",
            "Minerals": 150,
            "Gas": 150,
            "BuildTime": 60
        },
        {
            "Name": "Robotics Facility",
            "Minerals": 200,
            "Gas": 100,
            "BuildTime": 65
        },
        {
            "Name": "Forge",
            "Minerals": 150,
            "Gas": 0,
            "BuildTime": 45
        },
        {
            "Name": "Cybernetics Core",
            "Minerals": 150,
            "Gas": 0,
            "BuildTime": 50
        },
        {
            "Name": "Twilight Council",
            "Minerals": 150,
            "Gas": 100,
            "BuildTime": 50
        },
        {
            "Name": "Templar Archives",
            "Minerals": 150,
            "Gas": 200,
            "BuildTime": 50
        },
        {
            "Name": "Dark Shrine",
            "Minerals": 150,
            "Gas": 150,
            "BuildTime": 100
        },
        {
            "Name": "Fleet Beacon",
            "Minerals": 300,
            "Gas": 200,
            "BuildTime": 60
        },
        {
            "Name": "Robotics Bay",
            "Minerals": 200,
            "Gas": 200,
            "BuildTime": 65
        },
    ],

    "upgrades": [
        {
            "Name": "Warp Gate",
            "Minerals": 50,
            "Gas": 50,
            "BuildTime": 160
        },
    ]
}

var app = angular.module('myApp', []);
app.controller('homeController', ["$scope", "$timeout", function ($scope, $timeout) {
    $scope.units = data.units;
    $scope.buildings = data.buildings;
    $scope.upgrades = data.upgrades;

    /// Settings
    $scope.autoBuildProbes = false;

    $scope.supply = 7;
    $scope.supplyCap = 10;
    $scope.timeString = "00:00";
    $scope.mode = "Start";
    
    $scope.build = [];
    $scope.buildOrderText = "";

    var timeInt = 0;
    var timeStart = 0;
    var timerPromise;
    var previousElapsed = -1;

    start();
    function start() {
        var unit;
        $scope.units.forEach(function (unit) {
            unit.ThumbnailName = unit.Name.split(' ').join('-').toLowerCase();
            unit.Type = 'A';
        });

        $scope.buildings.forEach(function (building) {
            building.ThumbnailName = building.Name.split(' ').join('-').toLowerCase();
            building.Type = 'B';
        });

        $scope.upgrades.forEach(function (upgrade) {
            upgrade.ThumbnailName = upgrade.Name.split(' ').join('-').toLowerCase();
            upgrade.Type = 'U'
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

    function shallowCopy(obj) {
        var copy = {};
        for (var attr in obj) {
            if (attr !== '$$hashKey' && obj.hasOwnProperty(attr)) {
                copy[attr] = obj[attr];
            }
        }
        return copy;
    }

    function createAction(obj) {
        var action = shallowCopy(obj);

        action.Time = $scope.timeString;
        action.SupplyAtBuild = $scope.supply;
        return action;
    }

    function stop() {
        $timeout.cancel(timerPromise);
        $scope.reset();
    }

    $scope.reset = function() {
        $scope.supply = 7;
        $scope.supplyCap = 10;
        $scope.timeString = "00:00";
        $scope.build = [];
        $scope.buildOrderText = "";
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

    $scope.incrementCount = function (unit, doIncrement) {
        if (unit.Type === 'A') {
            if (doIncrement) {
                unit.Count++;
                $scope.supply += unit.Supply;
            } else if (unit.Count > 1) {
                unit.Count--;
                $scope.supply -= unit.Supply;
            }
        }
    }

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

    $scope.addUnit = function (unit) {
        if ($scope.supplyCap >= ($scope.supply + unit.Supply)) {
            var line = "";
            line = "\n" + unit.Name + " at " + $scope.timeString;
            $scope.buildOrderText += line;

            $scope.supply += unit.Supply;
            var action = createAction(unit);
            action.Count = 1;
            $scope.build.push(action);
        }
    }

    $scope.addBuilding = function (building) {
        var line = "";
        line = "\n" + building.Name + " at " + $scope.timeString;
        $scope.buildOrderText += line;

        var action = createAction(building);
        $scope.build.push(action);

        if (building.Name === "Pylon") {
            $scope.supplyCap += 8;
        }
    }

    $scope.addUpgrade = function (upgrade) {
        var line = "";
        line = "\n" + upgrade.Name + " at " + $scope.timeString;
        $scope.buildOrderText += line;

        var action = createAction(upgrade);
        $scope.build.push(action);
    }

    $scope.removeAction = function (action) {
        for (var i = 0; i < $scope.build.length; i++) {
            if ($scope.build[i].SupplyAtBuild === action.SupplyAtBuild) {
                $scope.build.splice(i, 1);
                if (action.Type === 'A')
                    $scope.supply -= action.Count * action.Supply;

                if (action.Name === 'Pylon')
                    $scope.supplyCap -= 8;
                break;
            }
        }
    }
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