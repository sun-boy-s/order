// pages/identify/identify.js
import WxValidate from '../../utils/WxValidate.js'
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userMessage:{
      id: '',
      name: '',
      type: '',
      invite_code: '',
      num_id: '',
      real_name:'',
      tele_number: ''
    },
    hiddenToast: true,
    toastMessage: '已认证'
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
      numId: {
        required: true,
        digits: true,
        rangelength: [8, 8]
      },
      realName: {
        required: true,
        rangelength: [2, 18]
      },
      teleNumber: {
        required: true,
        tel: true
      },
      inviteCode: {
        required: true,
        rangelength: [8, 8]
      }
    }
    const messages = {
      numId: {
        required: '请填写学号',
        digits: '学号只能填写数字',
        rangelength: '学号长度只能八位'
      },
      realName: {
        required: '请填写姓名',
        rangelength: '姓名长度在2个字到9个字'
      },
      teleNumber: {
        required: '请填写手机号',
        tel: '请填写正确的手机号'
      },
      inviteCode: {
        required: '请填写认证码',
        rangelength: '认证码长度为8位'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },

  formSubmit:function(e){
    this.setData({
      'userMessage.invite_code': e.detail.value.inviteCode,
      'userMessage.num_id': e.detail.value.numId,
      'userMessage.real_name': e.detail.value.realName,
      'userMessage.tele_number': e.detail.value.teleNumber,
    })
    var that = this;
    if(this.data.userMessage.type==0){
      wx.request({
        url: util.urlPath+'/order1.0/school/identify',
        method: 'post',
        header: {
          'context-type': 'application/json'
        },
        data: {
          userMessage:that.data.userMessage
        },
        success: res => {
          //如果学生写入成功
          if(res.statusCode==200){
            wx.setStorage({
              key: 'user',
              data: res.data,
            });
            // wx.reLaunch({
            //   url: 'pages/index/index'
            // })
            //延时成功处理
            wx.showToast({
              title: "认证成功",
              icon: 'success',
              duration: 2000,
            })
            setTimeout(function () { 
              wx.switchTab({
                //跳转到tabBar页面，并关闭其他所有tabBar页面
                url: "/pages/index/index"
              }) 
            }, 2000)
            
          }
          else if(res.statusCode==404){
            if(res.data.code==404){
              //邀请码错误
              that.setData({
                hiddenToast: !that.data.hiddenToast,
                toastMessage: res.data.message
              })
            }
          }
        }
      })
    }
    else if (this.data.userMessage.type==1){
      this.setData({
        hiddenToast: !this.data.hiddenToast
      })
    }
    
  },
  toastHidden: function () {
    this.setData({
      hiddenToast: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
          'userMessage.id':res.data.openId,
          'userMessage.name':res.data.name,
          'userMessage.type':res.data.type
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

  }
})