'use strict';

angular.module('3601S16Lab5JsonDataProcessingApp')
  .controller('StudentCtrl', function ($scope, socket, Student) {

    var self = this;

    self.students = [];
    self.boolLastName = true;
    self.boolFirstName = false;
    self.boolDOBName = false;
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
      var arr = [];
      if (self.boolLastName) {
        arr.push(self.sortables[0]);
      } else if (self.boolFirstName) {
        arr.push(self.sortables[1]);
      } else if (self.boolDOBName) {
        arr.push(self.sortables[2]);
      }
      console.log(arr);
      return arr;
    }

    self.toggleSortable = function(sortable) {
      console.log(self.boolLastName);
      if (sortable == 'lastName') {
        self.boolLastName = !self.boolLastName;
      } else if (sortable == 'firstName') {
        self.boolFirstName = !self.boolFirstName;
      } else if (sortable == 'DOB') {
        self.boolDOBName = !self.boolDOBName;
      }
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
