angular.module("babelInstruments").service('authService', ["$location","$window","$rootScope","APIClient","paths","logService",

    function($location, $window,$rootScope, APIClient, paths,logService) {
        this.saveUserAuth = function(user) {
            APIClient.userAuth(user).then(
                function(data) {
                  console.log("DataLOGIN",data);
                  if(data.result == true){
                      $window.localStorage['user'] = data.rows.name;
                      $window.localStorage['id'] = data.rows._id;
                      console.log("Holi",$window.localStorage['id'] = data.rows._id);
                      logService.notifyLogin();

                  }else {
                    $location.path(paths.login);
                    $window.alert("Incorrect credentials");
                    console.log("Fuera");
                  }
                },

                //Promesa rechazada
                function(data) {
                  console.log("Data bbdd", data);
                 console.log("Err bbdd");
                }
            );
        }

        this.getUserAuth = function() {
            return $window.localStorage['user'];
        }

        this.getIdAuth = function() {
            return $window.localStorage['id'];
        }

        this.logoutUser =function(){
          	$window.localStorage.removeItem('user');
            console.log("Borrar", $window.localStorage.getItem("user"));
        }

    }
]);
