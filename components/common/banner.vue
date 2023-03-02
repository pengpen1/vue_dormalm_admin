<template>
  <div class="banner">
    <el-carousel :interval="4000" type="card" height="255px">
      <el-carousel-item v-for="item in lists" :key="item._id">
        <h3 class="medium">
          <a href="https://finget.github.io" target="_bank">
            <img :src="item.img_url" alt="" class="carousel-img">
          </a>
        </h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lists: [{
        img_url:require('~/assets/img/food_1.jpg'),
      },{
        img_url:require('~/assets/img/food_2.png'),
      },{
        img_url:require('~/assets/img/food_3.jpg'),
      },{
        img_url:require('~/assets/img/food_4.png'),
      },{
        img_url:require('~/assets/img/dayinji.jpg'),
      },]
    }
  },
  mounted() {
    // this.getBanners()
  },
  methods: {
    async getBanners() {
      const {data} = await this.$axios.get("/banner/lists")
      this.lists = data;
    }
  }
};
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  img {
    width: 100%;
  }
  .carousel-img{
    width: 761px;
    height: 255px;
    object-fit: cover;
  }
}
</style>
