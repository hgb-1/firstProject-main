<template>
  <div>
    <el-dialog
      :visible.sync="dialogadd"
      width="400px"
      :close-on-click-modal="false"
      @close="resetForm('add')"
    >
      <el-form
        :model="add"
        status-icon
        :rules="rules"
        ref="add"
        label-width="100px"
        class="demo-ruleform"
      >
        <el-form-item label="门店编号" prop="num">
          <el-input
            v-model="add.num"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="门店名称" prop="str">
          <el-input
            v-model="add.str"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input
            v-model="add.phone"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="nam">
          <el-input
            v-model="add.nam"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="店长姓名" prop="name">
          <el-input
            v-model="add.name"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>

        <el-button
          class="r"
          @click="
            dialogadd = false;
            resetForm('add');
          "
          >取 消</el-button
        >
        <el-button class="r" type="primary" @click="addDate('add')"
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
      dialogadd: false,
      add: { num:"", str:"", phone:"", nam:"", name:""},
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
    //确定
    addDate(forName){
      this.$refs[forName].validate((valid) => {
        if (valid) {
          let newDialogForm = Object.assign({}, this.add, {
            id: new Date().getTime(),
          });

          this.dialogadd = false;
          this.$emit("searchAdd", newDialogForm);
        }
      });
    },
    dialogVisible() {},
    resetForm(forName) {
      this.$refs[forName].resetFields();
    },
    openDialog(falg, val) {
      this.dialogadd = falg;
      this.$nextTick(() => {
        this.$refs.add.resetFields();
      });
    },
  },
};
</script>

<style lang="css" scoped>
.demo-ruleform {
  position: relative;
  height: 370px;
}
.r {
  float: right;
  margin: 20px 12px;
}
</style>