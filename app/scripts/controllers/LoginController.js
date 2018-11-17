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
							$scope.userid = parseInt($scope.credentials.id);
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
		
	};
	
	
	$scope.setnewPassword = function()
	{		
		$http({
			method  : 'POST',
			url     : '/api/setnewPassword',
			data    : $scope.usersDetails ,
			headers : {'Content-Type': 'application/json'} 
		}).then(function(response) {
			swal({
			  type: response.data.type,
			  title: response.data.title,
			  text: response.data.message,
			}).then(function(){
				location.reload();
			})
		});
		
	};
	
	
	$scope.CheckFisrTimeLogin = function()
	{		
		$http({
			method  : 'GET',
			url     : '/api/CheckFisrTimeLogin/',
			dataType: 'jsonp'
			}).then(function(response) {
			if(response.data[0].firstlogin === 0)
			{
				 $("#ResetPassword").modal({
					show: true,
					backdrop: 'static'
				});
			}
			
			
			
		});
		
	}
	
	$scope.showHidePassword = function()
  {
		var passwordfield = document.getElementById('password');
		if (passwordfield.type === "password") {
			passwordfield.type = "text";
		}
		else {
			passwordfield.type = "password";
		}
		if(document.getElementById('confpassword'))
		{
		var passwordfield1 = document.getElementById('confpassword');
		if (passwordfield1.type === "password") {
			passwordfield1.type = "text";
		}
		else {
			passwordfield1.type = "password";
		}
		}
		
  };
  
  
  
  
  function scorePassword(pass) {
    var score = 0;
    if (!pass)
        return score;

    // award every unique letter until 5 repetitions
    var letters = new Object();
    for (var i=0; i<pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    var variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    }

    variationCount = 0;
    for (var check in variations) {
        variationCount += (variations[check] == true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return parseInt(score);
}

function checkPassStrength(pass) {
    var score = scorePassword(pass);
		if (score > 80)
		{
			if($scope.Confirmpassword === $scope.usersDetails.password)
			{
				$('#resetpassbtn').prop('disabled', false);
			}
			return "Strong";
		}
		if (score > 60)
		{
			if($scope.Confirmpassword === $scope.usersDetails.password)
			{
				$('#resetpassbtn').prop('disabled', false);
			}
			return "Good";
		}
		if (score >= 30)
		{
			return "Weak";
		}
	
		
    return "";
}

function ColorPassword(pass) {
    var score = scorePassword(pass);
    if (score > 80)
        return "green";
    if (score > 60)
        return "yellow";
    if (score >= 30)
        return "red";

    return "";
}

   $scope.verfiPasswordConf = function(password,confpassword)
  {
		if(confpassword)
		{
			if(confpassword != password)
			{
				$scope.passstrenth = "Password and confirm password does not match";
				$('#resetpassbtn').prop('disabled', true);
			}
			if(confpassword === password)
			{
				$scope.passstrenth = (checkPassStrength(password));
			}
		}
  };
  
  
  $scope.verifyPasswordStrongness = function(passkey)
  {
		if(!passkey || passkey === '')
		$scope.passwordcalc = false;
		else
		$scope.passwordcalc = true;
	
		$scope.passstrenth = (checkPassStrength(passkey));
        $scope.passscore = (scorePassword(passkey));
        $scope.prgcol = (ColorPassword(passkey));
		
		$scope.verfiPasswordConf(passkey,$scope.Confirmpassword);
		
  };
	
	
	
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
		
		$scope.ChangeUserstatus = function(userid)
		{
			$http({
				method: 'GET'
				, url: '/api/DisableUserDetails/'+userid
				, dataType: 'jsonp'
				}).then(function (response) {
					swal({
						type: response.data.type,
						title: response.data.title,
						text: response.data.message,
						}).then(function(){
							$scope.ListUsers();
						})
				});
		};
		
				$scope.ListUsers = function()
				{
					
						$http({
						  method: 'GET'
						  , url: '/api/ListUsers/'
						  , dataType: 'jsonp'
						}).then(function (response) {
							$scope.UsersList = response.data;
							$scope.pagination($scope.UsersList);
						});
				};
				
				
				$scope.GetUserDetails = function(userid)
				{
					
						$http({
						  method: 'GET'
						  , url: '/api/GetUserDetails/'+userid
						  , dataType: 'jsonp'
						}).then(function (response) {
							$('#role').materialSelect()
							$scope.userDetails = response.data;
						});
				};
				
				$scope.DeleteUserDetails = function(userid)
				{
					swal({
						  title: 'Are you sure?',
						  text: "You won't be able to revert this!",
						  type: 'warning',
						  showCancelButton: true,
						  confirmButtonColor: '#3085d6',
						  cancelButtonColor: '#d33',
						  confirmButtonText: 'Yes, delete it!'
						}).then((result) => {
						  if (result.value) {
							  
							  
							  
							  $http({
						  method: 'DELETE'
						  , url: '/api/DeleteUserDetails/'+userid
						  , dataType: 'jsonp'
						}).then(function (response) {
							if(response.data.status === 2)
							{
								swal({
								  title: response.data.title,
								  text: response.data.message,
								  type: 'warning',
								  showCancelButton: true,
								  confirmButtonColor: '#3085d6',
								  cancelButtonColor: '#d33',
								  confirmButtonText: 'Yes, Disable it!'
								}).then((result) => {
								  if (result.value) {
									    $scope.ChangeUserstatus(userid);
								  }
								})
							}
							else
							{
								swal({
										  type: response.data.type,
										  title: response.data.title,
										  text: response.data.message,
										}).then(function(){
											$scope.ListUsers();
										})
								
							} 
							  
							
						  });
						  }
						})
						
				};
	
	
		$scope.SaveUserDetails = function()
		{
			$http({
			method  : 'POST',
			url     : '/api/SaveUserDetails',
			data    : $scope.userDetails ,
			headers : {'Content-Type': 'application/json'} 
		}).then(function(response) {
			
			swal({
			  type: response.data.type,
			  title: response.data.title,
			  text: response.data.message,
			}).then(function(){
				$scope.userDetails =[];
				$scope.ListUsers();
			})
		});
		};
	
	
	
	/* COMPANY DETAILS */
	
	
	
	/* OFFERS */
	$scope.ListOffers = function()
	{
					$http({
						  method: 'GET'
						  , url: '/api/ListOffers/'
						  , dataType: 'jsonp'
						}).then(function (response) {
							$scope.OffersList = response.data;
							$scope.pagination($scope.OffersList);
						});
	};
	
	$scope.GetOfferDetails = function(offerid)
	{
					$http({
						  method: 'GET'
						  , url: '/api/GetOfferDetails/'+offerid
						  , dataType: 'jsonp'
						}).then(function (response) {
							$scope.OfferDetails = response.data;
						});
	};
	
	
	$scope.SaveOffers = function()
	{
		if ($scope.offersdetails.file.$valid && $scope.file) {
			 var passeddata = {file: $scope.file, offersDetails:$scope.OfferDetails[0]}
		 }
		 else
		 {
			  var passeddata = {offersDetails:$scope.OfferDetails[0]}
		 }
        Upload.upload({
            url: '/api/SaveOffers',
            data: passeddata
        }).then(function (response) {
            swal({
			  type: response.data.type,
			  title: response.data.title,
			  text: response.data.message,
			}).then(function(){
				$scope.OfferDetails =[];
				$scope.ListOffers();
			})
			
			}, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
           // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        }); 
	};
	
	/* OFFERS */
	
	
	/* USER PROFILE */
	
		$scope.getUserProfile = function()
		{
					$http({
						  method: 'GET'
						  , url: '/api/getUserProfile/'
						  , dataType: 'jsonp'
						}).then(function (response) {
									$scope.userProfile = response.data;
									console.log($scope.userProfile);
						});
		};
		
		
		$scope.getCuurentAddress = function()
		{
				 if (navigator.geolocation) {
					/* navigator.geolocation.getCurrentPosition(function(position) {
						
						 var lat = position.coords.latitude;
						var lang = position.coords.longitude;
						console.log(lang);
						$http({
							method  : 'POST',
							url     : '/api/ConvertAddressFromlatlang',
							data    : {'lat':lat,'lang':lang} ,
							headers : {'Content-Type': 'application/json'} 
						}).then(function(response) {
							console.log(response.data)
						});
					}); */
					
					
					var options = {
                enableHighAccuracy: true
            };

			navigator.geolocation.getCurrentPosition(function(pos) {
                $scope.position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                console.log(JSON.stringify($scope.position));   
				var geocoder = new google.maps.Geocoder;
				
						var latlng = {lat: pos.coords.latitude, lng: pos.coords.longitude};
						geocoder.geocode({'location':  $scope.position}, function(results, status) {
						  if (status === 'OK') {
							if (results[0]) {
								document.getElementById('companyaddress').focus();
								$scope.userProfile[0].lat = latlng.lat;
								$scope.userProfile[0].lan = latlng.lng;
								$scope.userProfile[0].companyaddress = results[0].formatted_address;
	
							} else {
							  window.alert('No results found');
							}
						  } else {
							//window.alert('Geocoder failed due to: ' + status);
							
							
							$http({
						  method: 'GET'
						  , url:'https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox='+latlng.lat+'%2C'+latlng.lng+'%2C250&mode=retrieveAddresses&maxresults=1&gen=9&app_id=F2DrM7GiRxDODD2SR10H&app_code=KA7GSs5492GnQ5Xxzq791Q'
						  , dataType: 'jsonp'
						}).then(function (response) {
									document.getElementById('companyaddress').focus();
									console.log(response.data.Response.View[0].Result[0].Location.Address.Label);
									$scope.userProfile[0].lat = latlng.lat;
									$scope.userProfile[0].lan = latlng.lng;
									$scope.userProfile[0].companyaddress = response.data.Response.View[0].Result[0].Location.Address.Label;
						});
							
							
							
						  }
						});
					  
				
				
				
				
            }, 
            function(error) {                    
                alert('Unable to get location: ' + error.message);
            }, options);
					
					
					
					
					}	
		};
		
			
$scope.UpdateUserProfile = function()
	{
		if ($scope.userprofile.file.$valid && $scope.file) {
			 var passeddata = {file: $scope.file, userdetails:$scope.userProfile[0]}
		 }
		 else
		 {
			  var passeddata = {userdetails:$scope.userProfile[0]}
		 }
        Upload.upload({
            url: '/api/UpdateUserProfile',
            data: passeddata
        }).then(function (response) {
            swal({
			  type: response.data.type,
			  title: response.data.title,
			  text: response.data.message,
			}).then(function(){
				$scope.getUserProfile();
			})
			
			}, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
           // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        }); 
	};
	
	
	
	/* USER PROFILE */
	
	
	
	
		
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

	