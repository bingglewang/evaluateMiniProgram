<template>
	<view class="record-page">
		<view class="ad_popError" v-if="popErrorMsg">{{popErrorMsg}}</view>
		<view class="search-box">
			<mSearch class="mSearch-input-box" :mode="2" button="inside" :placeholder="placeholder" @search="doSearch"
			 @confirm="doSearch" v-model="inputSearch"></mSearch>
		</view>
		<!-- <mSearch @search="search($event)" :placeholder="placeholder"></mSearch> -->
		<view class="bg-gradual-orange" style="text-align: center;margin-bottom: 10upx;">{{address}}</view>
		<view class="cu-timeline" v-for="(item,index) in recordList " :index="index" :key="index" :data-index="index">
			<view class="cu-time">{{item.tjsjDatetime}}</view>
			<view class="cu-item text-cyan cuIcon-evaluate_fill">
				<view class="content bg-cyan shadow-blur">
					{{item.userName}}，{{item.ztsmName}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	//引用mSearch组件，如不需要删除即可
	import mSearch from '@/components/mehaotian-search-revision/mehaotian-search-revision.vue';
	import {
		dateFormat
	} from '@/utils/index'
	export default {
		components: {
			mSearch
		},
		data() {
			return {
				popErrorMsg: '',
				placeholder: '请输入完整的单号或初评编号',
				address: '',
				inputSearch: '',
				recordList: [],
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.inputSearch = option.keycode;
			this.doSearch();
		},
		mounted() {
			/* this.initData(); */
		},
		onShow() {
			console.log("出现");
		},
		methods: {
			ohShitfadeOut() {
				var fadeOutTimeout = setTimeout(() => {
					this.popErrorMsg = '';
					clearTimeout(fadeOutTimeout);
				}, 1000);
			},
			doSearch() {
				//this.inputSearch = e;
				if (this.inputSearch.length - 7 >= 0) {
					this.initData();
				} else {
					if (this.inputSearch != '') {
						this.popErrorMsg = '请输入完整的单号或初评编号';
						this.ohShitfadeOut();
					}
				}
			},
			async initData() {
				// 显示顶部刷新图标
				wx.showNavigationBarLoading();
				console.log("下拉刷新")
				var that = this;
				let url = "webService/getZtsmList";
				let data = {
					keyword: this.inputSearch
				};
				let resp = await that.$post1(url, data);
				console.log(333, resp.data);
				this.recordList = resp.data;
				if(this.recordList == null || this.recordList == undefined  || this.recordList.length <= 0){
					that.address = '';
					uni.showToast({
						icon:'none',
						title: '暂时无法查询或该单号不存在',
						duration: 3000
					});
					// 隐藏导航栏加载框
					wx.hideNavigationBarLoading();
					return;
				}
				this.recordList.forEach((item, index) => {
					that.address = item.address
					item.tjsjDatetime = dateFormat(new Date(item.tjsjDatetime), 'MM-dd')
				})

				// 隐藏导航栏加载框
				wx.hideNavigationBarLoading();
			}
		},
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		width: 100%;
	}

	.ad_popError {
		width: 250px;
		background: #1f3112;
		color: #fff;
		/* height: 35px;*/
		line-height: 29px;
		font-size: 15px;
		text-align: center;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		z-index: 3;
	}

	.record-page {
		width: 100%;
		height: 100%;
		background: #f1f1f1;
	}

	view {
		display: block;
	}

	.search-box {
		width: 100%;
		background-color: rgb(242, 242, 242);
		padding: 15upx 2.5%;
		display: flex;
		justify-content: space-between;
	}

	.search-box .mSearch-input-box {
		width: 100%;
	}

	.search-box .input-box {
		width: 85%;
		flex-shrink: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.search-box .search-btn {
		width: 15%;
		margin: 0 0 0 2%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		font-size: 28upx;
		color: #fff;
		background: linear-gradient(to right, #ff9801, #ff570a);
		border-radius: 60upx;
	}

	.search-box .input-box>input {
		width: 100%;
		height: 60upx;
		font-size: 32upx;
		border: 0;
		border-radius: 60upx;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		padding: 0 3%;
		margin: 0;
		background-color: #ffffff;
	}

	.placeholder-class {
		color: #9e9e9e;
	}

	.search-keyword {
		width: 100%;
		background-color: rgb(242, 242, 242);
	}

	.keyword-list-box {
		height: calc(100vh - 110upx);
		padding-top: 10upx;
		border-radius: 20upx 20upx 0 0;
		background-color: #fff;
	}

	.keyword-entry-tap {
		background-color: #eee;
	}

	.keyword-entry {
		width: 94%;
		height: 80upx;
		margin: 0 3%;
		font-size: 30upx;
		color: #333;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: solid 1upx #e7e7e7;
	}

	.keyword-entry image {
		width: 60upx;
		height: 60upx;
	}

	.keyword-entry .keyword-text,
	.keyword-entry .keyword-img {
		height: 80upx;
		display: flex;
		align-items: center;
	}

	.keyword-entry .keyword-text {
		width: 90%;
	}

	.keyword-entry .keyword-img {
		width: 10%;
		justify-content: center;
	}

	.keyword-box {
		height: calc(100vh - 110upx);
		border-radius: 20upx 20upx 0 0;
		background-color: #fff;
	}

	.keyword-box .keyword-block {
		padding: 10upx 0;
	}

	.keyword-box .keyword-block .keyword-list-header {
		width: 94%;
		padding: 10upx 3%;
		font-size: 27upx;
		color: #333;
		display: flex;
		justify-content: space-between;
	}

	.keyword-box .keyword-block .keyword-list-header image {
		width: 40upx;
		height: 40upx;
	}

	.keyword-box .keyword-block .keyword {
		width: 94%;
		padding: 3px 3%;
		display: flex;
		flex-flow: wrap;
		justify-content: flex-start;
	}

	.keyword-box .keyword-block .hide-hot-tis {
		display: flex;
		justify-content: center;
		font-size: 28upx;
		color: #6b6b6b;
	}

	.keyword-box .keyword-block .keyword>view {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 60upx;
		padding: 0 20upx;
		margin: 10upx 20upx 10upx 0;
		height: 60upx;
		font-size: 28upx;
		background-color: rgb(242, 242, 242);
		color: #6b6b6b;
	}
</style>
