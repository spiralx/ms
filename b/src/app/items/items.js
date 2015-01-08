'use strict';


// ------------------------------------------------------------

function ItemService($http) {
  return {
    getItems: function() {
      return $http.get('/assets/items.json', { cache: true })
        .then(function(response) {
          var items = {};

          response.data.forEach(function(item) {
            items[item.uid] = item;
          });

          return items;
        });
    }
  };
}

ItemService.$inject = [ '$http' ];


// ------------------------------------------------------------

function ItemsController($scope, basketService, itemDetails) {
  $scope.itemDetails = itemDetails;

  $scope.addToBasket = function(id) {
    basketService.addItem(itemDetails[id], 1);
  };
}

ItemsController.$inject = [ '$scope', 'basketService', 'itemDetails' ];


// ------------------------------------------------------------

angular
  .module('msb.items', [])
  .service('itemService', ItemService)
  .controller('ItemsController', ItemsController);
