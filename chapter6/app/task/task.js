var module=angular.module('taskTracker');

module.config(['$stateProvider',function($stateProvider){

    $stateProvider.state('showTasks',{
        url:'/taskList',
        templateUrl:'app/task/partial/taskList.template.html',
        controller:'taskListController'
    }).state('newTask',{
        url:'/newTask',
        templateUrl:'app/task/partial/newTask.template.html',
        controller:'newTaskController'
    });
}]);

module.controller('taskListController',['$scope','dataService','$state','$stateParams','$rootScope'
    ,function($scope,dataService,$state,$stateParams,$rootScope){

    $scope.filterText={
        name:''
    };

    $rootScope.$watch('filter',function(data){
        if((data!=undefined || data!=null)){
            $scope.filterText.name=data;
        }
    });

    $scope.label=dataService.getSelectedLabel();

    if($scope.label=="All Pending"){
        $scope.tasks=dataService.getTaskByCompletionStatus(false);
    }else if($scope.label=="All Tasks"){
        $scope.tasks=dataService.getAllTasks();
    }
    else {
        $scope.tasks=dataService.getTasksForLabel($scope.label);
    }

    $scope.updateTask=function(task){
        dataService.updateTask(task);
    };

    $scope.createNewTask=function(){
        $state.transitionTo('newTask',$stateParams,{reload:true});
    };

    $scope.createQuickTask=function(){

        if($scope.txtTaskName.trim()!=""){
            $scope.task={
                "id":(new Date()).getTime(),
                "name":$scope.txtTaskName,
                "due_date":null,
                "completed":false,
                "labelName":$scope.label
            };
            dataService.addNewTask($scope.task);
            $scope.tasks=dataService.getTasksForLabel($scope.label);
            $scope.txtTaskName="";
        }
    };

}]);

module.controller('newTaskController',['$scope','$state','$stateParams','dataService',
    function($scope,$state,$stateParams,dataService) {

        $scope.name="";
        $scope.due_date="";
        $scope.labelName=dataService.getSelectedLabel();


        $scope.saveTasks=function(){

            if($scope.name.trim()!="") {

                $scope.task = {
                    "id": (new Date()).getTime(),
                    "name": $scope.name,
                    "due_date": $scope.due_date,
                    "completed": false,
                    "labelName": $scope.labelName

                };
                dataService.addNewTask($scope.task);

                $state.transitionTo('showTasks', $stateParams, {reload: true});
            }
        };
    }]);
