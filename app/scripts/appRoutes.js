app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
        url: '/',
        views: {
            'view-main': {
                templateUrl: 'views/content/home.html',
                controller: 'homeCtrl'
            }
        }
    });

});
