<template>
	<view class="container">
		<view class="ad_popError" v-if="popErrorMsg">{{popErrorMsg}}</view>
		<view class="cu-form-group" style="width: 100%;border-top: 1rpx solid #eee;border-bottom: 1rpx solid #eee">
			<view class="title" style="height: 92upx;line-height: 92upx;">
				<picker @change="bindPickerChange6" :value="index6" :range="array6">
					<view class="picker">
						{{index6 > -1 ? array6[index6]:'请选择'}}
					</view>
				</picker>
			</view>
			<picker @change="bindPickerChange5" :value="index5" :range="array5">
				<view class="picker">
					{{index5 > -1 ? array5[index5]:'请选择'}}
				</view>
			</picker>
		</view>
		<view class="form-item">
			<view class="item-label" style="margin-left: 30upx">小区/地址<span style="color: red">*</span></view>
			<view class="item-value">
				<input class="item-input" type="text" placeholder="小区/地址" style="margin-right:30px;width: 200px" @input="searchCell"
				 v-model="loupan" />
			</view>
		</view>
		<view v-if="isShowNotice" style="background: #f1f1f1;width:90%;position:absolute;height:360px;overflow:auto;z-index:999;margin-top:87px;padding-bottom:15px;border:2px solid #f1f1f1;
">
			<template v-for="(item,index) in cellList">
				<view class="cu-list menu-avatar" :key="index" style="margin-bottom: -14px;">
					<view class="cu-item" style="height: 50px;" @click="selectCell(item.name,item.district)">
						<view class="content" style="left: 24px;line-height:1.4em;">
							<view class="text-grey">{{item.name}}</view>
							<view class="text-gray text-sm flex">
								<text class="text-cut">
									<text class="margin-right-xs"></text>
									{{item.city}}{{item.district}}{{item.address}}
								</text> </view>
						</view>
					</view>
				</view>
			</template>
		</view>
		<view class="form-item">
			<view class="item-label" style="margin-left: 30upx">楼层<span style="color: red">*</span></view>
			<view class="item-value">
				<input class="item-input" type="number" placeholder="共几层" style="width: 50px;margin-right: 30px;" maxlength="2"
				 v-model="louceng1" />
				<view class="item-input" style="width: 10px;"></view>
				<view class="item-input" style="width: 20px">/</view>
				<input class="item-input" type="number" placeholder="第几层" style="width: 50px" maxlength="2" v-model="louceng2" />
			</view>
		</view>
		<view class="form-item">
			<view class="item-label" style="margin-left: 30upx">建筑面积<span style="color: red">*</span></view>
			<view class="item-value">
				<input class="item-input" type="digit" placeholder="建筑面积" style="margin-right:30px;width: 200px" maxlength="20"
				 v-model="mianji" />
			</view>
		</view>
		<view class="form-item" style="border-bottom: none">
			<view class="item-label"></view>
			<view class="item-value" style="padding-right: 10px;">
				<img v-if="isShowRequired" class="item-input" src="../../static/images/up.png" style="width:20px;height: 20px;margin-top: 11px" />
				<img v-else class="item-input" src="../../static/images/down.png" style="width:20px;height: 20px;margin-top: 11px" />
				<span class="item-input" style="width: 54px;color: #f4c153;" @click="changeRequired">选填项</span>
			</view>
		</view>
		<template v-if="isShowRequired">
			<view class="form-item">
				<view class="item-label" style="margin-left: 30upx">楼栋</view>
				<view class="item-value">
					<input class="item-input" type="text" placeholder="楼栋" style="margin-right:30px;width: 200px" maxlength="10"
					 v-model="loudong" />
				</view>
			</view>
			<view class="form-item">
				<view class="item-label" style="margin-left: 30upx">房号</view>
				<view class="item-value">
					<input class="item-input" type="number" placeholder="房号" style="margin-right:30px;width: 200px" maxlength="10"
					 v-model="fanghao" />
				</view>
			</view>
			<view class="form-item">
				<view class="item-label" style="margin-left: 30upx">户型</view>
				<view class="item-value">
					<input class="item-input" type="number" placeholder="几卫" style="margin-right:30px;" v-model="huxing1" maxlength="2" />
					<view class="item-input" style="width: 10px;"></view>
					<view class="item-input" style="width: 20px">/</view>
					<input class="item-input" type="number" placeholder="几厅" v-model="huxing2" maxlength="2" />
					<view class="item-input" style="width: 20px;">/</view>
					<input class="item-input" type="number" placeholder="几室" v-model="huxing3" maxlength="2" />
				</view>
			</view>
			<view class="cu-form-group" style="width: 100%;">
				<view class="title">朝向</view>
				<picker @change="bindPickerChange2" :value="index2" :range="array2">
					<view class="picker">
						{{index2 > -1 ? array2[index2]:'请选择'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group" style="width: 100%;">
				<view class="title">景观</view>
				<picker @change="bindPickerChange1" :value="index1" :range="array1">
					<view class="picker">
						{{index1 > -1 ? array1[index1]:'请选择'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group" style="width: 100%;border-bottom: 1rpx solid #eee">
				<view class="title">装修程度</view>
				<picker @change="bindPickerChange3" :value="index3" :range="array3">
					<view class="picker">
						{{index3 > -1 ? array3[index3]:'请选择'}}
					</view>
				</picker>
			</view>
			<view class="form-item">
				<view class="item-label" style="margin-left: 30upx">备注</view>
				<view class="item-value">
					<input class="item-input" type="text" placeholder="备注" style="margin-right:30px;width: 200px" maxlength="100"
					 v-model="beizhu" />
				</view>
			</view>
		</template>
		<button type="primary" size="default" :disabled="isDisable" class="save-button-evaluate" @click="toResultPage">在线评估</button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				isDisable: false,
				index1: -1,
				index2: -1,
				index3: -1,
				index4: -1,
				index5: 0,
				index6: 0,
				city: '广州',
				popErrorMsg: '',
				loupan: '', //楼盘
				loudong: '', //楼栋
				louceng1: '', //楼层
				louceng2: '',
				fanghao: '', //房号
				huxing1: '', //户型
				huxing2: '',
				huxing3: '',
				chaoxiang: '', //朝向
				mianji: '', //面积
				zhuangxiuchengdu: '', //装修程度
				waiqiangzhuanshi: '', //外墙装饰
				jianzhuniandai: '', //建筑年代
				distinct: '', //房产所属区域
				beizhu: '', //备注
				array1: ['一般', '景观房', '侧景观房', '差'],
				array2: ['南', '西南', '东南', '西北', '东北', '东', '西', '北', '东西', '南北'],
				array3: ['简装', '毛坯', '精装', '豪装'],
				array5: ['不限', '萝岗区', '南沙区', '从化区', '增城区', '天河区', '海珠区', '番禺区', '白云区', '花都区', '荔湾区', '越秀区', '黄埔区'],
				array51: ['不限', '萝岗区', '南沙区', '从化区', '增城区', '天河区', '海珠区', '番禺区', '白云区', '花都区', '荔湾区', '越秀区', '黄埔区'],
				array52: ['不限', '禅城区', '高明区', '南海区', '其他区', '三水区', '顺德区'],
				array53: ['不限', '恩平市', '鹤山市', '江海区', '开平市', '蓬江区', '其他区', '台山市', '新会区'],
				array54: ['不限', '板芙镇', '大涌镇', '东凤镇', '东区街道', '东升镇', '阜沙镇', '港口镇', '古镇镇', '横栏镇', '黄圃镇', '火炬开发区街道', '民众镇', '南朗镇',
					'南区街道', '南头镇', '三角镇', '三乡镇', '沙溪镇', '神湾镇', '石岐区街道', '坦洲镇', '五桂山街道', '西区街道', '小榄镇'
				],
				array55: ['不限', '佛冈县', '连南瑶族自治区', '连山壮族瑶族自治县', '连州市', '其他区', '清城区', '清新区', '阳山县', '英德市'],
				array56: ['不限', '潮安区', '其他区', '饶平县', '湘桥区'],
				array57: ['不限', '潮南区', '朝阳区', '澄海区', '濠江区', '金平区', '龙湖区', '南澳县', '其他区'],
				array4: this.generateArrayYear(),
				array6: ['广州市', '佛山市', '江门市', '中山市', '清远市', '潮州市', '汕头市'],
				isShowRequired: false,
				isShowNotice: false,
				cellList: []
			}
		},
		methods: {
			selectCell(cellName, district) {
				this.loupan = cellName
				this.distinct = district
				this.isShowNotice = false
			},
			changeRequired() {
				this.isShowRequired = !this.isShowRequired;
			},
			async searchCell() {
				if (this.loupan != '') {
					/* const url = '../cellsearch/main';
					wx.reLaunch({url}); */
					let url = "fj/cellSearch";
					let data = {
						city: this.city,
						keyword: this.loupan,
						district: this.distinct,
						token: wx.getStorageSync('fjSession').token
					}
					wx.showLoading({
						title: '搜索中',
					})
					let res1 = await this.$post1(url, data);
					if (res1.code == 200) {
						if (res1.result.length === 0) {
							this.isShowNotice = false
						} else {
							this.isShowNotice = true
							this.cellList = res1.result
						}
					}
					// 隐藏加载框
					wx.hideLoading();
				} else {
					this.isShowNotice = false
				}
			},
			ohShitfadeOut() {
				var fadeOutTimeout = setTimeout(() => {
					this.popErrorMsg = '';
					clearTimeout(fadeOutTimeout);
				}, 4000);
			},
			initData() {
				this.loupan = '';
				this.loudong = '';
				this.louceng1 = '';
				this.louceng2 = '';
				this.fanghao = '';
				this.huxing1 = '';
				this.huxing2 = '';
				this.huxing3 = '';
				this.chaoxiang = '';
				this.mianji = '';
				this.zhuangxiuchengdu = '';
				this.waiqiangzhuanshi = '';
				this.jianzhuniandai = '';
				this.beizhu = '';
				this.index1 = -1;
				this.index2 = -1;
				this.index3 = -1;
				this.index4 = -1;
				this.index5 = 0;
			},
			generateArrayYear() {
				let resultArray = [];
				let nowYear = new Date().getFullYear();
				for (let i = 1940; i <= nowYear; i++) {
					resultArray.push(i.toString());
				}
				return resultArray;
			},
			bindPickerChange1(e) {
				this.index1 = e.mp.detail.value;
				this.waiqiangzhuanshi = this.array1[this.index1];
			},
			bindPickerChange2(e) {
				this.index2 = e.mp.detail.value;
				this.chaoxiang = this.array2[this.index2];
			},
			bindPickerChange3(e) {
				this.index3 = e.mp.detail.value;
				this.zhuangxiuchengdu = this.array3[this.index3];
			},
			bindPickerChange4(e) {
				this.index4 = e.mp.detail.value;
				this.jianzhuniandai = this.array4[this.index4];
			},
			bindPickerChange5(e) {
				this.index5 = e.mp.detail.value;
				if (this.index5 == 0) {
					this.distinct = '';
				} else {
					this.distinct = this.array5[this.index5];
				}
			},
			bindPickerChange6(e) {
				this.index6 = e.mp.detail.value;
				this.city = this.array6[this.index6];
				this.index5 = 0
				this.distinct = '';
				if (this.index6 == 0) {
					this.array5 = this.array51
				} else if (this.index6 == 1) {
					this.array5 = this.array52
				} else if (this.index6 == 2) {
					this.array5 = this.array53
				} else if (this.index6 == 3) {
					this.array5 = this.array54
				} else if (this.index6 == 4) {
					this.array5 = this.array55
				} else if (this.index6 == 5) {
					this.array5 = this.array56
				} else if (this.index6 == 6) {
					this.array5 = this.array57
				}
			},
			async toResultPage() {

				if (parseInt(this.louceng2) > parseInt(this.louceng1)) {
					this.popErrorMsg = '总楼层需大于等于所在楼层';
					this.ohShitfadeOut();
					return;
				}
				// 显示加载图标
				let _this = this;
				if (this.loupan != '' && this.mianji != '' && this.louceng1 != '' && this.louceng2 != '') {
					wx.showLoading({
						title: '努力查询中',
					})
					_this.isDisable = true
					if (wx.getStorageSync('userSession').token == null || wx.getStorageSync('userSession').token == undefined) {
						//利用code从后台获取open_id和session_key
						wx.login({
							success: async function(reslogin) {
								if (reslogin.code) {
									let url = "api/wx/session";
									let data = {
										code: reslogin.code
									}
									let res1 = await _this.$post(url, data);
									wx.setStorageSync('userSession', res1)
								}
							}
						})
					}
					if (wx.getStorageSync('fjSession').token == null || wx.getStorageSync('fjSession').token == undefined) {
						let url2 = "fj/getToken";
						let res2 = await _this.$post(url2);
						wx.setStorageSync('fjSession', res2);
					}
					let queryRecord = {
						openId: wx.getStorageSync('userSession').token,
						detailAddress: this.loupan,
						ownStatus: this.loudong,
						floor: this.louceng1 != '' && this.louceng2 != '' ? this.louceng2 + '层/' + this.louceng1 + '层' : '',
						indoorStructure: this.fanghao,
						houseType: this.huxing1 != '' && this.huxing2 != '' && this.huxing3 != '' ? this.huxing3 + '室/' + this.huxing2 +
							'厅/' + this.huxing1 + '卫' : '',
						orientation: this.chaoxiang,
						area: this.mianji,
						degreeDecoration: this.zhuangxiuchengdu,
						buildType: this.waiqiangzhuanshi,
						buildYear: this.jianzhuniandai,
						back1: this.beizhu,
						queryDate: new Date(),
						back3: this.distinct,
						back4: this.city,
						back5: wx.getStorageSync('fjSession').token
					};
					let isUserPower = {
						openId: wx.getStorageSync('userSession').token
					}
					let userPowerResp = await this.$post1('admin/isUserQueryPower', isUserPower);
					if (userPowerResp.status == 0) {
						let respAddress = await this.$post1('fj/evaluate', queryRecord);
						if (respAddress.status == 0) {
							let builder_year = respAddress.builder_year;
							if (builder_year != '' && builder_year != null) {
								queryRecord.buildYear = builder_year.split(",")[0];
							}
							queryRecord.queryResult = parseFloat(respAddress.data).toFixed(0);
							/*let resp = await this.$post1('record/insertRecordByOpenid', queryRecord);*/
							queryRecord.id = respAddress.recordId;
							wx.setStorageSync('queryRecord', queryRecord);
							// 隐藏加载框
							wx.hideLoading();
							_this.isDisable = false
							//查询结果页面
							this.initData();
							const url = '../result/main';
							wx.navigateTo({
								url
							});
						} else {
							// 隐藏加载框
							wx.hideLoading();
							_this.isDisable = false
							/* wx.showToast({
							   title: respAddress.msg,
							   icon: 'none',
							   duration: 600
							 });*/
							this.popErrorMsg = respAddress.msg;
							this.ohShitfadeOut();
						}
					} else {
						// 隐藏加载框
						wx.hideLoading();
						_this.isDisable = false
						this.popErrorMsg = userPowerResp.msg;
						this.ohShitfadeOut();
						/* wx.showToast({
						   title: userPowerResp.msg,
						   icon: 'none',
						   duration: 600
						 });*/
					}
				} else {
					// 隐藏加载框
					wx.hideLoading();
					_this.isDisable = false
					this.popErrorMsg = '请填写必要信息';
					this.ohShitfadeOut();
				}
			}
		},
		// 页面分享
		onShareAppMessage: function() {
			return {
				title: '在线评估',
				desc: '一键评估，智能评估',
				path: '/pages/evaluate/main'
			}
		},
		created() {},
		mounted() {
			this.initData();
		}
	}
</script>

<style lang="scss">
	button[disabled][type=primary] {
		background-color: #f4c153;
	}


	.container {
		padding: 0;
		width: 100%;

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

		.save-button-evaluate {
			border-radius: 100px;
			width: 70%;
			margin-left: 10px;
			margin-right: 10px;
			background-color: #f4c153;
			margin-top: 10px;
			margin-bottom: 10px;
		}

		.form-item {
			height: 90upx;
			width: 100%;
			/* display: flex;
       align-items: center;*/
			border-bottom: 1rpx solid #eee;

			.item-label {
				text-align: justify;
				padding-right: 30upx;
				font-size: 30upx;
				position: relative;
				height: 60upx;
				line-height: 60upx;
				width: 25%;
				font-size: 14px;
				/* font-family: "Microsoft YaHei UI"; */
				margin-left: 30px;
				float: left;
				height: 42px;
				line-height: 42px;
			}

			.item-value {
				/*margin-right: 20px;*/
				width: 60%;
				height: 42px;
				float: right;
				text-align: right;

				.item-input {
					line-height: 42px;
					height: 42px;
					width: 40px;
					font-size: 14px;
					float: right;
					/* text-align: right;*/
					font-family: "Microsoft YaHei UI";
				}
			}
		}
	}
</style>
