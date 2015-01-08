'use strict';


// ------------------------------------------------------------

function BasketService() {
  this.items = {};
  this.total = 0.0;

  function calcTotal(purchases) {
    var total = 0.0;
    angular.forEach(purchases, function(purchase) {
      total += purchase.price * purchase.quantity;
    });
    return total;
  }

  this.addItem = function(item, quantity) {
    var b = this.items[item.uid];

    if (!b) {
      this.items[item.uid] = {
        price: item.price,
        quantity: quantity
      };
    }
    else {
      b.quantity += quantity;
    }

    this.total = calcTotal(this.items);
  };

  this.removeItem = function(id) {
    if (this.items[id]) {
      delete this.items[id];
      this.total = calcTotal(this.items);
    }
  };
}


// ------------------------------------------------------------

function BasketController($scope, basketService, itemDetails) {
  $scope.basket = basketService;
  $scope.itemDetails = itemDetails;

  $scope.addItem = function(id) {
    var details = itemDetails[id];

    basketService.addItem(details, 1);
  };

  $scope.removeItem = function(id) {
    basketService.removeItem(id);
  };
}

BasketController.$inject = [ '$scope', 'basketService', 'itemDetails' ];


// ------------------------------------------------------------

angular
  .module('msb.basket', [
    'msb.items'
  ])
  .service('basketService', BasketService)
  .controller('BasketController', BasketController);
