var app = getApp()  
Page({  
  data: {   
    winWidth: 0,  
    winHeight: 0,
    imagePaths:[{},{}], 
    delBtnWidth:60 
  },  
  onLoad: function () {   
   var that = this; 
    wx.getSystemInfo( {   
      success: function( res ) {  
        that.setData( {  
          winWidth: res.windowWidth,  
          winHeight: res.windowHeight ,  
        });  
      } 
     });    
    }, 

    chooseimage: function (e) {
     var _this = this,id = e.currentTarget.dataset.id;
    
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
              var imgsrc = res.tempFilePaths[0];

               console.log('当前id' + id) ;

               var newImgs = _this.data.imagePaths.concat();
 

                newImgs.splice(id,1,{src : imgsrc});

                _this.setData({
                  
                  imagePaths: newImgs

                })
      }
    })

  },

   additem: function (){
    this.setData({ 
      imagePaths: this.data.imagePaths.concat([{ src : "/image/2.jpg" }])
    })

  },


   //手指刚放到屏幕触发
  touchS:function(e){
   // console.log("touchS"+e);
   //判断是否只有一个触摸点
    if(e.touches.length==1){
      this.setData({
        //记录触摸起始位置的X坐标
        startX:e.touches[0].clientX
      });
    }
  },
 //触摸时触发，手指在屏幕上每移动一次，触发一次
  touchM:function(e){
     // console.log("touchM:"+e);
    var that = this
    if(e.touches.length==1){
     //记录触摸点位置的X坐标
      var moveX = e.touches[0].clientX;
      //计算手指起始点的X坐标与当前触摸点的X坐标的差值
      var disX = that.data.startX - moveX;
     //delBtnWidth 为右侧按钮区域的宽度
      var delBtnWidth = that.data.delBtnWidth;
      var txtStyle = "";
      if(disX == 0 || disX < 0){//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0px";
      }else if(disX > 0 ){//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-"+disX+"px";
        if(disX>=delBtnWidth){
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-"+delBtnWidth+"px";
        }
      }
      
      //获取手指触摸的是哪一个item
      var index = e.currentTarget.dataset.index;

     

      var list = that.data.imagePaths;

      
      //将拼接好的样式设置到当前item中
     list[index].txtStyle = txtStyle; 
     // console.log(txtStyle) 
      //更新列表的状态
      this.setData({
       imagePaths:list
      });
    }
  },
  touchE:function(e){
     // console.log("touchE"+e);
    var that = this
    if(e.changedTouches.length==1){
      //手指移动结束后触摸点位置的X坐标
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = that.data.startX - endX;
      var delBtnWidth = that.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth/2 ? "left:-"+delBtnWidth+"px":"left:0px";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = that.data.imagePaths;
      list[index].txtStyle = txtStyle; 
      //更新列表的状态
      that.setData({
       imagePaths:list
      });
    }
  },

  delcont:function (e){
      var that = this;
      var index = e.currentTarget.dataset.index; 
      var list = that.data.imagePaths; 
      console.log(index)
      
     list.splice(index,1)
      
      this.setData({
       imagePaths:list
      });
  }
})  