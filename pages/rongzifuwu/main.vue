<template>
	<view class="rongzifuhome">
		<image src="../../static/images/rongzifuwu.jpg" data-src='https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/traceueditor/image/rongzifuwu.jpg' @tap='previewImage' class="backimg"></image>
	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			 previewImage: function(e) {
			    var current = e.target.dataset.src;
				console.log('图片路径：'+current)
			    uni.previewImage({
			      current: 0,
			      urls: [current]
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
	.rongzifuhome{
		width: 100%;
		height: 100%;
		overflow: hidden;
		.backimg{
			width: 100%;
			height: 100%;
		}
	}
</style>
