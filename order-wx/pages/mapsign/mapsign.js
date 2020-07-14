// pages/mapsign/mapsign.js
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listId: 1,
    type: 0,
    //图书馆到个人位置的连线
    polyline: [{
      points: [{
        longitude: 115.828836,
        latitude: 28.651028
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#0080FF",
      width: 1,
      dottedLine: true
    }],
    //图书馆位置区域
    circles: [{
      latitude: '28.651028',
      longitude: '115.828836',
      color: '#FF0000DD',
      fillColor: '#7cb5ec88',
      radius: 20,
      strokeWidth: 1
    }]
  },
  //签到
  sign:function(e){
    wx.request({
      url: util.urlPath +'/order1.0/orderList/sign',
      method: 'GET',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        listId: this.data.listId,
        type: this.data.type
      },
      success:res=>{
        console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      listId:options.listId,
      type: options.type
    })
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      isHighAccuracy: true,
      highAccuracyExpireTime: 4000,
      success:res => {
        this.setData({
          "polyline[0].points[1].longitude": res.longitude,
          "polyline[0].points[1].latitude": res.latitude
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})