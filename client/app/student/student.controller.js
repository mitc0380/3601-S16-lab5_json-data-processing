'use strict';

angular.module('3601S16Lab5JsonDataProcessingApp')
  .controller('StudentCtrl', function ($scope, socket, Student) {

    var self = this;

    self.currSortables = ['lastName', 'firstName'];
    self.hideGPA = false;
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
    self.sortables = ['lastName', 'firstName', 'dateOfBirth', 'studentCtrl.calculateGPAAngular', 'major1', 'major2'];

    Student.query(function(results) {
      self.students = results;
      socket.syncUpdates('student', self.students);
    });

    self.getCurrentSortable = function(){

      var arr = [];
      if (self.boolLastName) {
        arr.push(self.sortables[0]);
        arr.push(self.sortables[1]);
      } else if (self.boolDOB) {
        arr.push(self.sortables[2]);
      } else if (self.boolGPA) {
        return studentCtrl.calculateGPAAngular;
      }
      return arr;
    }

    self.toggleOrder = function() {
      self.order *= 1;
    }

    self.giveSortables = function(sortable) {
      var arr = [];
      if (self.boolLastName) {
        arr.push(self.sortables[0]);
        arr.push(self.sortables[1]);
      } else if (self.boolDOB) {
        arr.push(self.sortables[2]);
      } else if (self.boolGPA) {
        self.currSortables = self.calculateGPAAngular;
      }
      self.currSortables = arr;;
    }

    self.toggleSortable = function(sortable) {

      if (sortable == 'lastName') {
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
      var qualityPoints = 0;
      var totalCredits = 0;
      var i = 0;
      for (var i in courseArray) {
        if (courseArray[i].grade === "IP") {
          continue;
        }
        qualityPoints = qualityPoints + (parseInt(courseArray[i].course.credits) * self.gradeToNumber(courseArray[i].grade));
        totalCredits = totalCredits + parseInt(courseArray[i].course.credits);
      }


      return Math.round(qualityPoints / totalCredits * 100) / 100;
    };

    self.calculateGPAAngular = function(student) {
      var courseArray = student.courses;
      console.log(courseArray);
      var qualityPoints = 0;
      var totalCredits = 0;
      var i = 0;
      for (var i in courseArray) {
        if (courseArray[i].grade === "IP") {
          continue;
        }
        qualityPoints = qualityPoints + (parseInt(courseArray[i].course.credits) * self.gradeToNumber(courseArray[i].grade));
        totalCredits = totalCredits + parseInt(courseArray[i].course.credits);
      }


      return Math.round(qualityPoints / totalCredits * 100) / 100;
    };

    self.gradeToNumber = function(gr){

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
      }

    });

