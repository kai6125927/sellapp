<template>
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
            <button type="button">{{length}}个 ></button>
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
    <router-view></router-view>
    <!-- 购物车 -->
    <div style="height:50px"></div>
    <div class="shopCar">
        <div class="shopCarLeft">
            <div class="carImg"><img src="../assets/imgs/car.png"></div>
            <span>￥0</span>
            <span>另需配送费￥4元</span>
        </div>
        <button type="button">￥20起送</button>
    </div>
  </div>
</template>

<script>
import { seller } from "../api/apis"
export default {
  data() {
    return {
      data: {},
      length: 0
    };
  },
  created() {
    seller().then(d => {
      this.data = d.data.data;
      this.length = d.data.data.supports.length;
      console.log(this.data);
    });
  }
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
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
    span:last-child{
        width: 10px;
    }
    img {
      height: 12px;
      margin-top: -3px;
      margin-right: 5px;
    }
  }
}
.routerLink{
    display: flex;
    justify-content: space-around;
    font-size: 16px;
    padding: 12px;
    border: 1px solid #e9e9e9;
}
.shopCar{
    color: #93999c;
    position: fixed;
    height: 50px;
    width: 100%;
    bottom: 0;
    background-color: #141c27;
    display: flex;
    justify-content: space-between;
    .shopCarLeft{
        display: flex;
        flex: 1;
        .carImg{
            width: 60px;
            margin-left: 20px;
            margin-top: -15px;
            background-color: #141c27;
            text-align: center;
            line-height: 60px;
            border-radius: 50%;
            img{
                width: 50px;
            }
        }
        span{
            font-size: 12px;
            margin-top: 18px;
        }
        span:first-of-type{
            margin-left: 10px;
            margin-right: 20px;
            font-size: 16px;
            font-weight: bold;
        }
    }
    button{
        width: 100px;
        color: #93999c;
        background: #2b343b;
    }
}
</style>