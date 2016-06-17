
angular.module('app', ['ngRoute']);

angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1

  //
  // Now set up the states
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'partials/login.html',
    controller:'loginCtrl'
  })

  .state('about', {
    url: '/about',
    templateUrl: 'partials/about.html'
  })

  .state('wishlists', {
    url: '/wishlists',
    templateUrl: 'partials/wishlists.html',
    controller:'wishlistsCtrl'
  })

  .state('wishlist', {
    url: '/wishlist',
    templateUrl: 'partials/wishlist.html',
    controller:'wishlistCtrl'
  })

   
    $urlRouterProvider.otherwise('/login'); 
});

'use strict';

// Application dependencies
angular.module('yawl', [
    'ngRoute',
    'firebase',
    'yawl.controllers.header',
    'yawl.controllers.login',
    'yawl.controllers.wishlists',
    'yawl.controllers.wishlist',
    'yawl.services.firebaseRefs',
    'yawl.services.wishlists'
]);

// Routes
angular.module('yawl').config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {templateUrl: 'partials/login.tpl.html'});
    $routeProvider.when('/', {templateUrl: 'partials/wishlists.tpl.html', authRequired: true});
    $routeProvider.when('/wl/:ownerId/:wishlistId', {templateUrl: 'partials/wishlist.tpl.html', authRequired: true});
    $routeProvider.when('/about', {templateUrl: 'partials/about.tpl.html', authRequired: true});
    $routeProvider.otherwise({redirectTo: '/'});
}]);

// Firebase URL
angular.module('yawl').constant('FBURL', 'https://project-6736946950434328166.firebaseio.com');

// Authentication
angular.module('yawl').run(['$rootScope', '$firebaseAuth', 'FBURL', 'Firebase', '$location',
    function ($rootScope, $firebaseAuth, FBURL, Firebase, $location) {
        $rootScope.signin = "NA";

        // Tweak: Manage the case when user goes directly to "/login" and has to be redirected to "/" after sign-in
        var redirect;
        $rootScope.$on("$routeChangeStart", function (e, next) {
            if (!redirect) redirect = next.originalPath;
        });
        $rootScope.$on('$firebaseAuth:login', function () {
            if (redirect == "/login") {
                $location.replace();
                $location.path("/");
            }
        });

        $rootScope.auth = $firebaseAuth(new Firebase(FBURL), { path: '/login',
            callback: function () {
                $rootScope.signin = "DONE";
            }
        });

    }]);



