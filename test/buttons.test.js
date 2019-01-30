describe('myController', function() {
  beforeEach(module('myApp'));

  var scope;
  var expectedMessage = 'Unbalanced parenthesis.';


  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    $controller('myController', {$scope: scope});
  }));

  describe('$scope.getIsBalanced', function() {
    it('returns false if the input does not have matching parenthesis.', function() {
      var bol;

      bol = scope.getIsBalanced('())');
      expect(bol).toEqual(false);
    })

    it('returns true if the input does have matching parenthesis.', function() {
      var bol1, bol2;

      bol1 = scope.getIsBalanced('(()()())');
      bol2 = scope.getIsBalanced('(1 + 5)((* + 7) * 6)');
      expect(bol1).toEqual(true);
      expect(bol2).toEqual(true);
    })
  })

  describe('$scope.getDeepestLevel', function() {
    it('returns the deepest nested parens equation and it\'s depth.', function() {
      var deepestEquation = scope.getDeepestLevel('((4 + 5) x 7)');

      expect(deepestEquation).toEqual('4 + 5 and it is 2 layers deep.');
    })

    it('retuns an unbalanced parenthesis message if there are no parenthesis.', function() {
      var errorMessage = scope.getDeepestLevel('');

      expect(errorMessage).toEqual(expectedMessage);
    })

    it('returns an unbalanced parenthesis message if the equation is unbalanced.', function() {
      var unbalancedMessage = scope.getDeepestLevel('(5 + 8 * 7');

      expect(unbalancedMessage).toEqual(expectedMessage);
    })
  })

  describe('$scope.getAnswer', function() {
    it('returns the answer to the equation', function() {
      var expected = 225;
      var equation = '((27 * 8) + 9)';
      var answer = scope.getAnswer(equation);

      expect(answer).toEqual(expected);
    })

    it('retuns an unbalanced parenthesis message if there are no parenthesis.', function() {
      var errorMessage = scope.getAnswer('');

      expect(errorMessage).toEqual(expectedMessage);
    })

    it('returns an unbalanced parenthesis message if the equation is unbalanced.', function() {
      var unbalancedMessage = scope.getAnswer('(5 + 8 * 7');

      expect(unbalancedMessage).toEqual(expectedMessage);
    })
  })

  describe('$scope.liveUpdate', function() {
    describe('when isLiveUpdate is true', function() {
      it('calls getIsbalanced, getDeepestLevel, and getAnswer with input as their argument', function() {
        scope.isLiveUpdate = true;

        scope.liveUpdate('((27 * 8) + 9)');

        expect(scope.isBalanced).toBe(true);
        expect(scope.deepestLevel).toEqual('27 * 8 and it is 2 layers deep.');
        expect(scope.answer).toEqual(225);
      })
    })
  })
});
