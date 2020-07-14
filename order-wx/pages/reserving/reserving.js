var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    data: "",
    time: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var d = new Date();
    var date = util.getNowFormatDate(d, 0);
    var h = d.getHours();
    var m = d.getMinutes();
    if (h < 10) {
      h = "0" + "" + h;
    }
    if (m < 10) {
      m = "0" + "" + m;
    }
    var time = h + ":" + m;
    this.setData({
      date: date,
      time: time
    })
    var that = this;
    var openId = wx.getStorageSync("user").openId;
    wx.request({
      url: util.urlPath + '/order1.0/orderList',
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
              // Do something when catch error
          },
          fail: () => { },
          complete: () => { }
        });
        try {
          that.setData({
            orders: result.data.orderList
          });
        } catch (e) {
        }
      },
      fail: () => { },
      complete: () => { }
    });
    //刷新完成后停止下拉刷新动效
    wx.stopPullDownRefresh();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onShow();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onTap: function (e) {
    let index = e.currentTarget.dataset['index'];

    wx.navigateTo({
      url: '../reserveorder/reserveorder?order=' + JSON.stringify(this.data.orders[index]),
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  }
})