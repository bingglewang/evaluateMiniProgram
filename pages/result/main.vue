<template>
  <div class="query-result">
    <div class="result-content">
      <div class="result-img-title">
        <img src="../../static/images/logo.png" class="result-img"/>
      </div>
      <div class="result-form">
        <div class="result-form-item">
          <div class="result-label">评估时间：</div>
          <div class="result-input">{{queryTime}}</div>
        </div>
        <div class="result-form-item">
          <div class="result-label">小区/地址：</div>
          <div class="result-input">{{detailAddress}}</div>
        </div>
       <!-- <div class="result-form-item">
          <div class="result-label">建成年份：</div>
          <div class="result-input">{{buildYear}}</div>
        </div> -->
      </div>
      <div class="result-form-input">
        <div class="result-input-item" v-if="ownStatus!=''">{{ownStatus}}</div>
        <div class="result-input-item">{{area}}</div>
        <div class="result-input-item" v-if="house_type!=''">{{house_type}}</div>
        <div class="result-input-item" v-if="floor!=''">{{floor}}</div>
        <div class="result-input-item" v-if="orientation!=''">{{orientation}}</div>
        <div class="result-input-item" v-if="degree_decoration!=''">{{degree_decoration}}</div>
        <div class="result-input-item" v-if="build_type!=''">{{build_type}}</div>
      </div>
      <div class="result">
        <div class="result-total-single">
          <span >总价</span>
          <div class="total">{{totalPrice}}</div>
          <span>万元</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        <div class="result-total-single">
          <span>单价</span>
          <div class="total">{{queryResult11}}</div>
          <span>元/平方米</span>
        </div>
      </div>
      <div class="result-bottom">以上结果仅供参考，具体以实际评估为准</div>
      <div class="bottom-button-group">
        <button class="bottom-button-item1" @click="toSuggestionPage" >意见反馈</button>
        <button class="bottom-button-item2" @click="toAboutPage">联系评估</button>
      </div>
    </div>
  </div>
</template>

<script>
    import {dateFormat} from '@/utils/index'
    export default {
      data(){
        return{
          queryTime:'',
          detailAddress:'',
          buildYear:'',
          area:'',
          house_type:'',
          floor:'',
          orientation:'',
          degree_decoration:'',
          build_type:'',
          ownStatus:'',
          queryResult11:'',
          totalPrice:''
        }
      },
      methods:{
        //获取缓存里面的数据
        getLocalStory(){
          let queryResult =  wx.getStorageSync('queryRecord');
            this.queryTime = dateFormat(new Date(queryResult.queryDate),'yyyy-MM-dd hh:mm:ss');
            this.detailAddress = queryResult.detailAddress;
            this.buildYear =queryResult.buildYear != ''?queryResult.buildYear+'年':' ';
            this.area =queryResult.area != '' ?queryResult.area+'m²':' ';
            this.house_type =queryResult.houseType;
            this.floor =queryResult.floor;
            this.orientation =queryResult.orientation;
            this.degree_decoration =queryResult.degreeDecoration;
            this.build_type =queryResult.buildType;
            this.ownStatus = queryResult.ownStatus;
            this.queryResult11 = queryResult.queryResult !=''?queryResult.queryResult:'0';
            this.totalPrice = ((parseFloat(this.queryResult11)*parseFloat(this.area))/10000).toFixed(0);
        },
        //关于公司页面
        toAboutPage(){
          const url = '../about/main';
          wx.navigateTo({ url });
        },
        //意见反馈页面
        toSuggestionPage(){
          const url = '../suggestion/main';
          wx.navigateTo({ url });
        }
      },
      mounted(){
        this.getLocalStory();
      }
    }
</script>

<style lang="scss">
  page{
    height: 100%;
    width: 100%;
  }
  .query-result{
    overflow: hidden;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    background-color:#eeeeee ;
    .result-content{
        padding: 0px;
        border: 8px solid #eeeeee;
        height: 100%;
        width: 100%;
        background-color: white;
        box-sizing: border-box;
      .result-img-title{
        width: 100%;
        height: 130px;
        display: flex;
        align-items: center;
        justify-content: center;
        .result-img{
          width: 38%;
         height: 80%;
        }
      }
      .result-form{
        width: 100%;
        height: 60px;
        .result-form-item{
          margin-left: 30px;
          font-size: 14px;
          height: 25px;
          line-height: 25px;
          color: #cfcfcf;
          .result-label{
            display: inline-block;
          }
          .result-input{
            display: inline-block;
          }
        }
      }
      .result-form-input{
        padding-left: 20px;
				margin-bottom: 10px;
       /* height: 100px; */
        .result-input-item{
          font-size: 13px;
          display: inline-block;
          margin-left: 10px;
          margin-bottom: 10px;
          padding: 5px 10px;
          border-radius: 6px;
          color: #888b92;
          background-color: #e7e7e7;
        }
      }
      .result{
        text-align: center;
        .result-total-single{
          margin-bottom: 10px;
					display: flex;
					padding-left: 30px;
          span{
            color: #888b92;
            margin: 0 5px;
            font-size: 15px;
          }
          .total{
            font-size: 13px;
            display: inline-block;
            padding: 5px 10px;
            border-radius: 6px;
            color: #f4c153;
            background-color: #e7e7e7;
            font-weight: bold;
            width: 60px;
          }
        }
      }
      .result-bottom{
        font-size: 13px;
        text-align: center;
        color: #cfcfcf;
      }
      .bottom-button-group{
        margin-top: 50px;
        .bottom-button-item1{
          display: inline-block;
          background-color: #f4c153;
          color: white;
          float: left;
          margin-left: 30px;
          font-size: 13px;
          padding: 0px 30px;
          border-radius: 6px;
        }
        .bottom-button-item2{
          display: inline-block;
          background-color: #f4c153;
          color: white;
          float: right;
          margin-right: 30px;
          font-size: 13px;
          border-radius: 6px;
          padding: 0px 30px;
        }
      }
    }
  }
</style>
