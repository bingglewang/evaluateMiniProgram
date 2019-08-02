<template>
	<view>
		<view class="block">

		</view>
		<swiper class="QR screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="false" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3" indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in swiperList" :key="index" >
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
			</swiper-item>
		</swiper>
		<view class="title">
			扫描二维码，付款给{{cardCur == 0 ? '腾业公账':'腾业刘丹'}}
		</view>
		<view class="btn" v-show="showBtn" @tap="printscreen">
			{{tis}}
		</view>
		<view class="logo">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: '../../static/qr1.png'
				}, {
					id: 1,
					type: 'image',
					url: '../../static/qr2.png',
				}],
				dotStyle: true,
				towerStart: 0,
				direction: '',
				tis: "保存到相册",
				showBtn: false
			};
		},
		onLoad() {
			// #ifdef APP-PLUS
			this.showBtn = true;
			// #endif
		},
		methods: {
			cardSwiper(e) {
				this.cardCur = e.detail.current
				console.log('当前',this.cardCur)
			},
			// 截图，调用webview、Bitmap方法
			printscreen() {
				this.tis = "正在保存"
				let ws = this.$mp.page.$getAppWebview();
				let bitmap = new plus.nativeObj.Bitmap();
				this.showBtn = false;
				this.$nextTick(function() {
					setTimeout(() => {
						ws.draw(bitmap, (e) => {
							this.showBtn = true;
							console.log('bitmap绘制图片成功');
							console.log("e: " + JSON.stringify(e));
							bitmap.save("_doc/Qr.jpg", {
								overwrite: true,
								quality: 100
							}, (i) => {
								plus.gallery.save(i.target, (e) => {
									uni.showToast({
										title: '保存成功'
									})
									this.tis = "保存到相册"
									bitmap.clear(); //销毁
								}, (e) => {
									bitmap.clear(); //销毁
								});
							}, (e) => {
								console.log('保存图片失败：' + JSON.stringify(e));
							});
						}, (e) => {
							console.log('bitmap绘制图片失败：' + JSON.stringify(e));
						});
					}, 200)
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f4c153;
	}

	.block {
		width: 100%;
		height: 30vh;
		background-color: #fff;
		display: flex;
		justify-content: center;

	}

	.QR {
		width: 60vw;
		height: 60vw;
		margin: -40vw auto 0 auto;
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;

		image {
			width: 50vw;
			height: 50vw;
			margin-left: 5vw;
			margin-top: 5vw;
		}
	}

	.title {
		width: 100%;
		margin-top: 50upx;
		display: flex;
		justify-content: center;
		font-size: 36upx;
		color: #fff;
	}

	.btn {

		width: 50%;
		height: 80upx;
		border-radius: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 20upx;
		margin: 0 auto;
		margin-top: 50upx;
		background-color: rgba(255, 255, 255, .8);
	}

	.logo {
		width: 100%;
		display: flex;
		justify-content: center;
		position: absolute;
		bottom: 25upx;

		image {
			width: 39.6%;
		}

	}
</style>
