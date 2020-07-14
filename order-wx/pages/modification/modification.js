// pages/modification/modification.js

import WxValidate from '../../utils/WxValidate.js'
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId:'',
    name: '',
    type: '',
    userId: '',
    userName: '',
    userPhone:'',
    schId:''
  },

  
  // backPage:function(){
  //   wx.navigateBack({
  //     datle :1
  //   })
  // },

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
      userId: {
        required: true,
        digits: true,
        rangelength: [8, 8]
      },
      userName: {
        required: true,
        rangelength: [2, 18]
      },
      userPhone: {
        required: true,
        tel: true
      }
    }
    const messages = {
      userId: {
        required: '请填写学号',
        digits: '学号只能填写数字',
        rangelength: '学号长度只能八位'
      },
      userName: {
        required: '请填写姓名',
        rangelength: '姓名长度在2个字到9个字'
      },
      userPhone: {
        required: '请填写手机号',
        tel: '请填写正确的手机号'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  modifySubmit: function (e) {
    // console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    this.setData({
      userId: e.detail.value.userId,
      userName: e.detail.value.userName,
      userPhone: e.detail.value.userPhone
    })
    wx.request({
      url: util.urlPath+'/order1.0/student/update',
      method: 'post',
      header: {
        'context-type': 'application/json'
      },
      data: {
        user:this.data
      },
      success: res => {
        wx.setStorage({
          key: 'user',
          data: res.data,
        })
        this.showModal({
          msg: '提交成功'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function(res) {
        that.setData({
          openId: res.data.openId,
          name: res.data.name,
          type: res.data.type,
          schId: res.data.schId
        })
      },
    })
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