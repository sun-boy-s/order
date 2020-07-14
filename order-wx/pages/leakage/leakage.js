// pages/leakage/leakage.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: "",
    time: [],
    timeModalName: "",
    timeName: "可选时间段",
    timeSend: "",

    floors: [{
      name: "图书馆一楼",
      type: 1
    }, {
      name: "图书馆二楼",
      type: 2
    }, {
      name: "图书馆三楼",
      type: 3
    }, {
      name: "图书馆四楼",
      type: 4
    }, {
      name: "图书馆五楼",
      type: 5
    }],
    floorsModalName: "",
    floorsName: "楼层可选",
    floorsSend: 0,
  },
  //时间段
  showModalTime: function(e) {
    this.setData({
      timeModalName: "timeModalName"
    })
  },
  cancelTime: function(e) {
    this.setData({
      timeModalName: ""
    })
  },
  changeItemTime: function(e) {

  },
  changeNameTime: function(e) {
    this.setData({
      timeName: e.currentTarget.id,
      timeSend: e.currentTarget.dataset.type
    })
  },
  //楼层
  showModalFloors: function(e) {
    this.setData({
      floorsModalName: "floorsModalName"
    })
  },
  cancelFloors: function(e) {
    this.setData({
      floorsModalName: ""
    })
  },
  changeItemFloors: function(e) {

  },
  changeNameFloors: function(e) {
    this.setData({
      floorsName: e.currentTarget.id,
      floorsSend: e.currentTarget.dataset.type
    })
  },
  spreedSearch: function(e) {
    if (this.data.timeSend == "") {
      wx.showToast({
        title: '选择时间',
        icon: 'none',
        duration: 2000
      })
      return;
    } else if (this.data.floorsSend == 0) {
      wx.showToast({
        title: '选择楼层',
        icon: 'none',
        duration: 2000
      })
      return;
    } else if (this.data.timeSend == "明天再来") {
      wx.showToast({
        title: '请预约明天的座位',
        icon: 'none',
        duration: 2000
      })
      return;
    } else {
      const id = this.data.floorsSend + "";
      wx.navigateTo({
        url: '../floor/floor' + id + '/floor' + id + '?date=' + this.data.data + '&time=' + this.data.timeSend,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var d = new Date();
    var data = util.getNowFormatDate(d, 0);
    this.setData({
      data: data
    })
    var h = d.getHours();
    var m = d.getMinutes();
    if (h < 10) {
      h = "0" + "" + h;
    }
    if (m < 10) {
      m = "0" + "" + m;
    }
    var newTime = h + ":" + m;
    if (newTime < "09:00") {
      this.setData({
        time: ["08:00-10:00", "10:00-12:00", "12:00-14:00", "14:00-16:00", "16:00-18:00", "18:00-22:00"]
      })
    } else if (newTime < "11:00") {
      this.setData({
        time: ["10:00-12:00", "12:00-14:00", "14:00-16:00", "16:00-18:00", "18:00-22:00"]
      })
    } else if (newTime < "13:00") {
      this.setData({
        time: ["12:00-14:00", "14:00-16:00", "16:00-18:00", "18:00-22:00"]
      })
    } else if (newTime < "15:00") {
      this.setData({
        time: ["14:00-16:00", "16:00-18:00", "18:00-22:00"]
      })
    } else if (newTime < "17:00") {
      this.setData({
        time: ["16:00-18:00", "18:00-22:00"]
      })
    } else if (newTime < "20:00") {
      this.setData({
        time: ["18:00-22:00"]
      })
    } else {
      time: ["明天再来"]
    }
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