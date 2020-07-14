import WxValidate from '../../utils/WxValidate.js'
var util = require('../../utils/util.js');
var bmap = require('../../utils/bmap-wx.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    background: ['../../utils/images/college-one.jpg', '../../utils/images/college-two.jpg',
      '../../utils/images/college-three.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    user:{
      id:'',
      type:''
    },
    hiddenToast: true,
    toastMessage: "",
    seatId:"",
    originalData: {}
  },

  //报错 
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },

  //验证函数
  initValidate() {
    const rules = {
      seatId: {
        required: true,
        rangelength: [10, 10]
      }
    }
    const messages = {
      seatId: {
        required: '请填写座位号',
        digits: '只能填写字母+数字',
        rangelength: '座位号长度只能十位'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  searchSubmit: function (e) {
    // console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    if(this.data.user.type==1){
      const params = e.detail.value
      //校验表单
      if (!this.WxValidate.checkForm(params)) {
        const error = this.WxValidate.errorList[0]
        this.showModal(error)
        return false
      }
      wx.request({
        url: util.urlPath + '/order1.0/seat/search',
        method: 'post',
        header: {
          'context-type': 'application/json'
        },
        data: {
          seatId: e.detail.value.seatId
        },
        success: res => {
          if (res.statusCode == 200) {
            wx.setStorage({
              key: 'seat',
              data: res.data,
            })
            wx.navigateTo({
              url: '../search/search?seatId=' + e.detail.value.seatId,
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
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
    }else{
      wx.showToast({
        title: '请先认证',
        icon: 'none',
        duration: 2000
      })
    }
    
  },
  scroll:function(e){
    // console.log(e);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'Onl6RzOMdQ5WwKx2tRNUmYLweK3Hzbq9'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      that.setData({
        originalData: data.originalData.results[0]
      })
      // console.log(that.data.originalData);
    }
    // 发起weather请求 
    BMap.weather({
      fail: fail,
      success: success
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.initValidate()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function(res) {
        that.setData({
          'user.id':res.data.openId,
          'user.type':res.data.type
        })
      },
    })
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
    
  },
  selforder: function (event) {
    if(this.data.user.type==0){
      this.setData({
        hiddenToast: !this.data.hiddenToast,
        toastMessage: "还未认证学校"
      })
    }
    else if(this.data.user.type==1){
      //获取图书馆id
      wx.request({
        url: util.urlPath+'/order1.0/school/getSch',
        method: 'post',
        header: {
          'context-type': 'application/json'
        },
        data: {
          openId: this.data.user.id
        },
        success: res => {
          //将学生的学校id缓存
          wx.setStorage({
            key: 'school',
            data: res.data,
          })
        }
      })
      const id = event.currentTarget.id;
      const url = "../" + id + "/" + id;
      wx.navigateTo({
        url: url,
      })
    }
  },
  identify: function (event) {
    //已认证学校
    if (this.data.user.type == 1) {
      this.setData({
        hiddenToast: !this.data.hiddenToast,
        toastMessage: "已认证学校"
      })
    }
    //未认证学校
    else if (this.data.user.type == 0) {
      const id = event.currentTarget.id;
      const url = "../" + id + "/" + id;
      wx.navigateTo({
        url: url,
      })
    }
  },
  intelligent:function(event){
    if (this.data.user.type == 0) {
      this.setData({
        hiddenToast: !this.data.hiddenToast,
        toastMessage: "还未认证学校"
      })
    }
    else if (this.data.user.type == 1) {
      const id = event.currentTarget.id;
      const url = "../" + id + "/" + id;
      wx.navigateTo({
        url: url,
        success:res=>{
          
        },
        fail:res=>{
          console.log("failed!!!");
        }
      })
    }
  },
  leakage: function (event) {
    if (this.data.user.type == 0) {
      this.setData({
        hiddenToast: !this.data.hiddenToast,
        toastMessage: "还未认证学校"
      })
    }
    else if (this.data.user.type == 1) {
      const id = event.currentTarget.id;
      const url = "../" + id + "/" + id;
      wx.navigateTo({
        url: url,
        success: res => {

        },
        fail: res => {
          console.log("failed!!!");
        }
      })
    }
  },
  toastHidden: function () {
    this.setData({
      hiddenToast: true
    })
  },
})