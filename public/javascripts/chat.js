var app = angular.module('chatApp', ['ngMaterial']);
app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('purple')
        .accentPalette('red');
});
app.controller('chatController', function ($scope) {
    $scope.messages = [
        {
            "sender": "USER",
            "text": "Hello"
	},
        {
            'sender': 'BOT',
            'text': "hi",
	},

        {
            'sender': 'USER',
            'text': "what"
                }
                    ];
});