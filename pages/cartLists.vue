<template>
  <div v-if="lists.length" class="cart-lists">
    <ul class="product-lists">
      <li
        :class="{ 'product-item': true, active: item.checked }"
        @click="checkGood(index)"
        v-for="(item, index) in lists"
        :key="item._id"
      >
        <div class="delete" @click.stop="deleteProduct(item._id, index)">
          <i class="el-icon-delete-solid"></i>
        </div>
        <div class="img">
          <img :src="item.goodsImage" alt />
        </div>
        <div class="info-box">
          <div class="info">
            <p class="name">{{ item.goodsName }}</p>
            <p>
              <el-tag class="my-tag">{{ item.goodsColor }}</el-tag>
            </p>
          </div>
          <div class="num">
            <div @click.stop>
              <el-input-number
                v-model="item.goodsNum"
                @change="changeNum($event, item.goodsId)"
                :min="1"
              ></el-input-number>
            </div>
            <p class="price">
              <span>¥</span>
              {{ item.salePrice * item.goodsNum || 88 }}
            </p>
          </div>
        </div>
      </li>
    </ul>
    <div v-if="isMore" class="load-more" @click="loadMore">
      ———— 加载更多 ————
    </div>
    <el-divider content-position="left">选择收货地址</el-divider>
    <div class="create-order">
      <div class="address-lists">
        <div
          class="address-item"
          :class="{ active: item.isDefault }"
          v-for="(item, index) in addressLists"
          :key="item.addressId"
          @click="changeDefaultAddress(index)"
        >
          <p class="street-name">{{ item.streetName }}</p>
          <p class="user-name">姓名: {{ item.userName }}</p>
          <p class="tel">tel: {{ item.tel }}</p>
          <p class="postCode">邮政编码: {{ item.postCode }}</p>
        </div>
        <div class="address-item add-address" @click="dialogVisible = true">
          <i class="el-icon-plus"></i>
        </div>
      </div>
    </div>
    <div class="opear">
      <el-checkbox v-model="checkAll">全选</el-checkbox>
      <div class="total">
        <p>
          合计：
          <span class="price">
            <span>¥</span>
            {{ totalPrice || 88 }}
          </span>
        </p>
        <el-button
          class="submit-btn"
          type="danger"
          @click="goCount"
          :disabled="totalPrice == 0"
          >结算</el-button
        >
      </div>
    </div>
    <el-dialog
      title="新增收货地址"
      :visible.sync="dialogVisible"
      width="30%"
      @close="handleClose"
    >
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="收货人姓名" prop="userName">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="收货地址" prop="streetName">
          <el-input v-model="form.streetName"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="tel">
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码" prop="postCode">
          <el-input v-model="form.postCode"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="addAddress">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  <div class="cart-lists" v-else>
    <p class="nothing-tip">
      看什么看，啥都没得，还去不 <nuxt-link to="/">购物</nuxt-link>
    </p>
  </div>
</template>

<script>
export default {
  // middleware: 'auth',
  data() {
    return {
      lists: [
        {
          goodsId: 1,
          goodsColor: 'red',
          goodsName: '4025水果直供',
          salePrice: 88,
          goodsImage: 'https://i04piccdn.sogoucdn.com/bc3a98b65e35c69d',
          checked: true,
          goodsNum: 2,
        },
        {
          goodsId: 2,
          goodsColor: 'blue',
          goodsName: '4025水果直供',
          salePrice: 78,
          goodsImage: 'https://i04piccdn.sogoucdn.com/bc3a98b65e35c69d',
          checked: false,
          goodsNum: 20,
        },
      ],
      addressLists: [
        {
          addressId: 1,
          userName: 'coderpen',
          streetName: '成都武侯区',
          postCode: 466,
          tel: 155587924,
          isDefault: true,
        },
        {
          addressId: 2,
          userName: 'coderpen',
          streetName: '成都青牛区',
          postCode: 522,
          tel: 1586587964,
          isDefault: false,
        },
      ],
      isMore: true,
      page: 1,
      checkAll: false,
      dialogVisible: false,
      currAddress: {
        addressId: 1,
        userName: 'coderpen',
        streetName: '成都武侯区',
        postCode: 466,
        tel: 155587924,
        isDefault: true,
      },
      rules: {
        userName: [
          { required: true, message: '请输入收货人姓名', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' },
        ],
        streetName: [
          { required: true, message: '请输入收货地址', trigger: 'blur' },
          {
            min: 6,
            max: 20,
            message: '长度在 6 到 20 个字符',
            trigger: 'blur',
          },
        ],
        postCode: [
          { required: true, message: '请输入邮政编码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              const reg = /^[0-9]{6}$/
              if (reg.test(value)) {
                callback()
              } else if (value === '' || value.length === 0) {
                callback(new Error('请输入您的邮政编码'))
                return false
              } else {
                callback(new Error('邮政编码格式有误，请重输'))
                return false
              }
            },
            trigger: 'blur',
          },
        ],
        tel: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            pattern: /^1[34578]\d{9}$/,
            message: '手机号码格式不正确',
            trigger: 'change',
          },
        ],
      },

      form: {
        tel: '',
        userName: '',
        streetName: '',
        postCode: '',
      },
    }
  },
  async mounted() {
    // this.getCartLists()
  },
  watch: {
    checkAll(val) {
      this.lists.forEach((item) => {
        item.checked = val
      })
    },
  },
  computed: {
    totalPrice() {
      let total = 0
      this.lists.forEach((item) => {
        if (item.checked) {
          total += item.salePrice * item.goodsNum
        }
      })
      return total
    },
  },
  // 加载收货地址
  // async asyncData({ app }) {
  //   const { data } = await app.$axios.get('/users/addressLists')

  //   let currAddress = {}
  //   for (let i = 0; i < data.length; i++) {
  //     if (data[i].isDefault) {
  //       currAddress = data[i]
  //     }
  //   }
  //   return { addressLists: data, currAddress }
  // },
  methods: {
    async getCartLists(page = 1, loadMore) {
      const res = await this.$axios.get('/users/cartLists', {
        params: {
          page,
        },
      })
      if (res.status === 200) {
        this.lists = loadMore ? [...res.data, ...this.lists] : res.data
        this.isMore = res.isMore
      } else {
        this.$message.error(res.msg)
      }
    },
    // 选择商品
    checkGood(index) {
      this.lists[index].checked = !this.lists[index].checked
      for (let i = 0; i < this.lists.length; i++) {
        if (!this.lists[i].checked) return
      }
      this.checkAll = true
    },
    // 加载更多
    loadMore() {
      this.getCartLists({ page: ++this.page, loadMore: true })
    },
    // 改变商品数量
    async changeNum(val, id) {
      // console.log(val, id)
      const res = await this.$axios.post('/users/updatePro', {
        id,
        num: val,
      })
      if (!res.status === 200) {
        this.$message.error(res.msg)
      }
    },
    // 删除
    deleteProduct(id, index) {
      this.$confirm('此操作将清楚该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      }).then(async () => {
        let res = await this.$axios.delete('/users/deletePro', {
          params: {
            id: id,
          },
        })
        if (res.status == 200) {
          this.$message.success('删除成功!')
          this.lists.splice(index, 1)
        }
      })
    },
    // 改变默认地址
    async changeDefaultAddress(index) {
      let res = await this.$axios.post('/users/defaultAddress', {
        addressId: this.addressLists[index].addressId,
      })
      if (res.status == 200) {
        for (let i = 0; i < this.addressLists.length; i++) {
          if (this.addressLists[i].isDefault) {
            this.addressLists[i].isDefault = false
            break
          }
        }
        this.addressLists[index].isDefault = true
        this.currAddress = this.addressLists[index]
      } else {
        this.$message.error(res.msg)
      }
    },
    // 添加新的地址
    async addAddress() {
      const res = await this.$axios.post('/users/addAddress', {
        ...this.form,
      })
      if (res.status == 200) {
        this.$message.success('新增成功！')
        this.addressLists = res.data
        this.dialogVisible = false
      } else {
        this.$message.success(res.msg)
      }
    },
    // 结算下订单
    async goCount() {
      let products = []
      this.lists.forEach((item) => {
        if (item.checked) {
          products.push(item)
        }
      })
      let params = {
        totalPrice: this.totalPrice,
        ...this.currAddress,
        products: products,
      }

      let res = await this.$axios.post('/users/addOrder', {
        params,
      })
      if (res.status == 200) {
        this.$message.success('下单成功，但是你收不到东西哈！别等了。')
        this.getCartLists()
      } else {
        this.$message.error(res.msg)
      }
    },
    handleClose() {
      this.$refs['ruleForm'].resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
.cart-lists {
  width: 80%;
  margin: 0 auto;

  .product-lists {
    .product-item {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      background: #fff;
      padding: 20px;
      border-radius: 5px;
      cursor: pointer;

      &.active {
        box-shadow: 0 0 5px #d61a1a;

        &:hover {
          box-shadow: 0 0 3px #d61a1a;
        }
      }
    }

    .delete {
      margin-right: 20px;
      color: #d61a1a;
      font-size: 20px;
    }

    .img {
      margin-right: 20px;
      height: 80px;

      img {
        height: 100%;
      }
    }

    .info-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 1;

      .info {
        .name {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          color: #615f60;
          font-size: 15px;
        }
      }

      .num {
        .price {
          margin-top: 20px;
          color: #d61a1a;
          font-weight: bold;
          font-size: 16px;
        }
      }
    }
  }

  .opear {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    height: 80px;
    padding: 0 20px;

    .total {
      display: flex;
      align-items: center;

      .submit-btn {
        margin-left: 20px;
        width: 120px;
        font-size: 14px;
      }
    }
  }
}

.my-tag {
  background-color: #d61a1a;
  border-color: #cc3400;
  color: #fff;
}

.address-lists {
  display: flex;
  flex-wrap: wrap;

  .address-item {
    margin-right: 20px;
    margin-bottom: 20px;
    position: relative;
    width: 200px;
    padding: 20px;
    background: #fff;
    border-radius: 5px;
    color: #615f60;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 3px #d61a1a;
    }

    &.active {
      box-shadow: 0px 0px 5px #d61a1a;

      &:hover {
        box-shadow: 0 0 3px #d61a1a;
      }

      &::after {
        content: '默认地址';
        position: absolute;
        top: 0;
        right: 0;
        padding: 0 3px;
        background: #d61a1a;
        color: #fff;
        font-size: 12px;
      }
    }

    .street-name {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: #d61a1a;
      width: 100%;
    }
  }

  .add-address {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
  }
}

.nothing-tip {
  margin-top: 50px;
  text-align: center;
  font-size: 20px;
  color: #615f60;

  a {
    color: #d61a1a;
    font-size: 30px;
    text-decoration: underline;
  }
}
</style>
