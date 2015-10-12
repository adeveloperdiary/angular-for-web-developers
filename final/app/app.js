angular.module('taskTracker',['ui.router'])
    .config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/taskList');

    })
;

