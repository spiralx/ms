'use strict';

describe('msb.items', function () {
  var itemService, httpBackend;

  beforeEach(module('msb'));

  beforeEach(inject(function(_itemService_, $httpBackend) {
    itemService = _itemService_;
    httpBackend = $httpBackend;
  }));

  it('getItems() should return an object', function() {
    httpBackend.whenGET('/assets/items.json').respond([
      {
        'category': 'Women',
        'subcat': 'Clothing',
        'item': 'Party wear - Front Leather Panelled Ponte Treggings',
        'price': 159.00,
        'uid': 1,
        'thumbnail': '1.jfif'
      },
      {
        'category': 'Women',
        'subcat': 'Clothing',
        'item': 'Speziale Italian Cupro Draped Bodycon Dress',
        'price': 89.00,
        'uid': 2,
        'thumbnail': '2.jfif'
      }
    ]);

    itemService.getItems().then(function(itemDetails) {
      expect(itemDetails)
        .to.be.instanceOf(Object)
        .and.to.have.keys(['1', '2']);

      expect(itemDetails['1'])
        .to.be.instanceOf(Object)
        .and.to.have.keys(['uid', 'price', 'item', 'category', 'subcat', 'thumbnail']);
    });

    httpBackend.flush();
  });

});
