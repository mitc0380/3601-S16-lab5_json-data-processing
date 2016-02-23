'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.students = [];

      $http.get('/api/student').then(response => {
        this.students = response.data;
      socket.syncUpdates('student', this.students);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('student');
    });
  }
}

angular.module('3601S16Lab5JsonDataProcessingApp')
  .controller('MainController', MainController);

})();
