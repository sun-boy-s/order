// pages/library/library.js
var time = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    library: {
      lib_id: "",
      name: "",
      floor_size: 0
    },
    school: {
      schId: "",
      name: '',
      introduce: '',
    },
    dates: [],
    times: [
      "08:00-10:00",
      "10:00-12:00",
      "12:00-14:00",
      "14:00-16:00",
      "16:00-18:00",
      "18:00-22:00",
    ],
    select: false,
    date: '选择合适的日期',
    timeSelect: false,
    time: '选择合适的时间段'

  },

  floorCleck: function(event) {
    if(this.data.date=='选择合适的日期'){
      wx.showToast({
        title: '选择日期',
        icon: 'none',
        duration: 2000
      })
    }else if(this.data.time=='选择合适的时间段'){
      wx.showToast({
        title: '选择时段',
        icon: 'none',
        duration: 2000
      })
    }else{
      const id = event.currentTarget.id + "";
      const url = "../floor/floor" + id + "/floor" + id;
      wx.navigateTo({
        url: '../floor/floor' + id + '/floor' + id + '?date=' + this.data.date + '&time=' + this.data.time,
      })
    }
  },
  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },
  mySelect(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      date: name,
      select: false
    })
  },
  bindShowMsgT() {
    this.setData({
      timeSelect: !this.data.timeSelect
    })
  },
  mySelectT(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      time: name,
      timeSelect: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var date = new Date();
    //明天的时间 
    var day1 = time.getNowFormatDate(date, 1);
    //后天的时间
    var day2 = time.getNowFormatDate(date, 2);
    //大后天的时间
    var day3 = time.getNowFormatDate(date, 3);
    this.setData({
      dates: [day1, day2, day3]
    })
    var school = wx.getStorageSync("school");
    this.setData({
      'school.schId': school.schId,
      'school.name': school.name,
      'school.introduce': school.introduce
      // school:school
    })
    //获取图书馆
    wx.request({
      url: time.urlPath+'/order1.0/library/getLibBySchId',
      method: 'post',
      header: {
        'context-type': 'application/json'
      },
      data: {
        schId: this.data.school.schId
      },
      success: res => {
        //将学生的图书馆id缓存
        this.setData({
          'library.lib_id': res.data.libId,
          'library.name': res.data.name,
          'library.floor_size': res.data.floor
          // library:res.data
        })
        wx.setStorage({
          key: 'library',
          data: res.data,
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