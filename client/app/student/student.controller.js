'use strict';

angular.module('3601S16Lab5JsonDataProcessingApp')
  .controller('StudentCtrl', function ($scope, socket, Student) {

    var self = this;

    self.currSortables = ['lastName', 'firstName'];
    self.hideGPA = true;
    self.students = [];
    self.boolGPA = false;
    self.boolCredits = false;
    self.boolLastName = true;
    self.boolDOB = false;
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
      self.currSortables = arr;
    }

    self.toggleSortable = function(sortable) {
      if (sortable == 'lastName') {
        self.boolLastName = !self.boolLastName;
        if (self.boolLastName) {
          self.boolDOB = false;
          self.boolGPA = false;
          self.boolCredits = false;
        }
        console.log("Toggled last name sorting to " + self.boolLastName);
      } else if (sortable == 'DOB') {
        self.boolDOB = !self.boolDOB;
        if (self.boolDOB) {
          self.boolLastName = false;
          self.boolGPA = false;
          self.boolCredits = false;
        }
        console.log("Toggled DOB sorting to " + self.boolDOB);
      } else if (sortable == 'GPA') {
        self.boolGPA = !self.boolGPA;
        if (self.boolGPA) {
          self.boolLastName = false;
          self.boolDOB = false;
          self.boolCredits = false;
        }
        console.log("Toggled GPA sorting to " + self.boolGPA);
      } else if (sortable == 'Credits') {
        self.boolCredits = !self.boolCredits;
        if (self.boolCredits) {
          self.boolLastName = false;
          self.boolDOB = false;
          self.boolGPA = false;
        }
        console.log("Toggled Credits sorting to " + self.boolCredits);
      }
    }

    self.toggleAscendDescend = function() {
      self.ascendDescend = !self.ascendDescend;
    }

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('student');
    });

    self.sorter = function(student) {
      if (self.boolDOB) {
        return 'dateOfBirth';
      } else if (self.boolGPA) {
        var toReturn = self.calculateGPAAngular(student);
        console.log("ToReturn: " + toReturn);
        return toReturn;
      } else if (self.boolLastName) {
        return [student.lastName, student.firstName];
      } else if (self.boolCredits) {
        return self.calculateCreditsAngular(student);
      }
    }

    self.calculateCreditsAngular = function(student) {
      var courseArray = student.courses;
      var total = 0;
      for (var i in courseArray) {
        if (courseArray[i].grade === "IP" || courseArray[i].grade === "F") {
          continue;
        } else {
          total += parseInt(courseArray[i].course.credits);
        }
      }
      console.log("Total credits for " + student.firstName + " " + student.lastName + ": " + total + ", calculated by Credit calculator.");
      return total;
    }

    self.calculateGPAAngular = function(student) {
      var courseArray = student.courses;
      var qualityPoints = 0;
      var totalCredits = 0;
      var i = 0;
      for (var i in courseArray) {
        if (courseArray[i].grade === "IP") {
          console.log("In progress class detected!");
        } else {
          qualityPoints = qualityPoints + (parseInt(courseArray[i].course.credits) * self.gradeToNumber(courseArray[i].grade));
          totalCredits = totalCredits + parseInt(courseArray[i].course.credits);
        }
      }
      console.log("Total credits for " + student.firstName + " " + student.lastName + ": " + totalCredits + ", calculated by GPA calculator.");
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

