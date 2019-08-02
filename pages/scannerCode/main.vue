<template>
	 <view>
        <web-view :webview-styles="webviewStyles" :src="url"></web-view>
    </view>
</template>

<script>
	  export default {
        data() {
            return {
				url:'https://www.changemind.cn/yz?gjdGuid=',
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                }
            }
        },
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			/* uni.showToast({
				icon:'none',
				title: option.title,
				duration: 11600
			}); */
			/* let tempStr = option.title.replace('[$','?');
			tempStr.replace('$]','=') */
			this.url = this.url + option.title;
		}
    }
</script>

<style>
</style>
