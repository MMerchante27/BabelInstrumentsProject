    angular.module("babelInstruments").controller('SignUpFormController', ['$scope', "$location", "$rootScope","$window","APIClient", "paths", "logService", "authService",
    function($scope, $location, $rootScope,$window, APIClient, paths, logService, authService) {

        //Scope init
        $scope.model = {};
        $scope.uiState = 'loading';

        $scope.credentials = {
            name: '',
            email: '',
            password: ''
        };

        //Scope methods
        $scope.saveUser = function(credentials) {
            APIClient.userAuth(credentials).then(
                function(data) {
                   if(data.result == true){
                    $window.alert("Sign up successful");
                    $location.path(paths.login);

                  }else {
                    $window.alert("Incorrect credentials");
                  }
                },

                //Promesa rechazada
                function(data) {
                    console.log("Data bbdd", data);
                    console.log("Err bbdd");
                }
            );


        };

        logService.subscribeLogin($scope, function somethingChanged() {
            $scope.userState = 'logged';
            $location.url(paths.instruments);

        });



    }
]);
