'use strict';

angular.module('3601S16Lab5JsonDataProcessingApp')
  .factory('Student', function($resource) {
    return $resource('/api/students/:id');
  });
