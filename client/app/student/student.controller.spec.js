'use strict';

describe('Controller: StudentCtrl', function () {

  // load the controller's module
  beforeEach(module('3601S16Lab5JsonDataProcessingApp'));

  var StudentCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StudentCtrl = $controller('StudentCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });

  it('Testing classRank', function () {
    expect(studentCtrl.classRank(60).toEqual("Junior"))
  });
});
