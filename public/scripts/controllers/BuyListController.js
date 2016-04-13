angular.module("babelInstruments").controller("BuyListController", ["$scope", "$log", "$location", "$window", "logService", "APIClient", "URL", "paths",
    function($scope, $log, $location, $window, logService, APIClient, URL, paths) {

        // Scope init
        $scope.model = [];

        $scope.uiState = 'loading';
        $scope.url = URL.resolve;
        $scope.totalPrice = 0;


        //Scope methods

        //Controller start

        APIClient.getInstrumentsBuy().then(
            // Promesa resuelta
            function(data) {
                $scope.model = data.instruments;
                if ($scope.model.length == 0) {
                    $scope.uiState = 'blank';
                } else {
                    $scope.uiState = "ideal";
                    console.log($scope.model);
                    for (var i = 0; i < $scope.model.length; i++) {
                        console.log("Modelo precio", $scope.model[i].price);
                        console.log("precio total", $scope.totalPrice);
                        $scope.totalPrice = $scope.model[i].price + $scope.totalPrice;
                    }

                }
            },

            //Promesa rechazada
            function(data) {
                $log.log("ERROR", data);
                $scope.uiState = 'error';
            }
        );
        console.log($scope.model.length);




        logService.subscribeLogout($scope, function somethingChanged() {
            console.log
            for (var i = 0; i < $scope.model.length; i++) {
                $scope.model[i].buy = 'false';

                APIClient.modifyInstrument($scope.model[i]).then(
                    function(data) {
                        if (data.result == true) {
                            console.log(data);
                        } else {
                            $window.alert("ERROR");
                        }
                    },
                    function(data) {
                        console.log("Data bbdd", data);
                        console.log("Err bbdd");
                    }


                );
            }
        });


    }
]);
