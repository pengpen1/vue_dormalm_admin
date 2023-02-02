<template>
  <div class="messagecenter">
    <div class="info-wrap">
      <h2>消息中心开发中！</h2>
    </div>
    <vue-particles
      color="#409EFF"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#409EFF"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
  </div>
</template>

<script>
export default {
  name: 'MessageCenter',
  data() {
    return {
      info: '消息中心开发中！',
    }
  },
  computed: {},
  methods: {},
}
</script>

<style scoped lang="scss">
.messagecenter {
  background-image: linear-gradient(-180deg, #1a1454 0%, #0e81a5 100%);
  height: 100%;
  .info-wrap {
    width: 500px;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
