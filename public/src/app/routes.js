Edu2.config(function($routeProvider) {
    $routeProvider
        .when(
        '/',
        {
            controller: 'HomeCtrl',
            //templateUrl:'app/partials/index-view.html'
        }
    )
        .when(
        '/uni/:universityId',
        {
            controller: 'UniversityCtrl',
            templateUrl:'app/partials/university-view.html'
        }


    )
        .when(
        '/uni/:universityId/course/:courseId',
        {
            controller: 'CourseCtrl',
            templateUrl:'app/partials/course-view.html'
        }


    )
        .when(
        '/about',
        {
            templateUrl:'app/partials/about-view.html'
        }


    )

        .otherwise(
        {
            redirectTo:'/'
        }
    );
});