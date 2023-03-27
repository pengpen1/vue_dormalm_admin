<template>
  <div class="messagecenter">
    <div class="tabs-wrap">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane name="comment">
          <span slot="label"><i class="el-icon-s-promotion"></i> 我的评论</span>
          <ul class="comment-list">
            <li v-for="item in commentList" :key="item.id" class="comment-item">
              <p>文章：{{ item.article.title }}</p>
              <p>评论内容：{{ item.content }}</p>
              <p>评论时间：{{ item.created_at }}</p>
            </li>
          </ul>
          <div class="pagination">
            <el-pagination
              background
              :current-page.sync="page"
              layout="total, prev, pager, next"
              :total="count"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane name="reply-my">
          <span slot="label"><i class="el-icon-s-comment"></i> 回复我的</span>
          <ul class="comment-list">
            <li v-for="item in commentList" :key="item.id" class="comment-item">
              <p>文章：{{ item.article.title }}</p>
              <p>评论内容：{{ item.content }}</p>
              <p>评论时间：{{ item.created_at }}</p>
              <p v-if="!item.reply_list">回复：无</p>
              <template v-else>
                <p v-for="(replay, index) in item.reply_list" :key="replay.id">
                <span class="replay-index"> 回复{{ index + 1 }}</span><span class="replay-username">({{ replay.user_info.username }})</span>：{{
                    replay.content
                  }}
                </p>
              </template>
            </li>
          </ul>
          <div class="pagination">
            <el-pagination
              background
              :current-page.sync="page"
              layout="total, prev, pager, next"
              :total="count"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane name="my-reply">
          <span slot="label"><i class="el-icon-s-comment"></i>我的回复</span>
          <ul class="comment-list">
            <li v-for="item in commentList" :key="item.id" class="comment-item">
              <p>文章：{{ item.article.title }}</p>
              <p>评论内容：{{ item.content }}</p>
              <p>评论时间：{{ item.created_at }}</p>
              <p v-if="!item.reply_list">回复：无</p>
              <template v-else>
                <p v-for="(replay, index) in item.reply_list" :key="replay.id">
                <span class="replay-index"> 回复{{ index + 1 }}</span><span class="replay-username">({{ replay.user_info.username }})</span>：{{
                    replay.content
                  }}
                </p>
              </template>
            </li>
          </ul>
          <div class="pagination">
            <el-pagination
              background
              :current-page.sync="page"
              layout="total, prev, pager, next"
              :total="count"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCommentTarget } from '@/request/api/comment'
export default {
  name: 'MessageCenter',
  data() {
    return {
      activeName: 'comment',
      page: 1,
      count: 0,
      commentList: [],
    }
  },
  async fetch({ store }) {
    await store.dispatch('category/getCategoryData')
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
  mounted() {
    this.getComment()
  },
  methods: {
    async getComment() {
      const uid = this.userInfo && this.userInfo.id
      const [err, res] = await getCommentTarget({
        user_id: uid,
        // 1就是查询
        is_replay: 1,
        is_article: 1,
        page: this.page,
      })
      if (!err) {
        console.log('1111', res)
        this.isLoad = true
        this.commentList = res.data.data.data
        this.count = res.data.data.meta.count
      }
    },
    // 点击数字
    async handleCurrentChange(page) {
      this.page = page
      await this.getComment()
      this.$scrollTo(0)
    },
  },
}
</script>

<style scoped lang="scss">
.messagecenter {
  .tabs-wrap {
    width: 60%;
    margin: 50px auto;
  }
  .replay-index{
    color:rgb(143, 225, 225)
  }
  .replay-username{
    color:rgb(228, 102, 71)
  }
}
</style>
