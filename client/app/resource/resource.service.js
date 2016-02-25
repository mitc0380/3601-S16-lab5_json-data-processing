'use strict';

angular.module('3601S16Lab5JsonDataProcessingApp')
  .factory('Resource', function($resource) {
    return function(url, params, methods) {
      var defaults = {
        create: {
          method: 'POST'
        },
        update: {
          method: 'PUT',
          params: {
            id: '@_id'
          }
        }
      };

      methods = angular.extend(defaults, methods);

      var resource = $resource(url, params, methods);

      resource.prototype.$save = function() {
        if (!this._id) {
          return this.$create();
        }
        else {
          return this.$update();
        }
      };

      return resource;
    };
  });
