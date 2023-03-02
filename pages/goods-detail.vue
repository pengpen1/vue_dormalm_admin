<template>
  <div class="detail">
    <div class="img-box">
      <img :src="bigImg" alt="大图" class="big-img" />
      <div class="small-img-wrap">
        <img
          :class="{ 'small-img': true, active: curr == index }"
          :src="item"
          alt
          v-for="(item, index) in detail.imgs"
          :key="index"
          @mouseenter="enter(item, index)"
        />
      </div>
    </div>
    <div class="info">
      <p class="title">{{ detail.title }}</p>
      <div class="color">
        <el-radio-group v-model="form.color" size="mini">
          <el-radio-button label="大份">大份</el-radio-button>
          <el-radio-button label="中份">中份</el-radio-button>
          <el-radio-button label="小份">小份</el-radio-button>
        </el-radio-group>
      </div>
      <div class="num">
        <el-input-number v-model="form.num" :min="1"></el-input-number>
        >
        <span class="price"
          ><span>¥</span>{{ (detail.price * form.num) || 88 }}</span
        >
      </div>
      <p class="tip">
        配 送 至 成都市东软学院老校区D2-4053 由
        <span>D2-3033小卖部</span> 负责发货, 并提供售后服务.
      </p>
      <div class="submit-btn" @click="onSubmit">加入购物车</div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>成功加入购物车！</span>
      <span slot="footer" class="dialog-footer">
        <nuxt-link to="/shop"
          ><el-button type="danger">继续购物</el-button></nuxt-link
        >
        <nuxt-link to="/cartLists"><el-button>去购物车</el-button></nuxt-link>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getGoodsetail } from '@/request/api/goods'
export default {
  async asyncData(context) {
    const { id } = context.query

    const [err, res] = await getGoodsetail({
      id,
    })
    if (!err) {
      return {
        id,
        detail: res.data.data,
        curr: 0,
        bigImg: res.data.data.img_url,
      }
    } else {
      return {
        id,
        detail: { imgs: [] },
      }
    }
  },
  data() {
    return {
      id: '',
      detail: { imgs: [] },
      bigImg: '',
      curr: 0,
      form: { color: '大份', num: 1 },
      dialogVisible: false,
    }
  },
  // async mounted() {
  // },
  methods: {
    enter(url, curr) {
      this.bigImg = url
      this.curr = curr
    },
    // 加入购物车
    async onSubmit() {
      this.dialogVisible = true
      // let res = await this.$axios.post('/users/addCart', {
      //   goodsId: this.id,
      //   num: this.form.num,
      //   color: this.form.color,
      // })
      // console.log(res)
      // if (res.status == 200) {
      //   // this.$message.success('加入购物车成功！');
      //   this.dialogVisible = true
      // } else {
      //   this.$message.error(res.msg)
      // }
    },
  },
}
</script>

<style lang="scss" scoped>
.detail {
  display: flex;
  justify-content: center;
  width: 800px;
  background: #fff;
  padding: 20px;
  margin: 0 auto;
  .img-box {
    width: 400px;
    .small-img-wrap{
      display: flex;
    }
    .big-img {
      display: block;
      width: 350px;
      height: 350px;
      object-fit: cover;
      margin: 0 auto;
    }
    .small-img {
      margin-left: 3px;
      width: 80px;
      height: 80px;
      object-fit: cover;
      cursor: pointer;
      &.active {
        border: 2px solid #d61a1a;
      }
    }
  }
  .info {
    margin-left: 20px;
    .title {
      font-size: 20px;
      color: #615f60;
    }
    .color,
    .num {
      margin-top: 20px;
    }
    .tip {
      margin-top: 20px;
      color: #a5a5a5;
      font-size: 12px;
      span {
        color: #d61a1a;
      }
    }
    .submit-btn {
      display: inline-block;
      cursor: pointer;
      color: #fff;
      text-align: center;
      font-size: 20px;
      font-weight: 600;
      background: #d61a1a;
      border-color: #d61a1a;
      opacity: 1;
      border-radius: 4px;
      &:hover,
      &:focus {
        background: #dd3d39;
        border-color: #dd3d39;
        color: #fff;
      }
      &:active {
        background: #bd2d2c;
        border-color: #bd2d2c;
        color: #fff;
      }

      font-size: 14px;
      width: 200px;
      height: 40px;
      line-height: 40px;
      margin-top: 50px;
    }
  }
}
</style>
