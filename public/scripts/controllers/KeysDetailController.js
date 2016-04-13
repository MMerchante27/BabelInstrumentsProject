angular.module("babelInstruments").controller("KeysDetailController", ["$window","$scope", "$routeParams", "$location","$sce", "APIClient", "paths","authService", "buyService",
    function($window,$scope, $routeParams, $location, $sce, APIClient, paths, authService, buyService) {


    // Scope init
    $scope.model = {};
    $scope.uiState = "loading";

    //Controller init
    $scope.$emit("ChangeTitle","Loading...");
        console.log("controller",$routeParams.id);

    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

    APIClient.getInstrument($routeParams.id).then(
        //Película  encontrada
        function(data) {
            $scope.model = data.instruments[0];
            $scope.uiState = 'ideal';
            $scope.$emit("ChangeTitle", $scope.model.title);
        },
        //Película no encontrada
        function(error) {
            $location.url(paths.notFound);
        }
    );

     $scope.comprar = function(data) {
            if (authService.getUserAuth()) {
                console.log("me compra");
                data.buy = "true";
                buyService.notifyShop(data);
            } else {
                console.log(data);
                $location.url(paths.login);
                // var url = URL.resolve(paths.bassDetail, { id: data._id });
                // $location.path(url);
            }

        }

     $scope.addFavorite = function(data) {

            if (authService.getUserAuth()) {
                var userName = authService.getUserAuth();
                var id = authService.getIdAuth();
                console.log("User name", userName);
                console.log("Data favorite", data);
                console.log("id", id);
                APIClient.getUser(id).then(
                    function(dataUser) {
                        console.log("Data user", dataUser)
                        if (dataUser.result == true) {
                            var userObj = dataUser.rows[0];
                            console.log("User Obj favorites",userObj)
                            console.log("User Obj favorites2",userObj.favorites)
                            console.log("data._id", data._id);
                            userObj.favorites.push(data._id);
                            console.log("FAVORITOS",userObj.favorites)
                            APIClient.modifyUser(userObj).then(
                                function(dataFav) {
                                    if (dataFav.result == true) {
                                         $window.alert("Favorito añadido");
                                        console.log(dataFav);
                                    } else {
                                        console.log("Error")
                                    }
                                },
                                function(dataFav) {
                                    console.log("Data bbdd", data);
                                    console.log("Err bbdd");
                                }
                            );
                            console.log("UserObj", userObj);
                        } else {
                            console.log("Error")

                        }
                    },
                    function(dataUser) {
                        console.log("Data bbdd", data);
                        console.log("Err bbdd");
                    }
                );

                //data.favorites = data;
                //buyService.notifyShop(data);
            } else {
                console.log(data);
                $location.url(paths.login);
                // var url = URL.resolve(paths.bassDetail, { id: data._id });
                // $location.path(url);
            }


        }



}]);
