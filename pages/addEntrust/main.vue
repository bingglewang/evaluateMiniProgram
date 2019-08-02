<template>
	<view>
		<view class="ad_popError" v-if="popErrorMsg">{{popErrorMsg}}</view>
		<form>
			<view class="cu-form-group">
				<view class="title">报告类型<span style="color: red">*</span></view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'请选择'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">委托单位</view>
				<input placeholder="委托单位" name="input" v-model="weituodanwei" style="text-align: right;"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">委托类型<span style="color: red">*</span></view>
				<picker @change="PickerChange1" :value="index1" :range="picker1">
					<view class="picker">
						{{index1>-1?picker1[index1]:'请选择'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">项目名称<span style="color: red">*</span></view>
				<input placeholder="项目名称" name="input" v-model="projectName" style="text-align: right;"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">看房联系人及电话</view>
				<input placeholder="看房联系人及电话" name="input" v-model="peoplePhone" style="text-align: right;"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">委托评估公司<span style="color: red">*</span></view>
				<picker @change="PickerChange2" :value="index2" :range="picker2">
					<view class="picker">
						{{index2>-1?picker2[index2]:'请选择'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">业务员<span style="color: red">*</span></view>
				<picker @change="PickerChange3" :value="index3" :range="picker3">
					<view class="picker">
						{{index3>-1?picker3[index3]:'请选择'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">贷款银行</view>
				<input placeholder="贷款银行" name="input" v-model="bank" style="text-align: right;"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">业务类型<span style="color: red">*</span></view>
				<picker @change="PickerChange4" :value="index4" :range="picker4">
					<view class="picker">
						{{index4>-1?picker4[index4]:'请选择'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">备注</view>
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaBInput"></textarea>
			</view>
		</form>
		<button type="primary" size="default" @click="submit" style="background-color: #f4c153;border-radius: 100px;width: 70%;margin-top: 10px;margin-bottom: 10px;">保存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				popErrorMsg: '',
				index: 0,
				index1: 0,
				index2: 0,
				index3: 0,
				index4: 0,
				picker:  ['',''],
				picker1: ['',''],
				picker2: ['',''],
				picker3: ['',''],
				picker4: ['预评', '报告', '询价'],
				remark: '',
				bank: '',
				peoplePhone: '',
				projectName: '',
				weituodanwei: '',
				baoGaoType: '',
				weituoType: '',
				weituoCompany: '',
				yewuyuan: '',
				yewuType: 1
			};
		},
		methods: {
			initData(){
				this.projectName = '';
				this.weituodanwei = '';
				this.remark =  '';
				this.bank = '';
				this.peoplePhone = '';
			},
			ohShitfadeOut() {
				var fadeOutTimeout = setTimeout(() => {
					this.popErrorMsg = '';
					clearTimeout(fadeOutTimeout);
				}, 4000);
			},
			PickerChange(e) {
				this.index = e.detail.value
				this.baoGaoType = this.picker[this.index]
			},
			PickerChange1(e) {
				this.index1 = e.detail.value
				this.weituoType = this.picker1[this.index1]
			},
			async PickerChange2(e) {
				this.index2 = e.detail.value
				this.weituoCompany = this.picker2[this.index2]
				if (this.index2 > -1) {
					let resp = await this.$post1('param/getselectDataBy', this.picker2[this.index2]);
					this.picker3 = resp
				}

			},
			PickerChange3(e) {
				this.index3 = e.detail.value
				this.yewuyuan = this.picker3[this.index3]
			},
			PickerChange4(e) {
				this.index4 = e.detail.value
				this.yewuType = parseInt(this.index4) + 1
			},
			textareaBInput(e) {
				this.remark = e.detail.value
			},
			async submit() {
				if (this.baoGaoType == '' || this.weituoType == '' || this.projectName == '' || this.weituoCompany == '' || this.yewuyuan == '') {
					this.popErrorMsg = '请填写必要信息';
					this.ohShitfadeOut();
					return;
				}
				uni.showLoading({
					title: '保存中...',
				})
				let submitData = {
					reportType: this.baoGaoType,
					delegateType: this.weituoType,
					projectName: this.projectName,
					reportOrPreviews: this.yewuType,
					remark: this.remark,
					toUserName: wx.getStorageSync('userSession').token,
					fromUserName: wx.getStorageSync('userSession').token,
					salesman: this.yewuyuan,
					cklxr: this.peoplePhone,
					dkyh: this.bank,
					keepField2: this.weituodanwei,
					keepField1: this.weituoCompany
				}
				let resp1 = await this.$post1('webService/addEntrust', submitData);
				if(resp1.code - 200 == 0){
					// 隐藏加载框
					uni.hideLoading();
					uni.showToast({
					   title: '保存成功',
					   icon: 'success',
					   duration: 600
					 });
					 this.initData();
				}else{
					// 隐藏加载框
					uni.hideLoading();
					uni.showToast({
					   title: '保存失败',
					   icon: 'none',
					   duration: 600
					 });
				}
			}
		},
		async mounted() {
			let selectData = await this.$post1('param/getSelectData');
			this.picker = selectData.baojia
			this.picker1 = selectData.weituo
			this.picker2 = selectData.company
			this.weituoCompany = this.picker2[this.index2]
			if (this.index2 > -1) {
				let resp = await this.$post1('param/getselectDataBy', this.picker2[this.index2]);
				this.picker3 = resp
			}
			this.baoGaoType = this.picker[this.index];
			this.weituoType = this.picker1[this.index1];
			this.weituoCompany = this.picker2[this.index2];
			this.yewuyuan = this.picker3[this.index3];
		}
	}
</script>

<style lang="scss">
	.cu-form-group .title {
		min-width: calc(4em + 15px);
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
</style>
