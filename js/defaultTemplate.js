
myApp.directive('defaultTemplate', function () {
    return {
        'replace'   : true,
        'transclude': true,
        'template': '<div><nav class="navbar navbar-inverse">' +
                        '<div class="container-fluid">' +
                            '<div class="navbar-header">' +
                              '<a class="navbar-brand" href="#">' +
                                'Search for Flights' +
                              '</a>' +
                            '</div>' +
                        '</div>' +
                    '</nav><section class="inner-content" ng-transclude=""></section></div>'
    }
});