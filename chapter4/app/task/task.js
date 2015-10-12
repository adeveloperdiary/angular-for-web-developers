var module=angular.module('taskTracker');

module.controller('taskListController',function($scope,dataService){

    $scope.data1=dataService.getAllTasks();

});
