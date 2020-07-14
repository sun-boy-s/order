// pages/search/search.js
var time = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {
      date: "",
      time: "",
      openId: "",
      seatId: "",
      schId: ""
    },
    seat: {},
    date: "",
    time: "",
    seatType: "",
    // todayList: [],
    // tomorrowList: [],
    // afterTList: [],
    dates: [],
    timeOne: [{
        "time": "08:00-10:00",
        "isOver": 0,
        "oc": false
      },
      {
        "time": "10:00-12:00",
        "isOver": 0,
        "oc": false
      },
      {
        "time": "12:00-14:00",
        "isOver": 0,
        "oc": false
      },
      {
        "time": "14:00-16:00",
        "isOver": 0,
        "oc": false
      },
      {
        "time": "16:00-18:00",
        "isOver": 0,
        "oc": false
      },
      {
        "time": "18:00-22:00",
        "isOver": 0,
        "oc": false
      },
    ],
    timeTwo: [{
        "time": "08:00-10:00",
        "isOver": 0,
        "oc": false
      },
      {
        "time": "10:00-12:00",
        "isOver": 0,
        "oc": false
      },
      {
        "time": "12:00-14:00",
        "isOver": 0,
        "oc": false
      },
      {
        "time": "14:00-16:00",
        "isOver": 0,
        "oc": false
      },
      {
        "time": "16:00-18:00",
        "isOver": 0,
        "oc": false
      },
      {
        "time": "18:00-22:00",
        "isOver": 0,
        "oc": false
      },
    ],
    timeThree: [{
        "time": "08:00-10:00",
        "isOver": 0,
        "oc": false
      },
      {
        "time": "10:00-12:00",
        "isOver": 0,
        "oc": false
      },
      {
        "time": "12:00-14:00",
        "isOver": 0,
        "oc": false
      },
      {
        "time": "14:00-16:00",
        "isOver": 0,
        "oc": false
      },
      {
        "time": "16:00-18:00",
        "isOver": 0,
        "oc": false
      },
      {
        "time": "18:00-22:00",
        "isOver": 0,
        "oc": false
      },
    ]
  },
  onClick: function(e) {
    var timeOne = wx.getStorageSync("timeOne");
    var timeTwo = wx.getStorageSync("timeTwo");
    var timeThree = wx.getStorageSync("timeThree");
    this.setData({
      timeOne: timeOne,
      timeTwo: timeTwo,
      timeThree: timeThree
    })
    var dateTime = e.currentTarget.id;
    var array = dateTime.split(" ");
    this.setData({
      date: array[0],
      time: array[1]
    })
    var i = 0;
    var dates = this.data.dates;
    var times;
    var flag;
    for (i = 0; i < dates.length; i++) {
      if (array[0] == dates[i]) {
        flag = i;
        if (i == 0) {
          times = this.data.timeOne;
        } else if (i == 1) {
          times = this.data.timeTwo;
        } else {
          times = this.data.timeThree;
        }
      }
    }
    for (i = 0; i < times.length; i++) {
      if (array[1] == times[i].time) {
        times[i].oc = true;
      }
    }
    if (flag == 0) {
      this.setData({
        timeOne: times
      })
    } else if (flag == 1) {
      this.setData({
        timeTwo: times
      })
    } else {
      this.setData({
        timeThree: times
      })
    }
    // console.log(this.data.date);
    // console.log(this.data.time);
  },
  reserving:function(e){
    this.setData({
      'list.date': this.data.date,
      'list.time': this.data.time,
      'list.seatId': this.data.seat.seatId
    })
    if(this.data.list.date==""){
      wx.showToast({
        title: "请先选择时间段",
        icon: 'none',
        duration: 2000
      })
    }else{
      // console.log(this.data.list);
      wx.request({
        url: time.urlPath + '/order1.0/orderList/ordering',
        method: 'post',
        header: {
          'content-type': 'application/json'
        },
        data: {
          list: this.data.list
        },
        success: res => {
          if (res.statusCode == 200 && res.data == "预约成功") {
            wx.showToast({
              title: res.data,
              icon: 'success',
              duration: 2000
            })
          } else{
            wx.showToast({
              title: res.data,
              icon: 'none',
              duration: 2000
            })
            return;
          }
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 2100)

        }
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getStorage({
      key: 'user',
      success: res=> {
        this.setData({
          'list.openId': res.data.openId
        })
      },
    })
    wx.getStorage({
      key: 'school',
      success: res => {
        this.setData({
          'list.schId': res.data.schId
        })
      },
    })
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
    wx.getStorage({
      key: 'seat',
      success: res => {
        var type = res.data.type;
        if (type == 1) {
          type = "考研座位"
        }
        this.setData({
          seat: res.data,
          seatType: type
        })
      },
    })
    wx.request({
      url: time.urlPath+'/order1.0/orderList/getList',
      method: 'post',
      header: {
        'context-type': 'application/json'
      },
      data: {
        seatId: options.seatId
      },
      success: res => {
        var i = 0;
        var j = 0;
        var todayList = res.data.todayList;
        var timeOne = this.data.timeOne;
        for (i = 0; i < timeOne.length; i++) {
          for (j = 0; j < todayList.length; j++) {
            if (timeOne[i].time == todayList[j]) {
              timeOne[i].isOver = 1;
            }
          }
        }
        var tomorrowList = res.data.tomorrowList;
        var timeTwo = this.data.timeTwo;
        for (i = 0; i < timeTwo.length; i++) {
          for (j = 0; j < tomorrowList.length; j++) {
            if (timeTwo[i].time == tomorrowList[j]) {
              timeTwo[i].isOver = 1;
            }
          }
        }
        var afterTList = res.data.afterTList;
        var timeThree = this.data.timeThree;
        for (i = 0; i < timeThree.length; i++) {
          for (j = 0; j < afterTList.length; j++) {
            if (timeThree[i].time == afterTList[j]) {
              timeThree[i].isOver = 1;
            }
          }
        }
        this.setData({
          'timeOne': timeOne,
          'timeTwo': timeTwo,
          'timeThree': timeThree
        })
        wx.setStorage({
          key: 'timeOne',
          data: timeOne,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
        wx.setStorage({
          key: 'timeTwo',
          data: timeTwo,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
        wx.setStorage({
          key: 'timeThree',
          data: timeThree,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
        // console.log(this.data.timeOne);
        // console.log(this.data.timeTwo);
        // console.log(this.data.timeThree);
        // console.log(res);
        // this.setData({
        //   todayList: res.data.todayList,
        //   tomorrowList: res.data.tomorrowList,
        //   afterTList: res.data.afterTList
        // })
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