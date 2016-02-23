'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.students = [];

      $http.get('/api/students').then(response => {
        this.students = response.data;
      socket.syncUpdates('thing', this.students);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }
}

angular.module('3601S16Lab5JsonDataProcessingApp')
  .controller('MainController', MainController);

})();
