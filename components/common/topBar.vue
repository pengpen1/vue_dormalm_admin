<template>
  <div class="top-bar">
    <div class="logo">
      <nuxt-link to="/"><img :src="logo" alt="logo" /></nuxt-link>
    </div>
    <div>
      <User />
    </div>
  </div>
</template>

<script>
import User from '~/components/user'
export default {
  data() {
    return {
      logo: require('../assets/logo.png'),
    }
  },
  components: {
    User,
  },
}
</script>

<style lang="scss" scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 5px 30px;
  box-shadow: 0px 0px 2px #d61a1a;
  .logo {
    img {
      height: 50px;
    }
  }
}
</style>
