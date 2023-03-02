<template>
  <div class="messagecenter">
    <div class="tabs-wrap">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane name="first">
          <span slot="label"><i class="el-icon-s-promotion"></i> 我的评论</span>
          我的行程
          <h2>评论列表</h2>
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label"><i class="el-icon-s-comment"></i> 回复我的</span>
          <h2>回复列表</h2>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageCenter',
  data() {
    return {
      activeName: 'first',
    }
  },
  methods: {},
}
</script>

<style scoped lang="scss">
.messagecenter {
  .tabs-wrap {
    width: 60%;
    margin: 50px auto;
  }
}
</style>
