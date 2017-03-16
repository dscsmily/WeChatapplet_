# WeChatapplet_
微信小程序增删 图片上传

# APPID=》wx997674b3319b4d88




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




      bindtouchstart="touchS" //手指刚放到屏幕触发
      bindtouchmove="touchM" //触摸时触发，手指在屏幕上每移动一次，触发一次
      bindtouchend="touchE" //手指移动结束后触发
      
      
      
      
下载安装微信开车者工具


下载 demo 演示 
