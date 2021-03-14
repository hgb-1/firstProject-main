<template>
  <div>
    <el-dialog
      :visible.sync="dialogatler"
      width="400px"
      :close-on-click-modal="false"
      @close="resetForm('atler')"
    >
      <el-form
        :model="atler"
        status-icon
        :rules="rules"
        ref="atler"
        label-width="100px"
        class="demo-ruleform"
      >
        <el-form-item label="门店编号" prop="num">
          <el-input
            v-model="atler.num"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="门店名称" prop="str">
          <el-input
            v-model="atler.str"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input
            v-model="atler.phone"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="site">
          <el-input
            v-model="atler.site"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="店长姓名" prop="name">
          <el-input
            v-model="atler.name"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="邀请码" prop="num2">
          <el-input
            v-model="atler.num2"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="门店账号" prop="zhangHao">
          <el-input
            v-model="atler.zhangHao"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-button
          class="r"
          @click="
            dialogatler = false;
            resetForm('atler');
          "
          >取 消</el-button
        >
        <el-button class="r" type="primary" @click="atlerDate('atler')"
          >确 定</el-button
        >
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogatler: false,
      atler: {
        num: "",
        str: "",
        phone: "",
        site: "",
        name: "",
        num2: "",
        zhangHao: "",
      },
      rules: {
        username: [
          {
            required: true,
            trigger: "blur",
            pattern: /^([\w\@.]{1,14})$/g,
            message: "请输入正确的用户名：",
          },
        ],
      },
    };
  },
  methods: {
    //确定修改
    atlerDate(forName) {
      this.$refs[forName].validate((valid) => {
        if (valid) {
          this.dialogatler = false;

          let newFormData = Object.assign({}, this.atler);
          this.$emit("searchAtler", newFormData);
        } else {
          console.log("error submit");
          return false;
        }
      });
    },

    resetForm(forName) {
      this.$refs[forName].resetFields();
    },
    openDialog(falg, val) {
      this.dialogatler = falg;
      this.$nextTick(() => {
        this.$refs.atler.resetFields();
        console.log("wdnmd" + JSON.stringify(val));
        this.atler.num = val[0].num;
        this.atler.str = val[0].str;
        this.atler.phone = val[0].phone;
        this.atler.site = val[0].site;
        this.atler.name = val[0].name;
        this.atler.num2 = val[0].num2;
        this.atler.zhangHao = val[0].zhangHao;
      });
    },
  },
};
</script>

<style lang="css" scoped>
.demo-ruleform {
  position: relative;
  height: 460px;
}
.r {
  float: right;
  margin: 5px 10px;
}
</style>