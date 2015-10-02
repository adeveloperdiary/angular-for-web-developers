angular.module('taskTracker',['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/taskList');

    }])

;

