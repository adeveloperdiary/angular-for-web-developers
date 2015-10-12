angular.module('taskTracker')
    .service('dataService',['$http','$q',function($http,$q){

        var selectedLabel="";

        var arrLabels=[];
        var arrAllTasks=[];

        this.loadTaskdata=function(){

            var defered=$q.defer();
            $http.get('data/data.json')
                .success(function(data){
                    defered.resolve(data);
                    arrLabels=data.labels;
                    arrAllTasks=data.tasks;
                })
                .error(function(data){
                    defered.resolve("Error");
                });
            return defered.promise;
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

        this.updateTask=function(updatedTask){
            angular.forEach(arrAllTasks, function(task, key) {
                if(task.id===updatedTask.id){
                    arrAllTasks[key]=updatedTask;
                }
            });
        };

        this.deleteTask=function(deletedTask){
            angular.forEach(arrAllTasks, function(task, key) {
                if(task.id===deletedTask.id){
                    arrAllTasks.splice(key,1);
                }
            });
        };

        this.getAllTasks=function(){
          return arrAllTasks;
        };

        this.getAllLabels=function(){
            return arrLabels;
        };

        this.setSelectedLabel=function(label){
            selectedLabel=label;
        };

        this.getSelectedLabel=function(){
            if(selectedLabel=="") {
                selectedLabel = "Inbox";
            }
            return selectedLabel;
        };

        this.addNewLabel=function(label){
            arrLabels.push(label);
        };

        this.addNewTask=function(tasks){
            arrAllTasks.push(tasks);
        };

    }]);