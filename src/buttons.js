(function() {
  angular.module('myApp', [])
    .controller('myController', ['$scope', function ($scope) {

      $scope.isLiveUpdate = false;

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
            switch (true) {
              case (input[char] == '('):
                currentDepth++;
                deepestEquation = checkDeepestEquation(maxDepth, currentDepth, deepestEquation);
                maxDepth = checkMaxDepth(maxDepth, currentDepth);
                break;
              case (input[char] == ')' && currentDepth > 0):
                currentDepth--;
                break;
              case (currentDepth == maxDepth):
                deepestEquation.push(input[char]);
                break;
            }
          }
          return deepestEquation.join('') + ' and it is ' + maxDepth + ' layers deep.';
        } else {
          return 'Unbalanced parenthesis.';
        }
      };

      $scope.getAnswer = function (input) {
        if ($scope.getIsBalanced(input)) {
          return eval(input);
        } else {
          return 'Unbalanced parenthesis.';
        }
      };

      $scope.liveUpdate = function (input) {
        if ($scope.isLiveUpdate) {
          $scope.isBalanced = $scope.getIsBalanced(input);
          $scope.deepestLevel = $scope.getDeepestLevel(input);
          $scope.answer = $scope.getAnswer(input);
        }
      };

      function checkDeepestEquation(maxDepth, currentDepth, currentEquation) {
        if (currentDepth > maxDepth) {
          return [];
        } else {
          return currentEquation;
        }
      }

      function checkMaxDepth(maxDepth, currentDepth) {
        if (currentDepth > maxDepth) {
          return currentDepth;
        } else {
          return maxDepth;
        }
      }
    }]);
})();
