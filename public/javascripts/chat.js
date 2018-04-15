var app = angular.module('chatApp', ['ngMaterial']);
app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('purple')
        .accentPalette('red');
});
app.controller('chatController', function ($scope, $sce) {
    $scope.messages = [];
    $scope.trust = $sce.trustAsHtml;
    var exampleSocket = new WebSocket('wss://swiftcode-akshataph.herokuapp.com/chatSocket');
    exampleSocket.onmessage = function (event) {
        var jsonData = JSON.parse(event.data);
        jsonData.time = new Date()
            .toLocaleTimeString();
        $scope.messages.push(jsonData);
        $scope.$apply();
        console.log(jsonData);

    };
    $scope.sendMessage = function () {
        exampleSocket.send($scope.userMessage);
        $scope.userMessage = '';

    };

});