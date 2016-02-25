'use strict';

angular.module('3601S16Lab5JsonDataProcessingApp')
  .factory('Student', function(Resource) {
    return new Resource('/api/students/:id');
  });
