'use strict';

angular.module('3601S16Lab5JsonDataProcessingApp')
  .controller('StudentDetailCtrl', function ($scope, $stateParams, Student) {
    $scope.student = Student.get({ id: $stateParams.id });
  });
