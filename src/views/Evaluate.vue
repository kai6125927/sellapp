<template>
  <div class="evaluate">
    <div class="header">
      <div class="bgfff">
        <div class="headerLeft">
          <p style="color:#fa9e02;fontSize:16px">{{(list.score+list.serviceScore)/2}}</p>
          <p style="fontWeight:bold">综合评分</p>
          <p style="fontSize:10px;color:#9a9e9f">高于周边商家69.2%</p>
        </div>
        <div class="headerRight">
          <div>
            口味评分
            <Rate disabled show-text allow-half v-model="list.score">
              <span style="color: #f5a623">{{ list.score }}</span>
            </Rate>
          </div>
          <div>
            服务评分
            <Rate disabled show-text allow-half v-model="list.serviceScore">
              <span style="color: #f5a623">{{ list.serviceScore }}</span>
            </Rate>
          </div>
          <div>
            送达时间
            <span style="color:#9a9e9f;margin-left:5px">{{list.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
    </div>
    <div class="evaluateTab">
      <div class="tabTop">
        <div class="btnTab">
          <Button type="primary">全部</Button>
          <Button type="info">满意</Button>
          <Button style="background:#eaebed">不满意</Button>
        </div>
        <div class="radio">
          <Checkbox v-model="single">只看有内容的评价</Checkbox>
        </div>
      </div>
      <div class="tabContent">
        <div class="tabList" v-for="(item,i) in data" :key="i">
          <div class="tabContentLeft">
            <img :src="item.avatar" />
          </div>
          <div class="tabContentRight">
            <h3>
              <span>{{item.username}}</span>
              <span style="color: #d1d1d1;">{{item.rateTime}}</span>
            </h3>
            <div>
              <Rate disabled allow-half v-model="item.score"></Rate>
              <span style="marginLeft:10px;fontSize:12px;" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
            </div>
            <p>{{item.text}}</p>
            <div class="good">
              <span v-for="(v,index) in item.recommend" :key="index">{{v}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ratings } from "../api/apis";
import { seller } from "../api/apis";
export default {
  data() {
    return {
      list: {},
      data: {},
      single: false
    };
  },
  created() {
    seller().then(req => {
      this.list = req.data.data;
    });
    ratings().then(d => {
      this.data = d.data.data;
    });
  },
  methods:{
  }
};
</script>

<style lang="less">
.evaluate {
  background: #f4f5f7;
  height: 500px;
}
.header {
  background: #fff;
  margin-bottom: 20px;
  .bgfff {
    padding: 12px 0;
    display: flex;
    font-size: 12px;
    line-height: 20px;
    .headerLeft {
      padding: 0 12px;
      text-align: center;
      width: 35%;
      border-right: 1px solid #f4f5f7;
    }
    .headerRight {
      padding: 0 12px;
      font-weight: bold;
    }
  }
}
.evaluateTab {
  background: #fff;
  .tabTop {
    padding: 16px;
    border-bottom: 1px solid #d1d1d1;
    .btnTab {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #f4f5f7;
      button:nth-child(2) {
        margin: 0 16px;
      }
    }
    .radio {
      color: #d1d1d1;
      font-weight: bold;
      margin-left: 5px;
    }
  }
  .tabContent {
    padding: 20px;
    .tabList {
      display: flex;
      height: 140px;
      padding: 16px 0;
      border-bottom: 1px solid #f4f5f7;
      .tabContentLeft {
        width: 40px;
        img {
        border-radius: 50%;
          width: 30px;
          height: 30px;
        }
      }
      .tabContentRight{
        flex: 1;
        h3{
          display: flex;
          justify-content: space-between;
        }
        .ivu-rate-star{
          margin: 0;
          font-size: 16px;
        }
        .good{
          margin: 10px;
          span{
            border: 1px solid #dbdbdb;
            font-size: 10px;
            padding: 2px;
            margin: 5px;
          }
        }
      }
    }
  }
}
</style>