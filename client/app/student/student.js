'use strict';

angular.module('3601S16Lab5JsonDataProcessingApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('student', {
        url: '/student',
        templateUrl: 'app/student/student.html',
        controller: 'StudentCtrl'
      });
  });
