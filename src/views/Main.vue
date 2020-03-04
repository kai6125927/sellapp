<template>
  <div style="height:100%">
    <div id="main">
      <!-- 头部 -->
      <div class="header">
        <div class="headerTop">
          <div>
            <img class="avatarImg" :src="data.avatar" />
          </div>
          <div class="headerRight">
            <h3>
              <img src="../assets/imgs/brand@2x.png" />
              {{data.name}}
            </h3>
            <p>{{data.description}}/{{data.deliveryTime}}分钟送达</p>
            <p>
              <span>
                <img src="../assets/imgs/decrease_2@2x.png" />
                {{data.supports?data.supports[0].description:""}}
              </span>
              <button @click="noticeShow" type="button">{{length}}个 ></button>
            </p>
          </div>
        </div>
        <div class="headerBottom">
          <span>
            <img src="../assets/imgs/bulletin@2x.png" />
            {{data.bulletin}}
          </span>
          <span>></span>
        </div>
      </div>
      <!-- 路由 -->
      <div class="routerLink">
        <router-link to="goods">商品</router-link>
        <router-link to="evaluate">评价</router-link>
        <router-link to="merchant">商家</router-link>
      </div>
      <div class="routerContent">
        <router-view></router-view>
      </div>
      <!-- 购物车 -->
      <div v-show="shopCarShow" class="shopCarBoard">
        <h3>我的购物车</h3>
        <p>
          <button @click="empty">
            <Icon type="ios-trash" />清空购物车
          </button>
        </p>
        <div v-for="item in getGoods" :key="item.name">
            <div class="shopfoods" v-show="(item.num == ''?false:true)">
              <div>{{item.name}}</div>
              <div class="shopfoodsRight">
                <div style="color:red;marginRight:20px">￥{{item.price*item.num}}</div>
                <div v-show="item.num>=1" class="num">
                  <button @click="numchange(item.name,-1)">-</button>
                  <span>{{item.num}}</span>
                  <button @click="numchange(item.name,1)">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="height:50px"></div>
      <div @click="shopCarShow = !shopCarShow" class="shopCar">
        <div class="shopCarLeft">
          <Badge class="carImg" :count="getSum">
            <div>
              <img src="../assets/imgs/car.png" />
            </div>
          </Badge>
          <span>￥{{getPrice}}</span>
          <span>另需配送费￥4元</span>
        </div>
        <button type="button">￥20起送</button>
      </div>
    </div>
    <div id="notice">
      <h3>{{data.name}}</h3>
      <div style="textAlign:center">
        <Rate disabled allow-half :value="(data.ratingCount/data.sellCount*5)"></Rate>
      </div>
      <Divider>优惠信息</Divider>
      <div v-for="(v,i) in data.supports" :key="i">
        <img :src="img(v.type)" />
        {{ v.description }}
      </div>
      <Divider>商家公告</Divider>
      <p>{{data.bulletin}}</p>
      <button class="btn" @click="noticeHide">X</button>
    </div>
  </div>
</template>

<script>
import { seller } from "../api/apis";
export default {
  data() {
    return {
      data: {},
      length: 0,
      shopCarShow: false
    };
  },
  created() {
    this.$router.push("/goods");
    seller().then(d => {
      this.data = d.data.data;
      this.length = d.data.data.supports.length;
    });
  },
  methods: {
    noticeShow() {
      var notice = document.getElementById("notice");
      var main = document.getElementById("main");
      notice.style.display = "block";
      main.style.filter = "blur(2px)";
    },
    noticeHide() {
      var notice = document.getElementById("notice");
      var main = document.getElementById("main");
      notice.style.display = "none";
      main.style.filter = "";
    },
    img(i) {
      return require("../assets/imgs/merchant" + i + ".png");
    },
    numchange(name, num) {
      this.$store.commit("changeGoodsNum",{name,num})
    },
    empty() {
      console.log(111)
      }
  },
  computed: {
    goodslist(){
      return this.$store.state.goodslist
    },
    getGoods(){
      return this.$store.getters.getGoods
    },
    getPrice(){
      let total = 0;
      for(let v of this.$store.getters.getGoods){
        total += v.num * v.price
      }
      return total
    },
    getSum(){
      let sum =0;
      for(let v of this.$store.getters.getGoods){
        sum += v.num
      }
      return sum
    }
  },
};
</script>

<style lang="less">
#main {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.header {
  width: 100%;
  height: 133px;
  background: url("../assets/imgs/01.jpg");
  color: #fff;
  .headerTop {
    display: flex;
    padding: 20px;
    padding-bottom: 10px;
    .avatarImg {
      width: 70px;
    }
    .headerRight {
      margin-left: 20px;
      width: 100%;
      h3 {
        font-size: 16px;
        img {
          width: 30px;
          height: 16px;
          margin-right: 5px;
          margin-top: -5px;
        }
      }
      p:first-of-type {
        margin: 10px 0;
      }
      p:last-of-type {
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        line-height: 25px;
        img {
          margin-right: 4px;
          margin-top: -2px;
          width: 12px;
        }
        button {
          color: #fff;
          border-radius: 30px;
          background: rgba(0, 0, 0, 0.363);
          width: 50px;
          height: 25px;
        }
      }
    }
  }
  .headerBottom {
    background: rgba(0, 0, 0, 0.26);
    font-size: 12px;
    padding: 8px 20px;
    display: flex;
    span:first-child {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    span:last-child {
      width: 10px;
    }
    img {
      height: 12px;
      margin-top: -3px;
      margin-right: 5px;
    }
  }
}
.routerLink {
  display: flex;
  justify-content: space-around;
  font-size: 16px;
  padding: 12px;
  border: 1px solid #e9e9e9;
}
.colorBlue {
  color: skyblue;
}
.routerContent {
  display: flex;
  flex: 1;
  overflow: hidden;
}
.shopCarBoard {
  position: fixed;
  height: 200px;
  width: 100%;
  bottom: 50px;
  background: #fff;
  overflow: scroll;
  h3 {
    text-align: center;
    background: #ccc;
    font-size: 18px;
    padding: 5px;
  }
  p {
    background: #f4f5f7;
    display: flex;
    padding: 5px;
    justify-content: flex-end;
    button {
      background: #f4f5f7;
    }
  }
  .shopfoods {
    padding: 20px;
    font-size: 18px;
    border-bottom: 1px solid #f4f5f7;
    display: flex;
    justify-content: space-between;
    .shopfoodsRight {
      display: flex;
      justify-content: space-between;
      .num {
        display: flex;
        justify-content: flex-end;
        span {
          margin: 0 6px;
        }
        button {
          border: 1px solid #01a0dd;
          width: 18px;
          height: 18px;
          border-radius: 50%;
        }
        button:first-of-type {
          color: #01a0dd;
          background: #fff;
        }
        button:last-of-type {
          color: #fff;
          background: #01a0dd;
        }
      }
    }
  }
}
.shopCar {
  color: #93999c;
  position: fixed;
  height: 50px;
  width: 100%;
  bottom: 0;
  background-color: #141c27;
  display: flex;
  justify-content: space-between;
  .shopCarLeft {
    display: flex;
    flex: 1;
    .carImg {
      width: 60px;
      margin-left: 20px !important;
      margin-top: -15px;
      background-color: #141c27;
      text-align: center;
      line-height: 60px;
      border-radius: 50%;
      .ivu-badge-count{
         position: absolute;
      top:0px;
      right: 10px;
      }
      img {
        width: 50px;
      }
    }
    span {
      font-size: 12px;
      margin-top: 18px;
    }
    span:first-of-type {
      margin-left: 10px;
      margin-right: 20px;
      font-size: 16px;
      font-weight: bold;
    }
  }
  button {
    width: 100px;
    color: #93999c;
    background: #2b343b;
  }
}
#notice {
  padding: 30px;
  line-height: 30px;
  background: #1e2831ea;
  height: 100%;
  color: #fff;
  font-weight: 200;
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  h3 {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }
  .ivu-divider-inner-text {
    color: #fff;
    font-weight: bold;
  }
  .btn {
    display: block;
    margin: 20px auto;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 30px;
  }
}
</style>