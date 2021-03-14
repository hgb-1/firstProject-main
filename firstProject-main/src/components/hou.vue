<template>
  <div class="cont">
    <div class="background"></div>

    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      class="xhj"
    >
      <p>请登录</p>
      <el-form-item prop="name">
        <el-input
          v-model="ruleForm.name"
          autocomplete="off"
          placeholder="请输入用户名"
          class="num"
        ></el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
          placeholder="请输入密码"
          class="num"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="login" class="xhjcen"
          >登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "hou",

  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.name !== "") {
          this.$refs.ruleForm.validateField("name");
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        name: "",
      },
      rules: {
        pass: [{ validator: validateName, trigger: "blur" }],
        name: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      console.log(123123);
      this.$router.push({
        path: "/Manage",
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
.cont {
  position: relative;
}
.background {
  width: 101%;
  height: 720px;
  margin: -8px;
  position: absolute;
  z-index: -2;
  background: url(../assets/loginBg.jpg) no-repeat;
  background-size: 100% 100%;
}
.xhj {
  color: white;
  height: 300px;
  width: 360px;
  margin-left: 1100px;
  margin-top: 200px;
  position: absolute;
  z-index: 2;
  background: rgba(255, 255, 255, 0.1);
}
.xhj p {
  text-align: center;
}
.xhjcen {
  width: 120px;
  margin-left: 119px;
}
.num {
  width: 300px;
  margin: 0 30px;
}
</style>

<style lang="css" scoped></style>

