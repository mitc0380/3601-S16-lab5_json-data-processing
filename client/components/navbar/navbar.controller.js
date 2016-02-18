'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor() {
    }
}

angular.module('3601S16Lab5JsonDataProcessingApp')
  .controller('NavbarController', NavbarController);
