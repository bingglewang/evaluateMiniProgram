<template>
	<view class="record-page">
		<view class="search-box1">
			<mSearch style="width: 100%;" class="mSearch-input-box" :mode="2" button="inside" :placeholder="placeholder" @search="onSearchConfirm"  @confirm="onSearchConfirm" v-model="inputSearch"></mSearch>
		</view>
		<!-- <mp-search @confirm="onSearchConfirm" @change="onSearchChange" placeholder="输入小区名/地址" v-model="inputSearch" /> -->
		<view class="content-container">
			<view class="content-list-card" v-for="(item,index) in recordList " :index="index" :key="index" :data-index="index"
			 @click="toResultPage(item.id)">
				<view class="content-top">
					<view class="index">
						{{index+1}}
					</view>
					<view class="name hidden-label-text">
						{{item.detailAddress}}
					</view>
				</view>
				<view class="content-middle">
					<view style="margin-top:10px">
						<view class="state" v-if="item.area">{{item.area}}平方米</view>
						<view class="state" v-if="item.queryResult">{{item.back5}}万</view>
						<view class="state" v-if="item.floor">{{item.floor}}</view>
						<view class="state" v-if="item.houseType">{{item.houseType}}</view>
						<view class="state" v-if="item.orientation">{{item.orientation}}</view>
					</view>
				</view>
				<view class="content-bottom">{{item.queryDate}}</view>
				<view style="background: #f1f1f1;height: 10px;width: 100%;"> </view>
			</view>
		</view>
	</view>
</template>

<script>
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
				placeholder: '输入小区名/地址',
				inputSearch: '',
				currentPage: 1,
				recordList: [],
				isMore: '1'
			}
		},
		mounted() {
			this.initData();
		},
		onShow() {
			console.log("出现");
			this.inputSearch = '';
		},
		methods: {
			//历史记录页面
			toResultPage(id) {
				console.log(111, id);
				const url = '../history/main?id=' + id;
				wx.navigateTo({
					url
				});
			},
			onSearchConfirm(val) {
				console.log(2222,val)
				console.log(1111, this.inputSearch)
				this.initData();
			},
		/* 	onSearchChange(val) {
				key = key ? key : this.keyword ? this.keyword : '';
				console.log(3232, val)
				this.inputSearch = val;
				this.initData();
			}, */
			async initData() {
				// 显示顶部刷新图标
				wx.showNavigationBarLoading();
				console.log("下拉刷新")
				var that = this;
				let url = "record/getRecordByPage";
				let data = {
					currentPage: 1,
					address: this.inputSearch,
					openId: wx.getStorageSync('userSession').token,
				};
				let resp = await that.$post1(url, data);
				this.isMore = resp.isMore;
				this.recordList = resp.items;
				this.recordList.forEach((item, index) => {
					item.queryDate = dateFormat(new Date(item.queryDate), 'yyyy-MM-dd hh:mm:ss')
				})
				console.log(333, resp);
				// 隐藏导航栏加载框
				wx.hideNavigationBarLoading();
			}
		},
		// 下拉刷新
		onPullDownRefresh: async function() {
			// 显示顶部刷新图标
			wx.showNavigationBarLoading();
			console.log("下拉刷新")
			var that = this;
			let url = "record/getRecordByPage";
			let data = {
				currentPage: 1,
				address: this.inputSearch,
				openId: wx.getStorageSync('userSession').token,
			};
			let resp = await that.$post1(url, data);
			this.isMore = resp.isMore;
			this.recordList = resp.items;
			this.recordList.forEach((item, index) => {
				item.queryDate = dateFormat(new Date(item.queryDate), 'yyyy-MM-dd hh:mm:ss')
			})
			console.log(333, resp);
			// 隐藏导航栏加载框
			wx.hideNavigationBarLoading();
			// 停止下拉动作
			wx.stopPullDownRefresh();
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: async function() {
			var that = this;
			if (this.isMore - 1 == 0) {
				console.log("到达底部上拉加载更多")
				// 显示加载图标
				wx.showLoading({
					title: '玩命加载中',
				})
				that.currentPage = that.currentPage + 1;
				let url = "/record/getRecordByPage";
				let data = {
					currentPage: that.currentPage,
					address: this.inputSearch,
					openId: wx.getStorageSync('userSession').token,
				};
				let resp = await that.$post1(url, data);
				this.isMore = resp.isMore;
				this.recordList = this.recordList.concat(resp.items);
				this.recordList.forEach((item, index) => {
					item.queryDate = dateFormat(new Date(item.queryDate), 'yyyy-MM-dd hh:mm:ss')
				})
				console.log(4444, resp);
				// 隐藏加载框
				wx.hideLoading();
			} else {
				wx.showToast({
					title: '没有更多数据了',
					icon: 'none',
					duration: 600
				});
			}
		},

	}
</script>

<style lang="scss">
	page {
		height: 100%;
		width: 100%;
	}

	.record-page {
		width: 100%;
		height: 100%;
		background: #f1f1f1;
	}

	.search-box1 {
			width: 100%;
			background-color: rgb(242, 242, 242);
			padding: 15upx 2.5%;
			display: flex;
			justify-content: space-between;
		}


	.content-container {
		width: 100%;
		height: calc(100% - 50px);
	}

	.content-title {
		width: 100%;
		height: 50px;
		border-bottom: 1px solid #e7e7e7;
		display: flex;
		align-items: center;
		margin-left: 10px;
		color: #95989f;
	}

	.content-list-card {
		width: 100%;
		height: 155px;
		box-sizing: border-box;
		background: white;
		border-bottom: 1px solid #e7e7e7;
		}

		.content-top {
			width: 100%;
			height: 30px;
			margin-left: 10px;
			line-height: 30px;
			border-bottom: 2px solid ghostwhite;
			font-size: 13px;

			.index {
				float: left;
				width: 20px;
				height: 20px;
				margin-top: 5px;
				border-radius: 10px;
				color: #fff;
				background-color: #f4c153;
				text-align: center;
				line-height: 20px;
			}

			.name {
				float: left;
				margin-left: 5px;
				margin-top: 6px;
				height: 20px;
				line-height: 20px;
				color: #f4c153;
			}

			.hidden-label-text {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				width: calc(100% - 50px);
			}
		}

		.content-middle {
			width: 100%;
			height: 80px;
			box-sizing: border-box;

			.state {
				padding: 5px 10px;
				text-align: center;
				border-radius: 6px;
				color: #656565;
				margin-left: 10px;
				background-color: #e7e7e7;
				display: inline-block;
				font-size: 13px;
				margin-bottom: 8px;
			}
		}

		.content-bottom {
			width: 100%;
			height: 30px;
			margin-left: 10px;
			color: #cfcfcf;
			line-height: 30px;
			border-top: 2px solid ghostwhite;
			font-size: 13px;
		}
	
</style>
