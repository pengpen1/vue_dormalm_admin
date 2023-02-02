<template>
  <div class="shop">
    <h2>{{ info }}</h2>
    <no-ssr>
      <vue-particles
        color="#A9A9A9"
        :particleopacity="0.7"
        :particlesNumber="100"
        shapeType="circle"
        :particlesize="4"
        linescolor="#00080e"
        :lineswidth="1"
        :lineLinked="true"
        :line0pacity="1"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="lizi"
      ></vue-particles>
    </no-ssr>
    <h2>111lala</h2>
  </div>
</template>

<script>
export default {
  name: 'DormitoryShop',
  data() {
    return {
      info: '宿舍小卖部开发中！',
    }
  },
  computed: {},
  methods: {},
}
</script>

<style scoped lang="scss"></style>
