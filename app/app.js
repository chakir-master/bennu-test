var bennuApp = angular.module('bennuApp', ['ngRoute']);

bennuApp.config(['$routeProvider', function($routeProvider){

    $routeProvider
    .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'bennuController'
    })
    .when('/timeline', {
        templateUrl: 'views/timeline.html',
        controller: 'bennuController'
    })
    .otherwise({
        redirectTo: '/timeline'
    });
}]);

bennuApp.controller('bennuController', ['$scope', '$http', function($scope, $http) {

    $scope.theDate = '';
    $scope.formatDate = 'MMM d';
    $scope.formatTime = 'h:mma';
    $scope.timeClass = function(data) {
         if(data.shipmentIsDelayed) {
             return "timeline-body2";
         } else{
            return "timeline-body";
         }
    }
    $scope.middleClass = function(data) {
        if(data.shipmentIsDelayed) {
            return "middleIconCircle2";
        } else{
           return "middleIconCircle";
        }
    }
    $scope.nth = function(data) {
        var d = data.eventDateTime;
        var dateTime = new Date(Date.parse(d));
        var day = dateTime.getDate().toLocaleString('dd');
        var suffixes = ["th", "st", "nd", "'d"];
        var relevantDigits = (day < 30) ? day % 20 : day % 30;
        return (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
    }

    //Hide & show the date
    // $scope.isThere = function(data) {
    //     var hide = $scope.theDate == data.eventDateTime ? true: false;
    //     $scope.theDate = data.eventDateTime;
    //     console.log($scope.theDate, hide, data.eventDateTime);
    //     return hide; //Must be show
    // }

    // $scope.isThere = function(data) {
    //     var d = data.eventDateTime;

    //     if(dates.includes(d)) {
    //         //get the index
    //         let index = dates.indexOf(d);
    //         //remove & return false
    //         dates.splice(index, 1);
    //         // console.log(d);
    //         return false;
    //     } else {
    //         dates.push(d);
    //         //push & return true
    //         console.log(d ,'added to ', dates);
    //         return true;
    //     }
    //     // return false;
    // }


    $http.get('data/data.json').then(function successCallback(response) {
        $scope.datas = response.data['shipmentHistory'];
        // console.log(response.data['shipmentHistory']);
    });

}]);