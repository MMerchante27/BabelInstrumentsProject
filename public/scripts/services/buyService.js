angular.module("babelInstruments").service('buyService', ["$rootScope","$window","APIClient",
    function($rootScope,$window, APIClient) {

        return {
            subscribeShop: function(scope, callback) {
                var handler = $rootScope.$on('shop', callback);
            },

            notifyShop: function(data) {
                $rootScope.$emit('shop');
                APIClient.modifyInstrument(data).then(
                    function(data) {
                        if (data.result == true) {
                            console.log(data);
                            $window.alert("PERFECTO");
                        } else {
                            $window.alert("NO PERFECTO");
                        }
                    },
                    function(data) {
                        console.log("Data bbdd", data);
                        console.log("Err bbdd");
                    }
                );
            }
        }

    }
]);
