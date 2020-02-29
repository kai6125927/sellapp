<template>
  <div class="notice">
    <h3>{{data.name}}</h3>
    <p><img src="" alt=""></p>
    <Divider>优惠信息</Divider>
    <div v-for="v in data.supports" :key="v.id">
        {{ v.description }}
    </div>
    <Divider>商家公告</Divider>
    <p>{{data.bulletin}}</p>
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
  }
};
</script>

<style lang="less">
.notice {
  padding: 30px;
  line-height: 30px;
  background: #374049;
  height: 100%;
  color: #fff;
  font-weight: 200;
  h3{
      text-align: center;
      font-size: 18px;
      font-weight: bold;
  }
  .ivu-divider-inner-text {
    color: #fff;
      font-weight: bold;
  }
}
</style>