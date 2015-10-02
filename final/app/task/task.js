angular.module('taskTracker')
    .config(['$stateProvider', '$urlRouterProvider',function($stateProvider){

        $stateProvider.state('showTasks',{
            url:'/taskList',
            templateUrl:'app/task/partial/taskList.template.html',
            controller:'taskListController'
        }).state('newTask',{
            url:'/newTask',
            templateUrl:'app/task/partial/newTask.template.html',
            controller:'newTaskController'
        });
    }])
    .controller('taskListController',['$scope','$state','$stateParams','dataService','$rootScope',
        function($scope,$state,$stateParams,dataService,$rootScope){

        $scope.filterText={
            name:''
        };

        $rootScope.$watch('filter',function(data){
            if((data!=undefined || data!=null)){
                $scope.filterText.name=data;
            }
        });

        $scope.label=dataService.getSelectedLabel();

        $scope.updateView=function(){
            if($scope.label=="All Pending"){
                $scope.tasks=dataService.getTaskByCompletionStatus(false);
            }else if($scope.label=="All Tasks"){
                $scope.tasks=dataService.getAllTasks();
            }
            else {
                $scope.tasks=dataService.getTasksForLabel($scope.label);
            }
        };

        $scope.tasks=[];
        $scope.txtTaskName="";

        $scope.updateView();

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

        $scope.createNewTask=function(){
            $state.transitionTo('newTask',$stateParams,{reload:true});
        };

        $scope.updateTask=function(task){
            dataService.updateTask(task);
        };

        $scope.deleteTask=function(task){
            dataService.deleteTask(task);
            $scope.updateView();
        };
    }])
    .controller('newTaskController',['$scope','$state','$stateParams','dataService',
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
;
