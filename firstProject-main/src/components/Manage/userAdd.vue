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
        <el-form-item label="账号" prop="zhangHao">
          <el-input
            v-model="add.zhangHao"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="add.name"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="role">
          <el-input
            v-model="add.role"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input
            v-model="add.sex"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="add.phone"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="mailbox">
          <el-input
            v-model="add.mailbox"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="myID">
          <el-input
            v-model="add.myID"
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
      add: { zhangHao: "", name: "",role:"", sex: "", phone: "",mailbox:"", myID: ""},
      rules: {
        zhangHao: [
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
    addDate(forName) {
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
  height: 460px;
}
.r {
  float: right;
  margin: 5px 10px;
}
</style>