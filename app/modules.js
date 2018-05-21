'use strict'

var myModule=angular.module('myModule',['ngRoute','ngAnimate'])

myModule.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
   
// $locationProvider.html5Mode(true);
// $locationProvider.hashPrefix('!'); 
    
    $routeProvider
    .when('/home',{
        templateUrl:'view/index.html',
        controller:'appController'
    })
    .when('/contact',{
        templateUrl:'view/contact.html',
        controller:'contactController'
    })
    .when('/contact-success',{
        templateUrl:'view/contact-success.html'
    })
    .when('/directory',{
        templateUrl:'view/directory.html',
        controller:'appController'
    })
    .otherwise({
        redirectTo:'/home'
    })
}])

myModule.directive('newObj',[function(){
    return{
        restrict:'E',
        scope:{
            object:"=",
            title:"="
        },
        templateUrl:'view/random.html',
        transclude:true,
        replace:true,
        controller:function($scope){
            $scope.random=Math.floor(Math.random()*5)
        }
    }
}])

myModule.controller('appController',['$scope','$http',function($scope,$http){
    // $scope.message="how r u"
    // $scope.array=['one','two',"three","four",'five']

    $scope.removeobj=function(obj){
        var removeObj=$scope.object.indexOf(obj)
        $scope.object.splice(removeObj,1)
    }

    $scope.addObj=function(){
        $scope.object.push({
            name:$scope.newobj.name,
            age:parseInt($scope.newobj.age),
            work:$scope.newobj.work,
            available:false
        })
        $scope.newobj.name=''
        $scope.newobj.age=''
        $scope.newobj.work=''
    }

    $scope.removeAll=function(){
        $scope.object=[]
    }
    
 
 $http.get('data/object.json').then(function(response){
    $scope.object=response.data;
 })

// console.log(angular.toJson($scope.object))
}])
myModule.controller('contactController',['$scope','$location',function($scope,$location){
    $scope.sendMessage=function(){
        $location.path('/contact-success')
    }

}])



