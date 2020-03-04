<template>
  <div class="merchant">
    <div class="merchantHeader">
      <div class="top">
        <div style="flex:1">
          <h3>{{data.name}}</h3>
          <div class="star">
            <Rate disabled show-text allow-half :value="(data.ratingCount/data.sellCount*5)">
              <span style="color: #f5a623">({{ data.ratingCount }})</span>
            </Rate>
            <span class="sellCount">月售{{data.sellCount}}单</span>
          </div>
        </div>
        <div @click="colorRed" id="color" style="color:#ccc">
          <Icon style="fontSize:26px;" type="md-heart" />
          <p id="store" style="margin-top:5px">收藏</p>
        </div>
      </div>
      <div class="bottom">
        <div class="bottomList">
          <p>起送价</p>
          <div>{{data.minPrice}}<span>元</span></div>
        </div>
        <div class="bottomList">
          <p>商家配送</p>
          <div>{{data.deliveryPrice}}<span>元</span></div>
        </div>
        <div class="bottomList">
          <p>平均配送时间</p>
          <div>{{data.deliveryTime}}<span>分钟</span></div>
        </div>
      </div>
    </div>
    <div class="notice">
      <div class="noticeTop">
        <h3>公告与活动</h3>
        <p>{{data.bulletin}}</p>
      </div>
      <div class="noticeBottom" v-for="item in data.supports" :key="item.type">
        <img :src="img(item.type)" />
        {{item.description}}
      </div>
    </div>
    <div class="scene">
      <h3>商家实景</h3>
      <div class="sceneImg">
        <img v-for="(item,index) in data.pics" :key="index" :src="item" />
      </div>
    </div>
    <div class="information">
      <h3>商家信息</h3>
      <div class="infos" v-for="(item,index) in data.infos" :key="index">{{ item }}</div>
    </div>
  </div>
</template>

<script>
import { seller } from "../api/apis";
export default {
  data() {
    return {
      data: {}
    };
  },
  created() {
    seller().then(d => {
      this.data = d.data.data;
      console.log(this.data);
    });
  },
  methods: {
    img(i) {
      return require("../assets/imgs/merchant" + i + ".png");
    },
    colorRed() {
      var c = document.getElementById("color");
      var store = document.getElementById("store");
      if (c.style.color == "rgb(240, 20, 20)") {
        c.style.color = "#ccc";
        store.innerHTML = "收藏";
      } else {
        c.style.color = "rgb(240, 20, 20)";
        store.innerHTML = "已收藏";
      }
    }
  }
};
</script>

<style lang="less">
.merchant {
  height: 100%;
  overflow: scroll;
  background: #f4f5f7;
  h3 {
    font-weight: bold;
    font-size: 16px;
  }
  .merchantHeader {
    background: #fff;
    padding: 15px;
    .top {
      display: flex;
      .star {
        display: flex;
        margin-top: 10px;
        .ivu-rate-star {
          margin-right: 0px !important;
        }
        .ivu-rate-text {
          margin-top: -5px;
          margin-left: 0;
        }
        .sellCount {
          margin-left: 10px;
          position: relative;
          top: 4px;
        }
      }
      #color {
        width: 50px;
        text-align: center;
      }
    }
    .bottom {
      display: flex;
      margin-top: 15px;
      padding: 15px 0;
      border-top: 1px solid #f4f5f7;
      .bottomList:nth-child(2){
          border-left: 1px solid #f4f5f7;
          border-right: 1px solid #f4f5f7;
      }
      .bottomList {
        width: 33%;
        text-align: center;
        p {
          font-size: 12px;
          color: #ccc;
        }
        div {
            font-size: 30px;
          span {
            font-size: 12px;
          }
        }
      }
    }
  }
  .notice {
    border-top: 1px solid #e7e8ea;
    border-bottom: 1px solid #e7e8ea;
    background: #fff;
    margin-top: 20px;
    padding: 15px;
    .noticeTop {
      p {
        color: #e0384e;
        padding: 10px;
        line-height: 24px;
        margin-bottom: 20px;
      }
    }
    .noticeBottom {
      padding: 20px;
      border-top: 1px solid #f4f5f7;
      img {
        width: 18px;
        margin-top: -3px;
      }
    }
  }
  .scene {
    border-top: 1px solid #e7e8ea;
    border-bottom: 1px solid #e7e8ea;
    margin-top: 20px;
    background: #fff;
    padding: 15px;
    .sceneImg {
      margin-top: 15px;
      display: flex;
      overflow: scroll;
      img {
        width: 100px;
        height: 70px;
        margin-right: 10px;
      }
    }
  }
  .information {
    background: #fff;
    padding: 15px;
    margin-top: 20px;
    border-top: 1px solid #e7e8ea;
    border-bottom: 1px solid #e7e8ea;
    h3 {
      margin-bottom: 15px;
    }
    .infos {
      padding: 20px;
      border-top: 1px solid #f4f5f7;
    }
  }
}
</style>