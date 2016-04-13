angular.module("babelInstruments").service('logService', ["$rootScope",
    function($rootScope) {

        return {
            subscribeLogin: function(scope, callback) {
                var handler = $rootScope.$on('login', callback);
            },

            notifyLogin: function() {
                $rootScope.$emit('login');
            },

            subscribeLogout: function(scope, callback) {
                var handler = $rootScope.$on('logout', callback);
            },

            notifyLogout: function() {
                $rootScope.$emit('logout');
            }
        };

     
    }
]);
