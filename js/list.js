
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
               $s.flightData = FlightDetailsService.getData();

               // offline data
               if (!$s.flightData) {
                   $.ajax({
                       type : 'GET',
                       dataType: "json",
                       url: 'https://bandhavya.github.io/sampleFlightData.json',
                       success: function (data) {
                           $s.flightData = data;
                       }
                   });
               }

           },
           'post': function($s, $el, attrs) {


           }
       }
   }
}]);
