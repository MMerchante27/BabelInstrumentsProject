angular.module("babelInstruments").controller("FavoriteListController", ["$scope", "$log", "$location", "authService", "APIClient", "URL", "paths",
    function($scope, $log, $location, authService, APIClient, URL, paths) {

        // Scope init
        $scope.model = [];

        $scope.uiState = 'loading';
        $scope.url = URL.resolve;
        $scope.user = "";
        var fav = [];
        //Scope methods

        //Controller start

        var userName = authService.getUserAuth();
        var id = authService.getIdAuth();
        APIClient.getUser(id).then(
            function(dataUser) {
                console.log("Data user", dataUser)
                if (dataUser.rows != undefined) {
                    $scope.user = dataUser.rows[0];
                    for (var i = 0; i < $scope.user.favorites.length; i++) {
                        var id = $scope.user.favorites[i];

                        APIClient.getInstrument(id).then(
                            function(data) {
                                if(data.instruments != undefined){
                                     console.log("Data favorrite list", data);
                                    $scope.model.push(data.instruments[0]);
                                    console.log($scope.model);
                                    $scope.uiState = 'ideal';
                                } else {
                                        $scope.uiState = 'blank';
                                    }
                               
                            },
                            function(data) {
                                console.log("Data bbdd", data);
                                console.log("Err bbdd");
                            }
                        );

                    }
                } 

            },

            //Promesa rechazada
            function(dataUser) {
                $log.log("ERROR", data);
                $scope.uiState = 'error';
            }


        );




    }
]);
