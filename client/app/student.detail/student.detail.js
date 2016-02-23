'use strict';

angular.module('3601S16Lab5JsonDataProcessingApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('student.detail', {
        url: '/:id',
        templateUrl: 'app/student.detail/student.detail.html',
        controller: 'StudentDetailCtrl'
      });
  });
