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

    $stateProvider.state('generatorPrompts', {
	url: '/wiki/generator-prompts',
	views: {
	    'view-main': {
		templateUrl: 'views/content/generator-prompts.html'
	    }
	}
    });

    $stateProvider.state('folderStructure', {
	url: '/wiki/folder-structure',
	views: {
	    'view-main': {
		templateUrl: 'views/content/folder-structure.html'
	    }
	}
    });

    $stateProvider.state('gruntTasks', {
	url: '/wiki/builtin-grunt-tasks',
	views: {
	    'view-main': {
		templateUrl: 'views/content/grunt-tasks.html'
	    }
	}
    });

    $stateProvider.state('themeConfigFile', {
	url: '/wiki/theme-config-file',
	views: {
	    'view-main': {
		templateUrl: 'views/content/theme-config-file.html'
	    }
	}
    });

});

