'use strict';

angular.module('3601S16Lab5JsonDataProcessingApp')
  .controller('StudentCtrl', function ($scope, socket, Student) {

    var self = this;

    self.hideGPA = true;
    self.hideDOB = true;

    self.hideMajor = true;
    self.students = [];
    self.boolGPA = false;
    self.boolLastName = true;
    self.boolFirstName = false;
    self.boolDOB = false;
    self.testing = 'lastName';
    self.ascending = true;
    self.index = 0;
    self.sortable = 'lastName';
    self.order = 1;
    self.sortables = ['lastName', 'firstName', 'dateOfBirth', 'gpa', 'major1', 'major2'];

    Student.query(function(results) {
      self.students = results;
      for(var i in self.students)
      {
        var id = self.students[i].GPA = self.calculateGPA(self.students[i].courses);
      }
      socket.syncUpdates('student', self.students);
    });

    self.getCurrentSortable = function(){

      for(var i in self.students)
      {
        var id = self.students[i].GPA = self.calculateGPA(self.students[i].courses);
      }

      var arr = [];
      if (self.boolLastName) {
        arr.push(self.sortables[0]);
      }
      if (self.boolFirstName) {
        arr.push(self.sortables[1]);
      }
      if (self.boolDOB) {
        arr.push(self.sortables[2]);
      }
      if (self.boolGPA) {
        arr.push(self.sortables[3]);
      }
      console.log(arr);
      return arr;
    }

    self.toggleOrder = function() {

    }

    self.toggleSortable = function(sortable) {

      for(var i in self.students)
      {
        var id = self.students[i].GPA = self.calculateGPA(self.students[i].courses);
      }

      if (sortable == 'laGPAstName') {
        self.boolLastName = !self.boolLastName;
        console.log("Toggled last name sorting to " + self.boolLastName);

      } else if (sortable == 'firstName') {
        self.boolFirstName = !self.boolFirstName;
        console.log("Toggled first name sorting to " + self.boolFirstName);

      } else if (sortable == 'DOB') {
        self.boolDOB = !self.boolDOB;
        console.log("Toggled DOB sorting to " + self.boolDOB);

      } else if (sortable == 'GPA') {
        self.boolGPA = !self.boolGPA;
        console.log("Toggled GPA sorting to " + self.boolGPA);
      }
    }

    self.toggleAscendDescend = function() {
      self.ascendDescend = !self.ascendDescend;
    }

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('student');
    });

    self.calculateGPA = function(courseArray) {
      console.log(courseArray);
      var qualityPoints = 0;
      var totalCredits = 0;
      var i = 0;
      for (i = 0; i < courseArray.length; i++) {
        qualityPoints = qualityPoints + (parseInt(courseArray[i].credits) * self.gradeToNumber(courseArray[i].grade));
        totalCredits = totalCredits + parseInt(courseArray[i].credits);
      }


      return Math.round(qualityPoints / totalCredits * 100) / 100;
    };

    self.gradeToNumber = function(gr){
      if(gr != "IP") {

        if (gr == "A") {
          return 4.0;
        }
        if (gr == "B") {
          return 3.0;
        }
        if (gr == "C") {
          return 2.0;
        }
        if (gr == "D") {
          return 1.0;
        }
        if (gr == "F") {
          return 0.0;
        }
      } };

    });

