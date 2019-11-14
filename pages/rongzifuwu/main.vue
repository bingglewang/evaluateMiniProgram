<template>
	<view class="rongzifuhome">
		<image src="../../static/images/rongzifuwu.jpg" @touchstart='timestartF' @touchend='timeendF' @tap='saveImg' class="backimg"></image>
		<min-action-sheet ref="as"></min-action-sheet>
	</view>

</template>

<script>
	import minActionSheet from '@/components/min-action-sheet/min-action-sheet'
	export default {
		components: {
			minActionSheet
		},
		data() {
			return {
				timestart: 0,
				timeend: 0
			}
		},
		methods: {
			testAs1() {
				let _this = this;
				this.$refs.as.handleShow({
					actions: [{
							name: '保存',
							icon: 'iconfont active',
							color: '#007aff'
						}
					],
					success: (res) => {
						switch (res.id) {
							// -1代表取消按钮
							case -1:
								console.log(res)
								break
							case 0:
								_this.saveToBlum();
								break
						}
					}
				})
			},
			//点击开始的时间  
			timestartF(e) {
				this.timestart = e.timeStamp
			},
			//点击结束的时间
			timeendF(e) {
				this.timeend = e.timeStamp
			},

			//保存图片
			saveImg: function(e) {
				var _this = this;
				var times = _this.timeend - _this.timestart;
				if (times > 300) {
					_this.testAs1();
					
				}
			},
			 saveToBlum:function(){
			    let imgUrl = '../../static/images/rongzifuwu.jpg';
			    wx.getImageInfo({
			      src: imgUrl,
			      success: function (ret) {
			        var path = ret.path;
			        wx.saveImageToPhotosAlbum({
			          filePath: path,
			          success(result) {
			            wx.showToast({
			              title: '保存成功',
			              icon: 'success'
			            })
			          },
			        })
			      }
			    })
			  },
			saveImgPhotoshop(){
				uni.getSetting({
					success: function(res) {
						uni.authorize({
							scope: 'scope.writePhotosAlbum',
							success: function(res) {
								var imgUrl = "http://zs-1256645015.cos.ap-guangzhou.myqcloud.com/traceueditor/image/rongzifuwu.jpg";
								uni.downloadFile({ //下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
									url: imgUrl,
									success: function(res) {
										uni.showToast({
											title: '成授权成功册',
											icon: 'success'
										})
										// 下载成功后再保存到本地
										uni.saveImageToPhotosAlbum({
											filePath: res.tempFilePath, //返回的临时文件路径，下载后的文件会存储到一个临时文件
											success: function(res) {
												uni.showToast({
													title: '成功保存到相册',
													icon: 'success'
												})
											}
										})
									}
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}

	.rongzifuhome {
		width: 100%;
		height: 100%;
		overflow: hidden;

		.backimg {
			width: 100%;
			height: 100%;
		}
	}
</style>
