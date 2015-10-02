angular.module('taskTracker')
    .config(['$stateProvider', '$urlRouterProvider',function($stateProvider){

        $stateProvider.state('newLabel',{
            url:'/newLabel',
            templateUrl:'app/label/partial/newLabel.template.html',
            controller:'newLabelController'
        });

    }])

    .controller('labelController',
    ['$scope','$state','$stateParams','dataService',
        function($scope,$state,$stateParams,dataService){

        $scope.labels=[];

        dataService.loadTaskdata().then(function(data){
            $scope.labels=dataService.getAllLabels();
        });

        $scope.getTasksLengthForLabel=function(label){
          return dataService.getTasksForLabel(label).length;
        };

        $scope.getPendingTasksLength=function(){
            return dataService.getTaskByCompletionStatus(false).length;
        };

        $scope.getAllTasksLength=function(){
            return dataService.getAllTasks().length;
        };


        $scope.setLabel=function(label){
            dataService.setSelectedLabel(label);
            $state.transitionTo('showTasks',$stateParams,{reload:true});
        };


    }])
    .controller('newLabelController',
        ['$scope','$state','$stateParams','dataService',
        function($scope,$state,$stateParams,dataService){

            $scope.name="";
            $scope.color=""

            $scope.setColor=function(value){
                $scope.color=value;
            };

            $scope.saveLabel=function(){

                var label={
                    "name":$scope.name,
                    "color":$scope.color
                };

                dataService.addNewLabel(label);

                dataService.setSelectedLabel($scope.name);
                $state.transitionTo('showTasks',$stateParams,{reload:true});

            };
    }]);

;
