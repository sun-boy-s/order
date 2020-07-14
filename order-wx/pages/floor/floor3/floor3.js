// pages/floor/floor3/floor3.js
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seatIdList:{
        arrayOne: [],
        arrayTwo: [],
        arrayThree: [],
        arrayFour: [],
        arrayFive: [],
        arraySix: [],
        arraySeven: [],
        arrayEight: [],
        arrayNine: [],
        arrayTen: [],
        arrayEleven: [],
        arrayTwelve: [],
        arrayThirt: [],
        arrayFourt: [],
        arrayFifteen: [],
        arraySixteen: []
    },
    isHidden: true,
    list:{
      date: "",
      time: "",
      openId: "",
      seatId: "",
      schId: ""
    },
    user:{

    },
    school:{

    },
    x: 76,
    y: 10,
  },
  tap: function (e) {
    this.setData({
      x: 30,
      y: 30
    });
  },
  // onChange: function (e) {
  //   console.log(e.detail)
  // },
  // onScale: function (e) {
  //   console.log(e.detail)
  // },
  imgClick: function(e){
    if(this.data.isHidden){
      this.setData({
        isHidden: false,
        'list.seatId': e.currentTarget.id
      })
    }else{
      this.setData({
        'list.seatId': e.currentTarget.id
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.setData({
          user: res.data,
          'list.openId': res.data.openId
        })
      },
    })
    var sch = wx.getStorageSync("school");
    that.setData({
      school: sch,
      'list.schId': sch.schId
    })
    that.setData({
      'list.date': options.date,
      'list.time': options.time,
    })
    wx.request({
      url: util.urlPath+'/order1.0/seat/getSeat',
      method: 'post',
      header: {
        'content-type': 'application/json',
      },
      data: {
        floor: 3,
      },
      success: res => {
        var resData = res.data;
        wx.request({
          url: util.urlPath+'/order1.0/orderList/getSeat',
          method: 'POST',
          header: {
            'content-type': 'application/json',
          },
          data: {
            date: options.date,
            time: options.time,
            schId: this.data.school.schId
          },
          success: res => {
            var listData = res.data;
            let i = 0;
            let j = 0;
            for (i = 0; i < listData.length; i++) {
              for (j = 0; j < resData.length;j++){
                if(resData[j].seat_id==listData[i]){
                  resData[j].ordering = 1;
                }
              }
            }
            that.setData({
              'seatIdList.arrayOne': resData.slice(0, 20),
              'seatIdList.arrayTwo': resData.slice(20, 40),
              'seatIdList.arrayThree': resData.slice(40, 60),
              'seatIdList.arrayFour': resData.slice(60, 80),
              'seatIdList.arrayFive': resData.slice(80, 100),
              'seatIdList.arraySix': resData.slice(100, 120),
              'seatIdList.arraySeven': resData.slice(120, 140),
              'seatIdList.arrayEight': resData.slice(140, 160),
              'seatIdList.arrayNine': resData.slice(160, 165),
              'seatIdList.arrayTen': resData.slice(165, 170),
              'seatIdList.arrayEleven': resData.slice(170, 175),
              'seatIdList.arrayTwelve': resData.slice(175, 180),
              'seatIdList.arrayThirt': resData.slice(180, 185),
              'seatIdList.arrayFourt': resData.slice(185, 190),
              'seatIdList.arrayFifteen': resData.slice(190, 195),
              'seatIdList.arraySixteen': resData.slice(195, 200)
            })
            // console.log(that.data.seatIdList.arrayOne);
          }
        })
        // this.setData({
        //   'seatIdList.arrayOne': res.data.slice(0, 20),
        //   'seatIdList.arrayTwo': res.data.slice(20, 40),
        //   'seatIdList.arrayThree': res.data.slice(40, 60),
        //   'seatIdList.arrayFour': res.data.slice(60, 80),
        //   'seatIdList.arrayFive': res.data.slice(80, 100),
        //   'seatIdList.arraySix': res.data.slice(100, 120),
        //   'seatIdList.arraySeven': res.data.slice(120, 140),
        //   'seatIdList.arrayEight': res.data.slice(140, 160),
        // })

      }
    })
  },
  //表单提交
  formSubmit: function(e){
    this.setData({
      'list.seatId': e.detail.value.seatId,
    })
    wx.request({
      url: util.urlPath+'/order1.0/orderList/ordering',
      method: 'post',
      header: {
        'content-type': 'application/json'
      },
      data:{
        list:this.data.list
      },
      success: res=>{
        if (res.statusCode == 200) {
          wx.showToast({
            title: res.data,
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: res.data,
            icon: 'none',
            duration: 2000
          })
        }
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 2100)
      }
    })
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

  }
})