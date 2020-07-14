var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reserved: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.getReserved();
    try {
      var value = wx.getStorageSync('reserved')
      if (value) {
        this.setData({
          reserved: value
        });
      }
    } catch (e) {
      // Do something when catch error
    }
    //刷新完成后停止下拉刷新动效
    wx.stopPullDownRefresh();
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
    this.onLoad();
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
      url: '../reserveorder/reserveorder?order=' + JSON.stringify(this.data.reserved[index]),
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  }
})