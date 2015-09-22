function shallowCopy(obj) {
    var copy = {};
    for (var attr in obj) {
        if (attr !== '$$hashKey' && obj.hasOwnProperty(attr)) {
            copy[attr] = obj[attr];
        }
    }
    return copy;
}

var app = angular.module('SCBW', ['ngRoute']);
