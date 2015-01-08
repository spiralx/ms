'use strict';


// ------------------------------------------------------------

function config($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('index', {
      url: '/',
      views: {
        itemView: {
          templateUrl: '/items/items.html',
          controller: 'ItemsController',
          resolve: {
            itemDetails: function(itemService) {
              return itemService.getItems();
            }
          }
        },
        basketView: {
          templateUrl: '/basket/basket.html',
          controller: 'BasketController',
          resolve: {
            itemDetails: function(itemService) {
              return itemService.getItems();
            }
          }
        }
      }
    });

  $urlRouterProvider.otherwise('/');
}

config.$inject = [ '$stateProvider', '$urlRouterProvider' ];


// ------------------------------------------------------------

angular
  .module('msb', [
    'ui.router',
    'msb.items',
    'msb.basket'
  ])
  .config(config);
