'use strict';

angular.module('3601S16Lab5JsonDataProcessingApp')
  .controller('StudentCtrl', function ($scope, socket, Student) {

    var self = this;

    self.students = [];

    self.testing = 'lastName';
    self.ascending = true;
    self.index = 0;
    self.sortable = 'lastName';
    self.order = 1;
    self.sortables = ['lastName', 'firstName', 'dateOfBirth', 'major1', 'major2'];

    Student.query(function(results) {
      self.students = results;
      socket.syncUpdates('student', self.students);
    });

    self.sorter = function(a, b) {
      if (self.ascending) {
        self.order = -1;
        return self.sortByFirstName;
      }
    }

    self.getCurrentSortable = function(){
      return self.sortables[self.index];
    }

    self.toggleAscendDescend = function() {
      self.ascendDescend = !self.ascendDescend;
    }

    self.sortByFirstName = function(a, b) {
      var sortStatus = 0;

      if (a.firstName < b.firstName) {
        sortStatus = -1 * self.order;
      } else if (a.firstName > b.firstName) {
        sortStatus = 1 * self.order;
      }
      return sortStatus;
    }

    self.sortByLastName = function(a, b, order) {
      var sortStatus = 0;

      if (a.lastName < b.lastName) {
        sortStatus = -1 * order;
      } else if (a.lastName > b.lastName) {
        sortStatus = 1 * order;
      }
      return sortStatus;
    }

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('student');
    });
  });
