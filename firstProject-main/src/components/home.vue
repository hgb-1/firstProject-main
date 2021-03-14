<template>
  <div class="header">
    <div class="one">行走书店后台管理系统</div>

    <div class="two">
      <img src="../assets/imgs.png" alt="" />

      <el-dropdown @command="handleCommand" trigger="click">
        <span class="el-dropdown-link">
          {{ name }}
          <i class="el-icon-arrow-down"></i>
        </span>

        <el-dropdown-menu slot="dropdown" class="xh">
          <el-dropdown-item command="undatePw" @click="diaLog = true">
            修改密码
          </el-dropdown-item>
          <el-dropdown-item command="quiteLogin"> 退出登录 </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="原密码" :label-width="formLabelWidth">
            <el-input v-model="form.name1" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="新密码" :label-width="formLabelWidth">
            <el-input v-model="form.name2" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",

  data() {
    return {
      name: "fl是我儿子",

      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
    };
  },

  methods: {
    diaLog() {
      this.form = true;
      debugger;
    },
    handleCommand(command) {
      if (command == "undatePw") {
        this.dialogFormVisible = true;
      }
      if (command == "quiteLogin") {
        this.$router.push("/hou");
      }
    },
    resetForm(formName) {
      this.dialogVisible = false;
      this.$refs[formName].resetFields();
    },
    //修改密码
    sureForm(formName) {
      this.dialogVisible = false;
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
.header {
  position: relative;
  height: 54px;
  width: 1500px;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
}
.one {
  position: absolute;
  font-size: 22px;
  line-height: 56px;
  font-weight: 600;
  color: #009ed6;
}
.two {
  position: absolute;
  right: 150px;
  top: 2px;
}
.el-dropdown-link {
  position: absolute;
  top: -60px;
  width: 100px;
}
.el-icon-arrow-down {
  position: absolute;
  margin: 20px 10px 0px;
}
</style>

<style lang="css" scoped>
</style>
