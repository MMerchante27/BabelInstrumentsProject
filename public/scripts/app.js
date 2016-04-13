angular.module("babelInstruments", ["ngRoute", "URL"]).config(
    ["$routeProvider", "paths", function($routeProvider, paths) {
        // Configuro las URLs de la aplicación
        $routeProvider.when(paths.home, {
            templateUrl: 'views/InstrumentList.html'
        }).when(paths.instruments, {
            templateUrl: 'views/InstrumentList.html'
        }).when(paths.drums, {
            templateUrl: 'views/DrumsList.html'
        }).when(paths.guitars, {
            templateUrl: 'views/GuitarList.html'
        }).when(paths.keys, {
            templateUrl: 'views/KeysList.html'
        }).when(paths.basses, {
            templateUrl: 'views/BassList.html'
        }).when(paths.guitarDetail, {
            templateUrl: 'views/GuitarDetail.html'
        }).when(paths.bassDetail, {
            templateUrl: 'views/BassDetail.html'
        }).when(paths.drumsDetail, {
            templateUrl: 'views/DrumsDetail.html'
        }).when(paths.keysDetail, {
            templateUrl: 'views/KeyDetail.html'
        }).when(paths.login, {
            templateUrl: 'views/Login.html'
        }).when(paths.logout, {
            templateUrl: 'views/Logout.html'
        }).when(paths.signup, {
            templateUrl: 'views/Signup.html'
        }).when(paths.buy, {
            templateUrl: 'views/BuyList.html'
        }).when(paths.fav, {
            templateUrl: 'views/FavoriteList.html'
        }).otherwise({
            templateUrl: 'views/404.html'
        })
    }]
);
