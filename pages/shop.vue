<template>
  <div class="container">
    <div class="cart" @click="handleClick">
      <i class="el-icon-shopping-cart-2">
      </i>
    </div>
    <search @change-type="changeType" @search="search" />
    <banner />
    <div class="lists-box">
      <div
        v-loading="isLoading"
        element-loading-text="请稍等，加载中..."
        class="goods-lists"
      >
        <div
          v-for="(item, index) in goodsList"
          :key="index"
          @click="goDetail(item.id)"
        >
          <Goods :data="item" />
        </div>
      </div>
      <div v-if="isMore" class="load-more" @click="loadMore">
        ———— 加载更多 ————
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/common/banner'
import Search from '@/components/common/search'
import Goods from '@/components/common/goods'
import { getGoodsList } from '@/request/api/goods'

export default {
  components: {
    Banner,
    Search,
    Goods,
  },
  async asyncData(context) {
    const { id, keyword, type = 'all', page = 1 } = context.query

    const [err, res] = await getGoodsList({
      id,
      type,
      keyword,
      page,
    })
    console.log(res.data.data)
    if (!err) {
      const isMore = res.data.data.meta.total_pages > page
      return {
        page,
        isMore,
        goodsList: res.data.data.data,
      }
    } else {
      return {
        page: 1,
        isMore: false,
        goodsList: null,
      }
    }
  },
  data() {
    return {
      // goodsList: [
      //   {
      //     type: "水果店",
      //     img_url: "https://i04piccdn.sogoucdn.com/bc3a98b65e35c69d",
      //     price: 723,
      //     title: "2054水果直售",
      //     imgs: ["https://i04piccdn.sogoucdn.com/bc3a98b65e35c69d","https://i01piccdn.sogoucdn.com/b033b9e6788709e7","https://pic.sogou.com/d?query=%E6%B0%B4%E6%9E%9C&forbidqc=&entityid=&preQuery=&rawQuery=%E6%B0%B4%E6%9E%9C&queryList=&st=255&did=11"],
      //   },
      //   {
      //     type: "水果店",
      //     img_url: "https://i04piccdn.sogoucdn.com/bc3a98b65e35c69d",
      //     price: 723,
      //     title: "2054水果直售",
      //     imgs: ["https://i04piccdn.sogoucdn.com/bc3a98b65e35c69d","https://i01piccdn.sogoucdn.com/b033b9e6788709e7","https://pic.sogou.com/d?query=%E6%B0%B4%E6%9E%9C&forbidqc=&entityid=&preQuery=&rawQuery=%E6%B0%B4%E6%9E%9C&queryList=&st=255&did=11"],
      //   },
      //   {
      //     type: "水果店",
      //     img_url: "https://i04piccdn.sogoucdn.com/bc3a98b65e35c69d",
      //     price: 723,
      //     title: "2054水果直售",
      //     imgs: ["https://i04piccdn.sogoucdn.com/bc3a98b65e35c69d","https://i01piccdn.sogoucdn.com/b033b9e6788709e7","https://pic.sogou.com/d?query=%E6%B0%B4%E6%9E%9C&forbidqc=&entityid=&preQuery=&rawQuery=%E6%B0%B4%E6%9E%9C&queryList=&st=255&did=11"],
      //   },
      // ],
      goodsList: [],
      isMore: true,
      isLoading: false,
      page: 1,
    }
  },
  mounted() {
    // this.getGoodsLists()
  },
  methods: {
    async getGoodsLists({
      keyword = '',
      type = 'all',
      pageSize = 10,
      page = 1,
      loadMore = false,
    }) {
      this.isLoading = true
      const [err, res] = await getGoodsList({
        type,
        keyword,
        pageSize,
        page,
      })
      this.isLoading = false
      if (!err) {
        this.goodsList = loadMore
          ? [...this.goodsList, ...res.data.data.data]
          : res.data.data.data;
        this.isMore = res.data.data.meta.total_pages > this.page
      }
    },
    // 搜索
    search(val) {
      this.page = 1
      this.getGoodsLists({ keyword: val })
    },
    // 切换快速搜索
    changeType(val) {
      this.page = 1
      this.getGoodsLists({ type: val })
    },
    // 加载更多
    loadMore() {
      this.getGoodsLists({ page: ++this.page, loadMore: true })
    },
    // 查看详情
    goDetail(id) {
      // const routeUrl = this.$router.resolve({
      //   name: 'detail-id',
      //   params: { id },
      // })
      // window.open(routeUrl.href, '_blank')
      this.$router.push('/goods-detail?id=' + id)
    },
    handleClick() {
      this.$router.push('/cartLists')
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  position: relative;
  .cart{
    box-sizing: border-box;
    position: fixed;
    bottom: 200px;
    right: 50px;
    width: 49px;
    height: 46px;
    cursor: pointer;
    color: #d61a1a;
    font-size: 28px;
    background-color: #f5f1f1;
    border-radius: 4px;
    opacity: 0.8;
    padding: 8px;
    border: 1px solid rgb(113, 111, 111);
    &:hover {
        box-shadow: 0 0 3px #d61a1a;
        opacity: 1;
      }
    i{
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .lists-box {
    width: 100%;
    .load-more {
      margin: 20px auto;
      text-align: center;
      cursor: pointer;
    }
  }
}

.goods-lists {
  padding: 0 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 230px);
  grid-row-gap: 10px;
  grid-column-gap: 30px;
}
</style>
