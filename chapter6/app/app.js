var module=angular.module('taskTracker',['ui.router']);

module.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/taskList');
}]);


