<template>
  <div class="goods">
    <div class="goodsLeft">
      <ul class="content">
          <div :class="{bgfff:curIndex == i}" @click="checked(i)" v-for="(item,i) in list" :key="item.name">
        <div :class="{listLeft:true}">{{ item.name }}</div>
      </div>
      </ul>
    </div>
    <div class="goodsRight">
      <ul class="content">
          <div :id="index" v-for="(item,index) in list" :key="item.name">
        <h3>{{ item.name }}</h3>
        <div class="foodList" v-for="v in item.foods" :key="v.id">
          <img :src="v.icon" />
          <div>
            <h4>{{v.name}}</h4>
            <p>{{v.description}}</p>
            <p>
              月售{{v.sellCount}}份
              <span>好评率{{v.rating}}%</span>
            </p>
            <h5 style="fondWidth:bold">
              <span style="color:red;fontSize:18px">￥{{v.price}}</span>
              <span v-show="v.oldPrice !== ''">￥{{v.oldPrice}}</span>
            </h5>
          </div>
        </div>
      </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { goods } from "../api/apis";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      list: [],
      curIndex:0
    };
  },
  created() {
    goods().then(d => {
      this.list = d.data.data;
    });
  },
  mounted() {
    new BScroll(document.querySelector(".goodsLeft"),{
        click:true
    });
    this.goodsRight = new BScroll(document.querySelector(".goodsRight"));
  },
  methods:{
      checked(i){
          this.curIndex = i
          this.goodsRight.scrollToElement(document.getElementById(i),600)  
      }
  }
};
</script>

<style lang="less">
.goods {
  height: 500px;
  display: flex;
  .goodsLeft {
    width: 100px;
    background: #f4f5f7;
    overflow: scroll;
    .listLeft {
      height: 60px;
      margin: 0 10px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e0e1e3;
    }
    .bgfff{
        background: #fff;
    }
  }
  .goodsRight {
    overflow: scroll;
    flex: 1;
    h3 {
      border-left: 2px solid #dadde2;
      color: #91969a;
      padding: 5px 10px;
      background: #f4f5f7;
    }
    .foodList {
      margin: 0 15px;
      padding: 15px 0;
      display: flex;
      border-bottom: 1px solid #e0e1e3;
      img {
        width: 80px;
        height: 80px;
        margin-right: 10px;
      }
      p {
        color: #ccc;
        font-size: 12px;
        margin: 8px 0;
      }
    }
  }
}
</style>