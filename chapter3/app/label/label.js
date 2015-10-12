var module=angular.module('taskTracker');

module.controller('labelController',function($scope){
    $scope.data={
        "labels": [
            {
                "name": "Work",
                "color": "color_red"
            },
            {
                "name": "Home",
                "color": "color_green"
            },
            {
                "name": "Personal",
                "color": "color_blue"
            }
        ]};
});

