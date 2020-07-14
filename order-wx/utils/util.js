//访问数据接口
var webPath = 'https://xming.club/order1.0';
var urlPath = 'https://xming.club';
// var webPath = 'http://localhost:8080/order1.0';
// var urlPath = 'http://localhost:8080';
var sendRequest = function (url, method, data = {}, header = {}) {
  var promise = new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: header,
      success: function (data) {
        //做一些统一处理操作，例如401验证

        //resolve用于具体调用中
        resolve(data);
      },
      fail: function (data) {
        reject(data);
      }
    })
  })
  return promise
}

function getNowFormatDate(date,day) {
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate()+day;
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}

// 请求预约数据
function getOrders() {
  var openId = wx.getStorageSync("user").openId;
  wx.request({
    url: webPath + '/orderList',
    data: {
      openId: openId
    },
    header: { 'content-type': 'application/json' },
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: (result) => {
      wx.setStorage({
        key: 'orders',
        data: result.data.orderList,
        success: (result) => {
        },
        fail: () => { },
        complete: () => { }
      });
    },
    fail: () => { },
    complete: () => { }
  });
}

// 请求座位数据
function getSeat(seat_id) {
  wx.request({
    url: webPath + '/seat/' + seat_id,
    data: {},
    header: { 'content-type': 'application/json' },
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: (result) => {
      wx.setStorage({
        key: 'seat',
        data: result.data
      });
    },
    fail: () => { },
    complete: () => { }
  });
}

function getSeat(seat_id) {
  wx.request({
    url: webPath + '/seat/' + seat_id,
    data: {},
    header: { 'content-type': 'application/json' },
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: (result) => {
      wx.setStorage({
        key: 'seat',
        data: result.data
      });
    },
    fail: () => { },
    complete: () => { }
  });
}

function getReserved() {
  var openId = wx.getStorageSync("user").openId;
  wx.request({
    url: webPath + '/orderList/reserved?openId='+openId,
    data: {},
    header: { 'content-type': 'application/json' },
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: (result) => {
      wx.setStorage({
        key: 'reserved',
        data: result.data
      });
    },
    fail: () => { },
    complete: () => { }
  });
}

//导入
module.exports = {
  sendRequest: sendRequest,
  getNowFormatDate: getNowFormatDate,
  getOrders: getOrders,
  getSeat: getSeat,
  getReserved: getReserved,
  urlPath:urlPath
}
