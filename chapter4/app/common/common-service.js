var module=angular.module('taskTracker');

module.service('dataService',function($http,$q) {

    var arrLabels = [];
    var arrAllTasks = [];

    this.loadTaskData = function () {

        var defer=$q.defer();
        $http.get('data/data.json')
            .success(function (data) {
                defer.$$resolve(data);
                arrLabels = data.labels;
                arrAllTasks = data.tasks;
            })
            .error(function (data) {
                defer.reject("Error");
            });
        return defer.promise;
    };

    this.getTasksForLabel=function(label){

        var tasks=[];

        angular.forEach(arrAllTasks,function(obj,key){
            if(obj.labelName===label){
                tasks.push(obj);
            }
        });

        return tasks;
    };

    this.getTaskByCompletionStatus=function(status){
        var tasks=[];
        angular.forEach(arrAllTasks, function(task, key) {
            if(task.completed===status){
                tasks.push(task);
            }
        });

        return tasks;
    };

    this.getAllLabels=function(){
        return arrLabels;
    };
    this.getAllTasks=function(){
        return arrAllTasks;
    };
});