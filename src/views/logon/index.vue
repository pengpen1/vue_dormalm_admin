<template>
  <div class="logon-container">
    <el-form
      ref="logonForm"
      :model="logonForm"
      :rules="logonRules"
      class="logon-form"
      label-position="left"
    >
      <div class="title-container">
        <img width="180" :src="require('@/assets/logo/logo2.png')" alt="logo">
      </div>

      <el-form-item prop="nickname">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="nickname"
          v-model="logonForm.nickname"
          placeholder="nickname"
          name="nickname"
          type="text"
          tabindex="1"
        />
      </el-form-item>

      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="email"
          v-model="logonForm.email"
          placeholder="Email"
          name="email"
          type="text"
          tabindex="2"
        />
      </el-form-item>

      <el-form-item prop="password1">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="password1"
          v-model="logonForm.password1"
          type="password"
          placeholder="Password"
          name="password"
          tabindex="3"
        />
      </el-form-item>

      <el-form-item prop="password2">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="password2"
          v-model="logonForm.password2"
          type="password"
          placeholder="Reenter the Password"
          name="password"
          tabindex="4"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handlelogon"
      >注册</el-button>

      <router-link to="/login" class="link-logon">前往登录页</router-link>
    </el-form>
  </div>
</template>

<script>
import { validEmail } from '@/utils/validate'

export default {
  name: 'Logon',
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error('Please enter your vaild email'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      logonForm: {
        nickname: '',
        email: '',
        password1: '',
        password2: ''
      },
      logonRules: {
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 登录
    handlelogon() {
      this.$refs.logonForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('admin/logon', this.logonForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch((err) => {
              console.log(err)
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .logon-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.logon-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.logon-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .logon-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    display: flex;
    align-items: center;
    height: 64px;
    margin-bottom: 32px;
    justify-content: center;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .link-logon{
    color: #fff;
    align-self: flex-end;
  }
}
</style>
