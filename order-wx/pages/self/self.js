Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{
      numId:"请到首页认证"
    },
    school:{
      name:"未认证"
    },
    hiddenToast: true,
    toastMessage: ""
  },
  toastHidden: function () {
    this.setData({
      hiddenToast: true
    })
  },
  toModification:function(event){
    if(this.data.user.type==1){
      wx.navigateTo({
        url: '../modification/modification',
      })
    } else if (this.data.user.type == 0){
      this.setData({
        hiddenToast: !this.data.hiddenToast,
        toastMessage: "还未认证"
      })
    } else {
      wx.showToast({
        title: '刷新重试',
        icon: 'none',
        duration: 2000
      })
    }
  },
  toAboutUs:function(event){
    wx.navigateTo({
      url: '../aboutUs/aboutUs',
    })
  },
  reserving: function (event) {
    if (this.data.user.type == 1) {
      wx.navigateTo({
        url: '../reserving/reserving',
        success:res=>{
          // console.log("跳转成功");
        },
        fail: res => { 
          console.log("跳转失败");
        },
        complete: res => { 
          // console.log("跳转结束");
        }
      })
    } else if (this.data.user.type == 0) {
      this.setData({
        hiddenToast: !this.data.hiddenToast,
        toastMessage: "还未认证"
      })
    }else{
      wx.showToast({
        title: '刷新重试',
        icon: 'none',
        duration: 2000
      })
    }
  },
  reserveorder: function (event) {
    if (this.data.user.type == 1) {
      wx.navigateTo({
        url: '../reserved/reserved',
      })
    } else if (this.data.user.type == 0) {
      this.setData({
        hiddenToast: !this.data.hiddenToast,
        toastMessage: "还未认证"
      })
    } else {
      wx.showToast({
        title: '刷新重试',
        icon: 'none',
        duration: 2000
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
      success: function(res) {
        that.setData({
          user:res.data
        })
      },
    })
    wx.getStorage({
      key: 'school',
      success: function (res) {
        that.setData({
          school: res.data
        })
      },
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