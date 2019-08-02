<template>
  <div class="about">
    <div class="about-content">
      <div class="about-img-title">
        <img src="../../static/images/logo.png" class="about-img"/>
      </div>
      <div class="about-text">广东腾业资产评估及土地房地产估价有限公司</div>
      <div class="about-info">
        公司简介：<br/>
        <p style="text-indent: 2em;margin-bottom: 20px">
         公司于2003年4月成立，注册资金402万，拥有壹级房地产评估资质、B级土地评估资质、资产评估资质。设有十多家分支机构，服务范围覆盖广州市及珠江三角洲地区。业务范围涵盖各银行、法院、财政、国资、国土、其他政府机关部门、房地产开发等领域；公司一直秉承“客观、公正”的专业宗旨和“高效率、热情周到”的服务精神，在客户中赢得了良好的声誉，在社会上树立了良好的口碑，成立至今从未受到主管部门和行业协会的处罚和不良通报，没有不良执业记录，未受到投诉。
        </p>
        联系电话：020-38473496<br/>
        E-mail: gdtypg@126.com
      </div>
      <div class="about-wx-code">
       <img src="../../static/images/wxnode.png" class="about-img-code"/>
        <div style="font-size: 13px">公司微信号</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<style lang="scss">
  page {
    height: 100%;
    width: 100%;
  }

  .about {
    overflow: hidden;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: #eeeeee;
    .about-content {
      padding: 0px;
      border: 8px solid #eeeeee;
      height: 100%;
      width: 100%;
      background-color: white;
      box-sizing: border-box;
      .about-img-title {
        width: 100%;
        height: 130px;
        display: flex;
        align-items: center;
        justify-content: center;
        .about-img {
          width: 38%;
          height: 80%;
        }
      }
    }
    .about-text {
      text-align: center;
      font-size: 13px;
      color: #0000ae;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .about-info {
      font-size: 13px;
      width: 326px;
      margin: 0 auto;
    }
    .about-wx-code {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-top:30px;
      .about-img-code {
        width: 100px;
        height: 100px;
      }
    }
  }
</style>
