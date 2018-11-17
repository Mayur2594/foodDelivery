var MasterApp = angular.module('MasterApp', ['ngSanitize','ngResource','ui.bootstrap','ngFileUpload']).filter('startFrom', function () {
    return function (input, start) {
        start = +start;
       if(input!=undefined)
        {return input.slice(start);}
    }
});
MasterApp.controller('MastersController',['$scope','$http','$window', 'Upload',function ($scope,$http,$window,Upload) {
	
	
	$scope.SignOut = function()
			{
				$http({
						  method: 'GET'
						  , url: '/api/SignOut/'
						  , dataType: 'jsonp'
						}).then(function (response) {
							alert(response.data.message)
							location.href="index.html";
						});
			};
			
			function getCoockies()
			{
				$http({
						  method: 'GET'
						  , url: '/api/getCoockies/'
						  , dataType: 'jsonp'
						}).then(function (response) {
							$scope.credentials = response.data;
						});
			};
			getCoockies();
	
		$scope.checkcurrpage=function(myValue){
			
			if(myValue == null || myValue == 0)
				myValue = 1;
			
		if(!myValue){
		 window.document.getElementById("mypagevalue").value = $scope.currentPage+1;
		 var element = window.document.getElementById("mypagevalue");
		 if(element)
			 element.focus();
		$scope.currentPage = $scope.currentPage;
		$scope.myValue = null;
		}
		
		else{
			$scope.dispval = "";
			if(myValue-1 <= 0){
				$scope.currentPage=0;
			}
			else{
				$scope.currentPage=myValue-1;
				
				if(!$scope.currentPage){$scope.currentPage=0;}
			}
		}};
			
			$scope.pagination = function(listdata)
			{
					$scope.recordsdisplay = [{value:10,name:10},{value:25,name:25},{value:50,name:50},{value:100,name:100},{value:listdata.length,name:'All'}]
					$scope.currentPage = 0;
					$scope.pageSize = 10;
					if($scope.myValue > listdata.length)
					{
						$scope.myValue = 1;
					}
								//$(".loader").fadeOut("slow");
					$scope.numberOfPages = function () {
						return Math.ceil(listdata.length / $scope.pageSize);
					};
			};
	
	
	
	
	
}]);
	
	
	
	