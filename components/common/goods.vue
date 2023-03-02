<template>
  <div class="goods">
    <div class="img">
      <img :src="data.img_url" alt="图片" />
    </div>
    <p class="title">{{ data.title }}</p>
    <p class="price"><span>¥</span>{{ data.price || '999' }}</p>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
}
</script>

<style lang="scss" scoped>
.goods {
  margin-top: 20px;
  width: 230px;
  height: 322px;
  background: #fff;
  border-radius: 3px;
  cursor: pointer;
  box-shadow: 1px 1px 3px #a5a5a5;
  transition: all 500ms;
  &:hover {
    box-shadow: 0px 0px 3px #a5a5a5;
    transform: translateY(-10px);
  }
  .img {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      display: block;
      width: 140px;
    }
  }
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    padding: 0 20px;
    color: #615f60;
  }
}
</style>
