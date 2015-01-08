'use strict';

describe('msb.basket', function () {
  var basketService;

  beforeEach(module('msb'));

  beforeEach(inject(function(_basketService_) {
    basketService = _basketService_;
  }));

  var testItem = {
      'category': 'Women',
      'subcat': 'Clothing',
      'item': 'Party wear - Front Leather Panelled Ponte Treggings',
      'price': 159.00,
      'uid': 1,
      'thumbnail': '1.jfif'
    },
    testItem2 = {
      'category': 'Women',
      'subcat': 'Clothing',
      'item': 'Speziale Italian Cupro Draped Bodycon Dress',
      'price': 89.00,
      'uid': 2,
      'thumbnail': '2.jfif'
    };

  it('should be initialised correctly', function() {
    expect(basketService)
      .to.have.property('items')
        .that.is.an('object');
    expect(basketService)
      .to.have.property('total', 0);
  });

  it('should add a new item', function() {
    basketService.addItem(testItem, 1);

    expect(basketService.total)
      .to.equal(159);
    expect(basketService.items)
      .to.eql({
        '1': {
          price: 159,
          quantity: 1
        }
      });

    basketService.addItem(testItem2, 1);

    expect(basketService.total)
      .to.equal(248);
    expect(basketService.items)
      .to.eql({
        '1': {
          price: 159,
          quantity: 1
        },
        '2': {
          price: 89,
          quantity: 1
        }
      });
  });

  it('should update an item quantity', function() {
    basketService.addItem(testItem, 1);
    basketService.addItem(testItem, 1);

    expect(basketService.total)
      .to.equal(318);
    expect(basketService.items)
      .to.eql({
        '1': {
          price: 159,
          quantity: 2
        }
      });
  });

  it('should add quantities greater than one', function() {
    basketService.addItem(testItem, 4);

    expect(basketService.total)
      .to.equal(636);
    expect(basketService.items)
      .to.eql({
        '1': {
          price: 159,
          quantity: 4
        }
      });
  });

  it('should remove an item', function() {
    basketService.addItem(testItem, 1);
    basketService.removeItem(testItem.uid);

    expect(basketService.total)
      .to.equal(0);
    expect(basketService.items)
      .to.eql({});
  });

});
