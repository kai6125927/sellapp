<template>
  <div class="goods">
    <div class="goodsLeft">
      <ul class="content">
        <div
          :class="{bgfff:curIndex == i}"
          @click="checked(i)"
          v-for="(item,i) in goodslist"
          :key="item.name"
        >
          <div class="listLeft">
            <span><img :src="img(item.type)"/>{{ item.name }}</span>
          </div>
        </div>
      </ul>
    </div>
    <div class="goodsRight">
      <ul class="content">
        <div :id="index" v-for="(item,index) in goodslist" :key="item.name">
          <h3>{{ item.name }}</h3>
          <div class="foodList" v-for="(v,i) in item.foods" :key="i">
            <img :src="v.icon" />
            <div class="foodListLeft">
              <h4>{{v.name}}</h4>
              <p>{{v.description}}</p>
              <p>
                月售{{v.sellCount}}份
                <span>好评率{{v.rating}}%</span>
              </p>
              <h5 style="fondWidth:bold">
                <span style="color:red;fontSize:18px">￥{{v.price}}</span>
                <span style="margin-left:5px" v-show="v.oldPrice !== ''"><del>￥{{v.oldPrice}}</del></span>
              </h5>
              <div class="num">
                <button v-show="v.num>=1" @click="numchange(v.name,-1)">-</button>
                <span v-show="v.num>=1">{{v.num}}</span>
                <button @click="numchange(v.name,1)">+</button>
              </div>
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
      curIndex: 0,
    };
  },
  computed: {
    getMath() {
      let arr=[];
      let total = 0
      for (let i = 0; i < this.goodslist.length; i++) {
        var curHeight = document.getElementById(i).offsetHeight;
        arr.push({min:total,max:total + curHeight,index:i})
        total+=curHeight
      }
      return arr
    },
    goodslist(){
      return this.$store.state.goodslist
    },
  },
  created() {
    goods().then(d => {
      this.$store.commit("initGoodsList",d.data.data)
    });
  },
  mounted() {
    new BScroll(document.querySelector(".goodsLeft"), {
      click: true
    });
    this.goodsRight = new BScroll(document.querySelector(".goodsRight"), {
      probeType: 3
    });
    this.goodsRight.on("scroll", obj => {
      let _y = Math.abs(obj.y);
      for(let obj of this.getMath){
        if(_y>=obj.min &&_y<obj.max){
          this.curIndex = obj.index
          return 
        }
      }
    });
  },
  methods: {
    checked(i) {
      this.curIndex = i;
      this.goodsRight.scrollToElement(document.getElementById(i), 600);
    },
    img(i) {
      if(i !== -1){
        return require("../assets/imgs/merchant" + i + ".png");
      }
    },
    numchange(name,num){
        this.$store.commit('changeGoodsNum',{name,num})
    }
  },
};
</script>

<style lang="less">
.goods {
  display: flex;
  flex: 1;
  .goodsLeft {
    width: 100px;
    background: #f4f5f7;
    overflow: scroll;
    border-right: 1px solid #f4f5f7;
    .listLeft {
      height: 60px;
      margin: 0 10px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e0e1e3;
      img{
        width: 16px;
        margin-top: -3px;
      }
    }
    .bgfff {
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
      .foodListLeft{
        p {
          color: #ccc;
          font-size: 12px;
          margin: 8px 0;
        }
          .num{
            display: flex;
            position: relative;
            width: 50px;
            top: -12px;
            right: -100px;
            justify-content: flex-end;
            span{
              margin: 0 6px;
            }
            button{
              border: 1px solid #01a0dd;
              width: 15px;
              height: 15px;
              border-radius: 50%;
            }
            button:first-of-type{
              color: #01a0dd;
              background: #fff;
            }
            button:last-of-type{
              color: #fff;
              background: #01a0dd;
            }
          }
      }
    }
  }
}
</style>