angular.module("babelInstruments").controller('InstrumentListController', ['URL', 'apiPaths', '$scope', "$filter", "paths", "$location", "APIClient", "$sce",
    function(URL, apiPaths, $scope, $filter, paths, $location, APIClient, $sce) {


        // var usuarioAutenticado = authService.getUserAuth();
        $scope.uiState = 'loading';
         
        // Scope init
         $scope.model = {
            selectedItem: paths.instruments
        };
        $scope.uiState = 'ideal';

        $scope.paths = paths;

        
        


    }
]);
