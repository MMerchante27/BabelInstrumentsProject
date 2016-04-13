angular.module("babelInstruments").controller("GuitarListController", ["$scope", "$log","$location", "APIClient","URL","paths",
 function($scope, $log,$location, APIClient, URL, paths) {

    // Scope init
    $scope.model = [];

    $scope.uiState = 'loading';
    $scope.url = URL.resolve;
    $scope.type = "guitar";

    //Scope methods

    //Controller start

    APIClient.getInstruments($scope.type).then(
        // Promesa resuelta
        function(data) {
            $log.log("SUCCESS!!!!", data);
            $scope.model = data.instruments;
            if ($scope.model.length == 0) {
                $scope.uiState = 'blank';
            } else {
                $scope.uiState = "ideal";

            }
        },

        //Promesa rechazada
        function(data) {
            $log.log("ERROR", data);
            $scope.uiState = 'error';
        }
    );

    $scope.showMore = function(data){       
            var url = URL.resolve(paths.guitarDetail, { id: data._id });
            $location.path(url);
        }

   
}]);