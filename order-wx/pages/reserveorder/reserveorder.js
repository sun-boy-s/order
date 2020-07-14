var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {},
    seat: {},
    beginSignMess: "",
    endSignMess: "",
    beginSign: true,
    endSign: true,
    setInter: ''
  },
  sign:function(e){
    console.log(e);
    wx.navigateTo({
      url: '../mapsign/mapsign?listId='+this.data.order.listId+'&&type='+ e.currentTarget.id,
    })
  },
  deserve: function(e) {
    wx.request({
      url: util.urlPath + '/order1.0/orderList/deserve',
      method: 'post',
      header: {
        'content-type': 'application/json'
      },
      data: {
        date: this.data.order.dateTime,
        time: this.data.order.times,
        seatId: this.data.order.seatId,
        openId: this.data.order.openId
      },
      success: res => {
        if (res.statusCode == 200 && res.data == 'succeed') {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '刷新重试',
            icon: 'none',
            duration: 2000
          })
        }
        setTimeout(function() {
          wx.navigateBack({
            delta: 1
          })
        }, 2100)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var order = JSON.parse(options.order);
    this.setData({
      order: order
    });
    util.getSeat(order.seatId);
    try {
      var value = wx.getStorageSync('seat')
      if (value) {
        this.setData({
          seat: value
        });
      }
    } catch (e) {
      // Do something when catch error
    }
    this.judgeTime();
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
    wx.request({
      url: util.urlPath +'/order1.0/orderList/findListByListId',
      data: {
        listId: this.data.order.listId
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: res=> {
        this.setData({
          order: res.data
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    var that = this;
    this.data.setInter = setInterval(function(){
      that.judgeTime()
    },5000);
  },
  judgeTime:function(){
    var that = this;
    var d = new Date();
    var data = util.getNowFormatDate(d, 0);
    var h = d.getHours();
    var m = d.getMinutes();
    if (h < 10) {
      h = "0" + "" + h;
    }
    if (m < 10) {
      m = "0" + "" + m;
    }
    var newTime = h + ":" + m;
    var time = that.data.order.times;
    var begin = time.charAt(0);
    var end = time.charAt(6);
    var beginHouse;//入馆前五分钟
    var beginHouserOver = time.substring(0, 5);//入馆签到结束
    var endHouse;//离馆前五分钟
    var endHouseOve = time.substring(6);//离馆签到结束
    //开始时间
    if (begin == "0") {
      beginHouse = parseInt(time.charAt(1)) - 1;
    } else {
      beginHouse = parseInt(time.substring(0, 2)) - 1;
    }
    beginHouse += "";
    if (beginHouse.length == 1) {
      beginHouse = "0" + beginHouse;
    }
    beginHouse = beginHouse + ":55";
    //结束时间
    if (end == "0") {
      endHouse = parseInt(time.charAt(7)) - 1;
    } else {
      endHouse = parseInt(time.substring(6, 8)) - 1;
    }
    endHouse += "";
    if (endHouse.length == 1) {
      endHouse = "0" + endHouse;
    }
    endHouse = endHouse + ":55";
    //判断是否已经签过到了
    if (that.data.order.beginSign == 0) {
      if (newTime >= beginHouse && newTime <= beginHouserOver) {
        that.setData({
          beginSign: false,
          beginSignMess: "点击签到"
        })
      } else {
        that.setData({
          beginSign: true,
          beginSignMess: "未签到"
        })
      }
    } else {
      that.setData({
        beginSign: true,
        beginSignMess: "已签到"
      })
    }
    if (that.data.order.endSign == 0) {
      if (newTime >= endHouse && newTime <= endHouseOve) {
        that.setData({
          endSign: false,
          endSignMess: "点击签到"
        })
      } else {
        that.setData({
          endSign: true,
          endSignMess: "未签到"
        })
      }
    } else {
      that.setData({
        endSign: true,
        endSignMess: "已签到"
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    clearInterval(this.data.setInter);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    clearInterval(this.data.setInter);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.onShow();
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