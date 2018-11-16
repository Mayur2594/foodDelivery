angular.module('CSApp', ['ngSanitize','ngResource','ui.bootstrap','ngFileUpload']).filter('startFrom', function () {
    return function (input, start) {
        start = +start;
       if(input!=undefined)
        {return input.slice(start);}
    }
}).controller('MembersController',['$scope','$http','$route','$location','$window', 'Upload',function ($scope,$http,$route,$location,$window,Upload) {
		
		
	 
	
}]);
	