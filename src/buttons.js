(function() {
    angular.module('myApp', [])
        .controller('myController', ['$scope', function ($scope) {

            $scope.getIsBalanced = function (input) {
              var openingExpression = /\(/igm;
              var closingExpression = /\)/igm;
              var openingMatches, closingMatches;

              if (!input) {
                return false;
              }

              openingMatches = input.match(openingExpression) || '';
              closingMatches = input.match(closingExpression) || '';

              return openingMatches.length === closingMatches.length
            };

            $scope.getDeepestLevel = function (input) {
              if ($scope.getIsBalanced(input)) {
                var currentDepth = maxDepth = 0;
                var deepestEquation = [];
                var char;

                for (char = 0; char < input.length; char++) {
                  // This is what 'if else' hell looks like.... let's refactor this.
                  if (input[char] == '(') {
                    currentDepth++;

                    if (currentDepth > maxDepth) {
                      maxDepth = currentDepth;
                      deepestEquation = [];
                    }
                  } else if (input[char] == ')') {
                    if (currentDepth > 0) {
                      currentDepth--;
                    }
                  } else if (currentDepth == maxDepth){
                    deepestEquation.push(input[char]);
                  }
                }
                return deepestEquation.join('') + ' and it is ' + maxDepth + ' layers deep.';
              } else {
                return 'Unbalanced parenthesis.';
              }
            };

            $scope.getAnswer = function (input) {
                //TODO: display the result of evaluating the input as a math expression
                //hint: you can use eval()
            };
        }]);
})();
