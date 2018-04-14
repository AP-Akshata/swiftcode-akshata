var app = angular.module('chatApp', ['ngMaterial']);
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
            'sender': 'BOT',
            'text': "what"
                }
                    ];
});