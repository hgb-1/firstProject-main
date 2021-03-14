<template>
  <div id="userManage">
    <div class="query">
      <el-form
        :inline="true"
        :model="formInline"
        ref="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="账号查询" prop="zhangHao" class="h">
          <el-input
            v-model="formInline.zhangHao"
            class="w"
            placeholder="账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名查询" prop="name" class="h">
          <el-input
            v-model="formInline.name"
            class="w"
            placeholder="姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="role" class="h">
          <el-select v-model="formInline.role" placeholder="职位" class="w2">
            <el-option label="老板" value="LaoBan"></el-option>
            <el-option label="店长" value="DianZhang"></el-option>
            <el-option label="保洁" value="BaoJie"></el-option>
            <el-option label="服务员" value="FuWuYuan"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" class="en1">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetForm('formInline')" class="en"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <div style="margin-top: 200px" class="divSelection">
      <el-button type="primary" @click="addSelection()">新增</el-button>
      <el-button @click="alterSelection()">修改</el-button>
      <el-button @click="Delete()">删除</el-button>
    </div>
    <div class="divTable">
      <el-table
        ref="multipleTable"
        :data="table"
        tooltip-effect="dark"
        border
        class="userTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="zhangHao" label="账号" width="120">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="100">
        </el-table-column>
        <el-table-column
          prop="role"
          label="职位"
          width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="60"> </el-table-column>
        <el-table-column prop="phone" label="手机" width="120">
        </el-table-column>
        <el-table-column prop="mailbox" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="myID" label="身份证" width="200" class="sfz">
        </el-table-column>
      </el-table>

      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        >
        </el-pagination>
      </div>
    </div>

    <user-add ref="addSelection" v-on:searchAdd="searchAdd"></user-add>
    <user-atler
      ref="alterSelection"
      v-on:searchAtler="searchAtler"
    ></user-atler>
  </div>
</template>

<script>
import userAdd from "./userAdd.vue";
import userAtler from "./userAtler.vue";
export default {
  components: {
    userAdd,
    userAtler,
  },
  data() {
    return {
      formInline: {
        zhangHao: "",
        name: "",
        region: "",
        manage: "",
      },
      page: {
        //定义页数
        pageNum: 1, //当前的第几页
        total: 10, //一共有多少条
        pageSize: 100, //每页显示条数
        currentPage4: 6,
      },
      table: [],
      tableData: [
        {
          zhangHao: "23333",
          name: "王小虎",
          role: "店长",
          sex: "男",
          phone: "12312312345",
          mailbox: "2725241432@qq.com",
          myID: "123456789123456789",
        },
        {
          zhangHao: "111111",
          name: "王大虎",
          role: "副店长",
          sex: "男",
          phone: "12312312345",
          mailbox: "2725241432@qq.com",
          myID: "123456789123456789",
        },
        {
          zhangHao: "32222",
          name: "王中虎",
          role: "管理员",
          sex: "男",
          phone: "12312312345",
          mailbox: "2725241432@qq.com",
          myID: "123456789123456789",
        },
        {
          zhangHao: "567",
          name: "王上虎",
          role: "管理员",
          sex: "男",
          phone: "12312312345",
          mailbox: "2725241432@qq.com",
          myID: "123456789123456789",
        },
        {
          zhangHao: "789",
          name: "王下虎",
          role: "前台",
          sex: "男",
          phone: "12312312345",
          mailbox: "2725241432@qq.com",
          myID: "123456789123456789",
        },
        {
          zhangHao: "96732",
          name: "王左虎",
          role: "保洁",
          sex: "男",
          phone: "12312312345",
          mailbox: "2725241432@qq.com",
          myID: "123456789123456789",
        },
        {
          zhangHao: "666777",
          name: "王右虎",
          role: "老板",
          sex: "男",
          phone: "12312312345",
          mailbox: "2725241432@qq.com",
          myID: "123456789123456789",
        },
      ],
      multipleSelection: [],
    };
  },

  mounted() {
    this.search();
  },

  methods: {
    // 每页条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.pageSize = val;
      this.search();
    },
    // 第几页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.pageNum = val;
      this.search();
    },
    //查询
    search() {
      console.log("submit!");
      this.table = this.tableData
        .filter((item) => {
          return (
            item.zhangHao.includes(this.formInline.zhangHao) &&
            item.name.includes(this.formInline.name)
          );
        })
        .slice(
          (this.page.pageNum - 1) * this.page.pageSize,
          this.page.pageNum * this.page.pageSize
        );
      this.page.total = this.tableData.length;
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //接受子页面传过来的值(新增)
    searchAdd(val) {
      val;
      console.log(val);
      //val源数据
      this.tableData.push(val);
      this.search();
    },
    //新增
    addSelection() {
      this.$refs.addSelection.openDialog(
        true,
        JSON.parse(JSON.stringify(this.multipleSelection))
      );
    },

    //接受子页面传来的值(修改)
    searchAtler(value) {
      console.log("修改", JSON.stringify(value));
      let index = this.tableData.findIndex((item) => {
        return item.userId === value.userId;
      });

      let newFormData = Object.assign({}, value);
      this.tableData.splice(index, 1, newFormData);
      console.log(this.tableData);
      this.search();
    },

    //修改
    alterSelection(formName) {
      if (1 == this.multipleSelection.length) {
        this.$refs.alterSelection.openDialog(
          true,
          JSON.parse(JSON.stringify(this.multipleSelection))
        );
      } else if (this.multipleSelection.length > 1) {
        this.$message({
          type: "info",
          message: "请选择一条数据进行操作",
        });
      } else {
        this.$message({
          type: "info",
          message: "请选择数据进行操作",
        });
      }
    },

    //删除
    Delete() {
      if (!this.multipleSelection.length) {
        this.$message({
          type: "error",
          message: "请勾选数据",
        });

        return;
      }
      this.$confirm("确定要删除选中的数据吗？")
        .then(() => {
          let indexList = this.multipleSelection.map((item) => {
            return item.userId;
          });

          indexList.forEach((indexItem) => {
            let currentIndex = this.tableData.findIndex((item) => {
              return item.userId === indexItem;
            });
            console.log("currentIndex", currentIndex);
            this.tableData.splice(currentIndex, 1);
          });
          this.search();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style lang="css" scoped>
.query {
  position: relative;
  top: 200px;
}
.w {
  width: 160px;
}
.w2 {
  width: 100px;
}
.h {
  line-height: 40px;
}
.en1 {
  margin-left: 36px;
}
#userManage {
  position: relative;
  left: 300px;
  top: -760px;
}
.userTable {
  width: 915px;
}
</style>