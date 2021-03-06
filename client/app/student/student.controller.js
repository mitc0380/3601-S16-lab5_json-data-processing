'use strict';

angular.module('3601S16Lab5JsonDataProcessingApp')
  .controller('StudentCtrl', function ($scope, socket, Student) {

    var self = this;

    self.showMajors = false;
    self.search = "";
    self.Usearch = self.search.toUpperCase();
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
    self.searchLabel = "None";

    self.sortingButtons = [{id: "lastName", label: "Last Name", input: "lastName", state: true},
      {id: "Credits", label: "Credits", input: "Credits", state: false},
      {id: "dateOfBirth", label: "Date of Birth", input: "DOB", state: false}];

    self.filterButtons = [
      {id: "name", label: "Name", input: "name", state: false},
      {id: "Rank", label: "Rank", input: "Rank", state: false},
      {id: "Major", label: "Major", input: "Major", state: false},
      {id: "Class", label: "Class", input: "Class", state: false},
      {id: "none", label: "None", state: true}];


    /*   buttonState(buttonsArray, button) takes in an array of json buttons (with a "state" boolean
    field, and it takes in a button object. The button object, 'button' is the button that needs to
    be turned "on" i.e. true. A CSS selector can then be applied via ng-class={on:button.state}
    and the styles of element.on {} will be applied when state=true. buttonState(a,b) must be called
    from an ng-click=""   */

    self.buttonState = function(buttonsArray, button) {
      for (var i = 0; i < buttonsArray.length; i++) {
        buttonsArray[i].state = false;
      }
      button.state = true;
    };


    Student.query(function(results) {
      self.students = results;
      socket.syncUpdates('student', self.students);
    });

    self.toggleOrder = function() {
      self.order *= -1;
    };

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
    };

    self.checkCourses = function(courses) {
      var bool = false;
      courses.some(function(course) {
        /*console.log(parseInt(self.search) + " vs. " + course.course.courseNumber);*/
        if (course.course.courseNumber.toString() === self.search) {
          bool = true;
        }
      });
      return bool;
    };

    self.filterer = function(student) {
      if (self.filterButtons[2].state) {
        return (student.major1 === self.search || student.major2 === self.search);
      } else if (self.filterButtons[0].state) {
        return (student.lastName === self.search || student.firstName === self.search);
      } else if (self.filterButtons[3].state) {
        return self.checkCourses(student.courses);
      } else if (self.filterButtons[1].state) {
        return (self.classRank(student) === self.search);
      } else {
        return true;
      }
    };


    self.toggleSortable = function(sortable) {
      if (sortable == 'lastName') {
        self.boolLastName = !self.boolLastName;
        if (self.boolLastName) {
          self.boolDOB = false;
          self.boolGPA = false;
          self.boolCredits = false;
        }
        //console.log("Toggled last name sorting to " + self.boolLastName);
      } else if (sortable == 'DOB') {
        self.boolDOB = !self.boolDOB;
        if (self.boolDOB) {
          self.boolLastName = false;
          self.boolGPA = false;
          self.boolCredits = false;
        }
        //console.log("Toggled DOB sorting to " + self.boolDOB);
      } else if (sortable == 'GPA') {
        self.boolGPA = !self.boolGPA;
        if (self.boolGPA) {
          self.boolLastName = false;
          self.boolDOB = false;
          self.boolCredits = false;
        }
        //console.log("Toggled GPA sorting to " + self.boolGPA);
      } else if (sortable == 'Credits') {
        self.boolCredits = !self.boolCredits;
        if (self.boolCredits) {
          self.boolLastName = false;
          self.boolDOB = false;
          self.boolGPA = false;
        }
        //console.log("Toggled Credits sorting to " + self.boolCredits);
      }
    };

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('student');
    });

    self.sorter = function(student) {
      if (self.boolDOB) {
        return self.datetoNumber(student.dateOfBirth);
      } else if (self.boolGPA) {
        var toReturn = self.calculateGPAAngular(student);
        console.log("ToReturn: " + toReturn);
        return toReturn;
      } else if (self.boolLastName) {
        return [student.lastName, student.firstName];
      } else if (self.boolCredits) {
        return self.calculateCreditsAngular(student);
      }
    };

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
      //console.log("Total credits for " + student.firstName + " " + student.lastName + ": " + total + ", calculated by Credit calculator.");
      return total;
    };

    self.calculateGPAAngular = function(student) {
      var courseArray = student.courses;
      var qualityPoints = 0;
      var totalCredits = 0;
      var i = 0;
      for (var i in courseArray) {
        if (courseArray[i].grade === "IP") {
          //console.log("In progress class detected!");
        } else {
          qualityPoints = qualityPoints + (parseInt(courseArray[i].course.credits) * self.gradeToNumber(courseArray[i].grade));
          totalCredits = totalCredits + parseInt(courseArray[i].course.credits);
        }
      }
      //console.log("Total credits for " + student.firstName + " " + student.lastName + ": " + totalCredits + ", calculated by GPA calculator.");
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
    };

    self.datetoNumber = function(dob) {
      var dobInt = dob.replace("-", "").replace("-", "");
      return dobInt;
    };

    self.classRank = function(student) {
      var totalCred = self.calculateCreditsAngular(student);
      if (totalCred >= 90) {
        return "Senior";
      }
      if (totalCred >= 60) {
        return "Junior";
      }
      if (totalCred >= 30) {
        return "Sophomore";
      }
      else{
        return "Freshman";
      }
    };

    self.getMajors = function(student) {
      var major1 = student.major1;
      var major2 = student.major2;
      var majors = "(undeclared)";
      if (major1 != null) {
        majors = major1;
        if (major2 != null) {
          majors = majors + ", " + major2;
        }
      }
      return majors;
      }
  });

