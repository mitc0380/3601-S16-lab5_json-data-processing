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

  it('testing date of birth', function () {
    expect(StudentCtrl.datetoNumber('1990-01-11')).toEqual('19900111');
    expect(StudentCtrl.datetoNumber('1')).toEqual('1');
    expect(StudentCtrl.datetoNumber('1-01-11')).toEqual('10111');
  });


  it('testing gradeToNumber', function () {
    expect(StudentCtrl.gradeToNumber("A")).toEqual(4.0);
    expect(StudentCtrl.gradeToNumber("B")).toEqual(3.0);
    expect(StudentCtrl.gradeToNumber("C")).toEqual(2.0);
    expect(StudentCtrl.gradeToNumber("D")).toEqual(1.0);
    expect(StudentCtrl.gradeToNumber("F")).toEqual(0.0);
  });

  /*it('testing getMajors', function () {
    expect(StudentCtrl.getMajors(student).toEqual("insert class here"));
    expect(StudentCtrl.getMajors(student).toEqual("multiple"));
    expect(StudentCtrl.getMajors(student).toEqual("undecided"));
  });

  it('testing classRank', function () {
    expect(StudentCtrl.classRank(student).toEqual("Freshman"));
    expect(StudentCtrl.classRank(student).toEqual("Sophomore"));
    expect(StudentCtrl.classRank(student).toEqual("Junior"));
    expect(StudentCtrl.classRank(student).toEqual("Senior"));

  });

  it('testing calculate gpa', function () {
    expect(StudentCtrl.calculateGPAAngular(student).toEqual(4.0));
    expect(StudentCtrl.calculateGPAAngular(student).toEqual(3.0));
    expect(StudentCtrl.calculateGPAAngular(student).toEqual(2.0));
    expect(StudentCtrl.calculateGPAAngular(student).toEqual(1.0));
    expect(StudentCtrl.calculateGPAAngular(student).toEqual(0.0));
  });

  it('testing calculate credits', function () {
    expect(StudentCtrl.calculateCreditsAngular(student).toEqual(100));
    expect(StudentCtrl.calculateCreditsAngular(student).toEqual(50));
    expect(StudentCtrl.calculateCreditsAngular(student).toEqual(0));
  });*/


});
