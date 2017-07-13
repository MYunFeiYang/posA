'use strict';

describe('pos', () => {

  it('splitBarcode should print text', () => {
    const tags = [
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005-2',
    ];
    const expectText = [ { barcode: 'ITEM000001', count: 1 },
  { barcode: 'ITEM000003', count: 2.5 },
  { barcode: 'ITEM000005', count: 2 } ]
;
    expect(splitBarcode(tags)).toEqual(expectText);
  });

  it('byItemBarcodeToItem should print text', () => {
    const tags = [
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005-2',
    ];
    const expectText = [ { barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, count: 1 },
        { barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, count: 2.5 },
        { barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5, count: 2 } ]
    ;
    expect(byItemBarcodeToItem(tags)).toEqual(expectText);
  })
  it('Deduplication should print text', () => {
    const tags = [
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005-2',
    ];
    const expectText = [ { barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3},
      { barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15},
      { barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5} ]
    ;
    expect(Deduplication(tags)).toEqual(expectText);
  });
  it('calculate should print text', () => {
    const tags = [
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005-2',
    ];
    const expectText = [ { barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, count: 1 },
      { barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, count: 2.5 },
      { barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5, count: 2 } ]
    ;
    expect(calculate(tags)).toEqual(expectText);
  });
  it('buildingSheetString should print text', () => {
    const tags = [
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005-2',
    ];
    spyOn(console, 'log');

    printReceipt(tags);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：1瓶，单价：3(元)，小计：3(元)
名称：荔枝，数量：2.5斤，单价：15(元)，小计：37.5(元)
名称：方便面，数量：2袋，单价：4.5(元)，小计：9(元)
----------------------
总计：49.5(元)
节省：0(元)
**********************`;
    expect(buildingSheetString(tags)).toEqual(expectText);
  });

  it('should print text', () => {
    const tags = [
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005-2',
    ];
    spyOn(console, 'log');

    printReceipt(tags);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：1瓶，单价：3(元)，小计：3(元)
名称：荔枝，数量：2.5斤，单价：15(元)，小计：37.5(元)
名称：方便面，数量：2袋，单价：4.5(元)，小计：9(元)
----------------------
总计：49.5(元)
节省：0(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
});
