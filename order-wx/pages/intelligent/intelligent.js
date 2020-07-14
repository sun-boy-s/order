// pages/intelligent /intelligent.js
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio_major: [{
      name: "软件学院",
      type: 1
    }, {
      name: "音乐学院",
      type: 2
    }, {
      name: "马克思学院",
      type: 3
    }, {
      name: "空乘专业",
      type: 4
    }, {
      name: "国教学院",
      type: 5
    }, {
      name: "信工学院",
      type: 6
    }],
    magorModalName: "",
    majorName: "专业可选",
    magorSend: 0,

    radio_air: [{
      name: "没有空调",
      type: 1
    }, {
      name: "远离空调",
      type: 2
    }, {
      name: "偏离空调",
      type: 3
    }, {
      name: "正对空调",
      type: 4
    }, {
      name: "靠近空调",
      type: 5
    }],
    airModelName: "",
    airName: "修炼室温",
    airSend: 0,

    radio_window: [{
      name: "没有窗户",
      type: 1
    }, {
      name: "远离窗户",
      type: 2
    }, {
      name: "偏离窗户",
      type: 3
    }, {
      name: "靠近窗户",
      type: 4
    }, {
      name: "窗户旁边",
      type: 5
    }],
    windowModelName: "",
    windowName: "明亮程度",
    windowSend: 0,

    radio_type: [{
      name: "考研座位",
      type: 1
    }, {
      name: "普通座位",
      type: 2
    }, {
      name: "普通可充电",
      type: 3
    }],
    typeModelName: "",
    typeName: "座位类型",
    typeSend: 0,
    list: []
  },
  //专业
  showModalMagor: function(e) {
    this.setData({
      magorModalName: "magorModalName"
    })
  },
  cancelMagor: function(e) {
    this.setData({
      magorModalName: ""
    })
  },
  changeItemMajor: function(e) {

  },
  changeNameMagor: function(e) {
    this.setData({
      majorName: e.currentTarget.id,
      magorSend: e.currentTarget.dataset.type
    })
  },
  //空调
  showModalAir: function(e) {
    this.setData({
      airModalName: "airModalName"
    })
  },
  cancelAir: function(e) {
    this.setData({
      airModalName: ""
    })
  },
  changeItemAir: function(e) {

  },
  changeNameAir: function(e) {
    this.setData({
      airName: e.currentTarget.id,
      airSend: e.currentTarget.dataset.type
    })
  },
  //窗户
  showModalWindow: function(e) {
    this.setData({
      windowModalName: "windowModalName"
    })
  },
  cancelWindow: function(e) {
    this.setData({
      windowModalName: ""
    })
  },
  changeItemWindow: function(e) {

  },
  changeNameWindow: function(e) {
    this.setData({
      windowName: e.currentTarget.id,
      windowSend: e.currentTarget.dataset.type
    })
  },
  //类型
  showModalType: function(e) {
    this.setData({
      typeModalName: "typeModalName"
    })
  },
  cancelType: function(e) {
    this.setData({
      typeModalName: ""
    })
  },
  changeItemType: function(e) {

  },
  changeNameType: function(e) {
    this.setData({
      typeName: e.currentTarget.id,
      typeSend: e.currentTarget.dataset.type
    })
  },
  //智能搜索
  telligent: function(e) {
    wx.request({
      url: util.urlPath + '/order1.0/seat/intelligent',
      method: 'post',
      header: {
        'content-type': 'application/json'
      },
      data: {
        magorSend: this.data.magorSend,
        airSend: this.data.airSend,
        windowSend: this.data.windowSend,
        typeSend: this.data.typeSend
      },
      success: res => {
        this.setData({
          list: res.data
        })
      }
    })
  },
  selectTo: function(e) {
    wx.request({
      url: util.urlPath + '/order1.0/seat/search',
      method: 'post',
      header: {
        'context-type': 'application/json'
      },
      data: {
        seatId: e.currentTarget.dataset.seatid
      },
      success: res => {
        if (res.statusCode == 200) {
          wx.setStorage({
            key: 'seat',
            data: res.data,
          })
          wx.navigateTo({
            url: '../search/search?seatId=' + e.currentTarget.dataset.seatid,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        } else if (res.statusCode == 404) {
          if (res.data.code == 404) {
            wx.showToast({
              title: '座位不存在',
              icon: 'none',
              duration: 2000
            })
          }
        } else {
          wx.showToast({
            title: '重新输入',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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