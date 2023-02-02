<template>
  <div>
    <Header />
      <Nuxt />
    <Footer />
  </div>
</template>
<script>
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
// import particlesConfig from '@/lib/particles.json'

export default {
  components: {
    Header,
    Footer,
  },
  mounted() {
  },
}
</script>
<style lang="scss" scoped></style>
