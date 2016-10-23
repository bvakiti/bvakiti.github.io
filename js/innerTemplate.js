
myApp.directive('innerTemplate', ['FlightDetailsService', function (FlightDetailsService) {
    return {
        'replace'   : true,
        'template': '<div><p style="color: white"> Get Flights </p>' +
                        '<label>Source</label>' +
                        '<select class="src">' +
                            '<option disabled selected value> -- select an option -- </option>' +
                            '<option value="hyd">Hyderabad</option>' +
                        '</select>' +

                        '<label>Destination</label>' +
                        '<select class="des"><option disabled selected value> -- select an option -- </option><option value="bglr">Bangalore</option></select>' +

                        '<button ng-click="onClick()"><a href="#getdetails">Get Details</a></button></div>',

        'link': {
            'pre': function ($is) {
                console.log($is);
            },
            'post': function($is, $el, attrs) {
            }
        }

    }
}]);