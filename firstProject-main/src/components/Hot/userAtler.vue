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
        <el-form-item label="排序" prop="num" class="c">
          <el-input
            v-model="atler.num"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品编码" prop="code" class="c">
          <el-input
            v-model="atler.code"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="name" class="c">
          <el-input
            v-model="atler.name"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price" class="c">
          <el-input
            v-model="atler.price"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品介绍" prop="introduce" class="c">
          <el-input
            v-model="atler.introduce"
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
        <el-button class="r" type="primary" @click="dialogatler = false"
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
        code: "",
        name: "",
        price: "",
        introduce: "",
        pass: "",
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
    dialogVisible() {},
    resetForm(forName) {
      this.$refs[forName].resetFields();
    },
    openDialog(falg, val) {
      this.dialogatler = falg;
      this.$nextTick(() => {
        this.$refs.atler.resetFields();
        console.log("wdnmd" + JSON.stringify(val));
        this.atler.num = val[0].num;
        this.atler.code = val[0].code;
        this.atler.name = val[0].name;
        this.atler.price = val[0].price;
        this.atler.introduce = val[0].introduce;
      });
    },
  },
};
</script>

<style lang="css" scoped>
.demo-ruleform {
  position: relative;
  height: 360px;
}
.r {
  float: right;
  margin: 5px 10px;
}
</style>