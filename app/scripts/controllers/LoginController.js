var loginapp = angular.module('RasoiApp', ['ngSanitize','ui.bootstrap','ngFileUpload']).filter('startFrom', function () {
    return function (input, start) {
        start = +start;
       if(input!=undefined)
        {return input.slice(start);}
    }
});
loginapp.controller('LoginController',['$scope','$http','$location','$window','$timeout', 'Upload',function ($scope,$http,$location,$window,$timeout,Upload) {
	
	
	
	$scope.sliderarray= [{imagename:'slide_2.jpg'},{imagename:'slide_3.jpg'},{imagename:'slide_4.jpg'},{imagename:'slide1.jpeg'}];
	
	
			$scope.GetUserRole = function()
			{
				$http({
						  method: 'GET'
						  , url: '/api/GetUserRole/'
						  , dataType: 'jsonp'
						}).then(function (response) {
							$scope.UserRoles = response.data;
						});
			};
			
			
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
	
	
	
	/* LOGIN USER */
	
	$scope.AuthUser = function()
	{		
		$http({
			method  : 'POST',
			url     : '/api/authUser',
			data    : $scope.user ,
			headers : {'Content-Type': 'application/json'} 
		}).then(function(response) {
			if(response.data.success === false)
			{
				$scope.loginerror = response.data.message; 
			}
			if(response.data.success === true)
			{
				location.href="Dashboard.html";
			}
		});
		
	}
	
	
	/* LOGIN USER */
	
	
	
	
	
	/* COMPANY DETAILS */
	
				$scope.ListCompanies = function()
				{
					
						$http({
						  method: 'GET'
						  , url: '/api/ListCompanies/'
						  , dataType: 'jsonp'
						}).then(function (response) {
							$scope.CompaniesList = response.data;
							$scope.pagination($scope.CompaniesList);
						});
				}
				
				
				$scope.GetCompaniesDetails = function(companyid)
				{
					
						$http({
						  method: 'GET'
						  , url: '/api/GetCompaniesDetails/'+companyid
						  , dataType: 'jsonp'
						}).then(function (response) {
							console.log(response)
							$scope.companydetails = response.data;
						});
				}
	
	
		$scope.SaveCompanyDetails = function()
		{
			$http({
			method  : 'POST',
			url     : '/api/SaveCompanyDetails',
			data    : $scope.companydetails ,
			headers : {'Content-Type': 'application/json'} 
		}).then(function(response) {
			alert(response.data.message);
			$scope.companydetails =[];
			$scope.ListCompanies();
		});
		}
	
	
	
	/* COMPANY DETAILS */
	
	
		
	/* COMPANY DETAILS */
	
				$scope.ListCompanies = function()
				{
					
						$http({
						  method: 'GET'
						  , url: '/api/ListCompanies/'
						  , dataType: 'jsonp'
						}).then(function (response) {
							$scope.CompaniesList = response.data;
							$scope.pagination($scope.CompaniesList);
						});
				}
				
				
				$scope.GetCompaniesDetails = function(companyid)
				{
					
						$http({
						  method: 'GET'
						  , url: '/api/GetCompaniesDetails/'+companyid
						  , dataType: 'jsonp'
						}).then(function (response) {
							console.log(response)
							$scope.companydetails = response.data;
						});
				}
	
	
		$scope.SaveUserDetails = function()
		{
			$http({
			method  : 'POST',
			url     : '/api/SaveUserDetails',
			data    : $scope.userDetails ,
			headers : {'Content-Type': 'application/json'} 
		}).then(function(response) {
			alert(response.data.message);
			$scope.userDetails =[];
			$scope.ListCompanies();
		});
		}
	
	
	
	/* COMPANY DETAILS */
	
	
		
		
		
		/* -------------- */
}]);

loginapp.directive('customAutofocus', function() {
  return{
         restrict: 'A',

         link: function(scope, element, attrs){
           scope.$watch(function(){
             return scope.$eval(attrs.customAutofocus);
             },function (newValue){
               if (newValue == true){
                   element[0].focus();
               }
           });
         }
     };
})
;

	