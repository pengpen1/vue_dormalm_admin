<template>
  <div class="search">
    <div class="input-box">
      <el-autocomplete
        class="search-input"
        @keyup.enter.native="search"
        v-model="keyword"
        :fetch-suggestions="querySearch"
        placeholder="快来寻找自己喜欢的商品吧！"
        :trigger-on-focus="false"
        @select="handleSelect"
      >
      </el-autocomplete>
      <el-button
        class="search-btn"
        @click="search"
        icon="el-icon-search"
      ></el-button>
    </div>
    <div class="filter">
      <span
        @click="changeType(item.value)"
        v-for="item in filter"
        :key="item.value"
        :class="{ active: item.value == current }"
        >{{ item.label }}</span
      >
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      keyword: '',
      suggestions: [
        { value: '打印直送' },
        { value: '水果沙拉' },
        { value: '水果拼盘' },
        { value: '水果直送' },
      ],
      current: 'all',// 零食snack，水果fruit，打印print，其他other
      filter: [
        { value: 'all', label: '全部' },
        { value: 'snack', label: '零食' },
        { value: 'fruit', label: '水果' },
        { value: 'print', label: '打印' },
        { value: 'other', label: '其他' },
      ],
    }
  },
  methods: {
    querySearch(queryString, cb) {
      const suggestions = this.suggestions
      queryString = queryString.split('')
      let results = []
      for (let i = 0; i < queryString.length; i++) {
        suggestions.forEach((item) => {
          if (item.value.indexOf(queryString[i]) > -1) results.push(item)
        })
      }
      results = Array.from(new Set(results))
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    // 选择推荐搜索
    handleSelect(item) {
      this.$emit('search', item.value)
    },
    // 搜索
    search() {
      this.$emit('search', this.keyword)
    },
    // 切换快速选择
    changeType(type) {
      this.current = type
      this.$emit('change-type', type)
    },
  },
}
</script>

<style lang="scss" scoped>
.search {
  width: 560px;
  margin: 20px auto;
  .search-input {
    width: 500px;
  }
  .filter {
    margin-top: 10px;
    color: #615f60;
    span {
      margin-right: 10px;
      cursor: pointer;
      &:hover {
        color: #cc3400;
      }
      &.active {
        color: #cc3400;
        font-weight: bold;
      }
    }
  }
  .input-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .search-btn {
    margin-left: 10px;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;

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
  }
}
</style>
