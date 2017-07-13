/**
 * Created by yunfeiyang on 17-7-11.
 */
"use strict"
/*分割字符串*/
function splitBarcode(barcode) {
  var barcodes=[];
  for (let bar of barcode){
    var item= bar.split("-");
    if (item.length==2) {
      barcodes.push({barcode:item[0],count:parseFloat(item[1])});
    }
    else{
      barcodes.push({barcode:item[0],count:1});
    }
  }
  return barcodes;
}
/*通过商品barcode属性获得商品项信息*/
function byItemBarcodeToItem(barcode) {
  var barcodes=splitBarcode(barcode);
  var Items=[
    {
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000001',
      name: '雪碧',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000002',
      name: '苹果',
      unit: '斤',
      price: 5.50
    },
    {
      barcode: 'ITEM000003',
      name: '荔枝',
      unit: '斤',
      price: 15.00
    },
    {
      barcode: 'ITEM000004',
      name: '电池',
      unit: '个',
      price: 2.00
    },
    {
      barcode: 'ITEM000005',
      name: '方便面',
      unit: '袋',
      price: 4.50
    }
  ];
  var Item=[];
  for(let barcode of barcodes){
    for (let item of Items){
      if (barcode.barcode==item.barcode)
        Item.push({barcode:item.barcode,name:item.name,unit:item.unit,price:item.price,count:barcode.count});
    }
  }
  return Item;
}
/*去重*/
function Deduplication(Item1) {
  var Item=byItemBarcodeToItem(Item1);
  var barcode=[];
  barcode[0]={barcode:Item[0].barcode,name:Item[0].name,unit:Item[0].unit,price:Item[0].price};
  var tag=Item[0].barcode;
  for(let item of Item){
    if (tag!=item.barcode) {
      tag=item.barcode;
      barcode.push({barcode:item.barcode,name:item.name,unit:item.unit,price:item.price});
    }
  }
  return barcode;
}
/*计数*/
function calculate(barcode1) {
  var Item=byItemBarcodeToItem(barcode1);
  var barcode=Deduplication(barcode1);
  var Item_sheet=[];
  for (var j=0;j<barcode.length;){
    var count=0;
    for (var i=0;i<Item.length;i++){
      if (barcode[j].barcode==Item[i].barcode) {
        count += Item[i].count;
      }
    }
    Item_sheet.push({barcode:barcode[j].barcode,name:barcode[j].name,unit:barcode[j].unit,price:barcode[j].price,count:count});
    j++;
  }
  return Item_sheet;
}
/*将对象数组拼接成字符串*/
function buildingSheetString(item_sheet) {
  var Item_sheet=calculate(item_sheet);
  var string='***<没钱赚商店>收据***\n';
  var sum=0;
  var save=0;
  for (var i=0;i<Item_sheet.length;i++){
    if(Item_sheet[i].count>3){
      string+='名称：'+Item_sheet[i].name+'，数量：'+Item_sheet[i].count+Item_sheet[i].unit+'，单价：'+
        Item_sheet[i].price+'(元)，小计：'+Item_sheet[i].count*Item_sheet[i].price-Item_sheet[i].price+'(元)'+'\n';
      sum+=Item_sheet[i].count*Item_sheet[i].price-Item_sheet[i].price;
      save+=Item_sheet[i].price;
    }
    else {
      string+='名称：'+Item_sheet[i].name+'，数量：'+Item_sheet[i].count+Item_sheet[i].unit+'，单价：'+
        Item_sheet[i].price+'(元)，小计：'+Item_sheet[i].count*Item_sheet[i].price+'(元)'+'\n';
      sum+=Item_sheet[i].count*Item_sheet[i].price;
    }
  }
  string+=`----------------------
总计：`+sum+`(元)
节省：`+save+`(元)
**********************`;
  return string;
}
/*打印输出清单*/
function printReceipt(barcode) {
  var Receipt = buildingSheetString(barcode);
  console.log(Receipt);
}
