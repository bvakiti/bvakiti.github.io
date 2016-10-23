
myApp.directive('customList', ['FlightDetailsService', function (FlightDetailsService) {
   return {
       'replace' : true,
       'transclude': true,
       'template': '<ul class="list-group">' +
                        '<li class="list-group-item" ng-repeat="data in flightData">'+
                            '<p>{{data.flightName}}</p><span>{{data.departureTime}}</span>' +
                        '</li>' +
                    '</ul>',
       'link': {
           'pre': function($s, $el, attrs) {
               $s.flightData = [];
               $s.$evalAsync(function () {
                   $s.flightData = FlightDetailsService.getData();
               });

           },
           'post': function($s, $el, attrs) {


           }
       }
   }
}]);
