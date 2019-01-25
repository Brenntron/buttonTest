(function() {
    angular.module('myApp', [])

        .controller('myController', ['$scope', function ($scope) {

            $scope.isBalanced = function (input) {
                //TODO: check if the parenthesis in the input is balanced
            };

            $scope.getDeepestLevel = function (input) {
                //TODO: get the contents within the deepest level of parenthesis and display the level of nesting
                // {[(4 + 4) * 2] * (3 + 8)} + 7 should return 4 + 4 and display that it is 3 layers deep
                // if there is a tie return the contents of the first leftmost one
            };

            $scope.getAnswer = function (input) {
                //TODO: display the result of evaluating the input as a math expression
                //hint: you can use eval()
            };


        }]);
})();
