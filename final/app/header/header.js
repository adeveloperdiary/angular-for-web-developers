/**
 * Created by abhisekjana on 9/30/15.
 */
angular.module('taskTracker')
    .controller('headerController',
    ['$scope', '$state', '$stateParams','$rootScope',
        function ($scope, $state, $stateParams,$rootScope) {
            $scope.createNewLabel=function(){
                $state.transitionTo('newLabel',$stateParams,{reload:true});
            };


            $scope.txtFilter="";

            $scope.updateFilter=function(){
                $rootScope.filter = $scope.txtFilter;
            };
    }]);

