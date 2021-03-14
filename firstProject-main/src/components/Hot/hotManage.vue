<template>
  <div id="userManage">
    <div class="query">
      <el-form
        :inline="true"
        :model="formInline"
        ref="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="商品名称" prop="name" class="h">
          <el-input
            v-model="formInline.name"
            class="w"
            placeholder="名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品编码" prop="code" class="h">
          <el-input
            v-model="formInline.code"
            class="w"
            placeholder="编码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()" class="en1"
            >查询</el-button
          >
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
      <el-button type="primary" @click="upSelection()">展示数量设置</el-button>
    </div>

    <div class="divTable">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        border
        class="userTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="40"> </el-table-column>
        <el-table-column prop="num" label="排序" width="50"> </el-table-column>
        <el-table-column prop="code" label="商品编码" width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="price" label="商品价格" width="80">
        </el-table-column>
        <el-table-column prop="introduce" label="商品介绍" width="150">
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
    <user-atler ref="alterSelection"></user-atler>
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
      page: {
        //定义页数
        pageNum: 1, //当前的第几页
        total: 10, //一共有多少条
        pageSize: 100, //每页显示条数
        currentPage4: 6,
      },
      formInline: {
        name: "",
        code: "",
        // region: "",
        // manage: "",
      },
      tableData: [],
      Table: [
        {
          num: "1",
          code: "eeeee1111",
          name: "《三体》",
          price: "24元",
          introduce: "讲述黑暗丛林法则",
        },
        {
          num: "2",
          code: "ddd9999",
          name: "《猫武士》",
          price: "19元",
          introduce: "讲述猫咪的故事",
        },
        {
          num: "3",
          code: "ccc777777",
          name: "《三体》",
          price: "24元",
          introduce: "讲述黑暗丛林法则",
        },
        {
          num: "4",
          code: "bbbb55555",
          name: "《猫武士》",
          price: "19元",
          introduce: "讲述猫咪的故事",
        },
        {
          num: "5",
          code: "aaaaa22222",
          name: "《三体》",
          price: "24元",
          introduce: "讲述黑暗丛林法则",
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
      console.log(this.tableData);
      this.tableData = this.Table.filter((item) => {
        return (
          item.code.includes(this.formInline.code) &&
          item.name.includes(this.formInline.name)
        );
      }).slice(
        (this.page.pageNum - 1) * this.page.pageSize,
        this.page.pageNum * this.page.pageSize
      );
      this.page.total = this.tableData.length;
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    upSelection() {},
    downSelection() {
      this.$refs.addSelection.openDialog(
        true,
        JSON.parse(JSON.stringify(this.multipleSelection))
      );
    },

    //接受数据
    searchAdd(val) {
      val;
      console.log(val);
      this.Table.push(val);
      this.search();
    },
    //新增
    addSelection() {
      this.$refs.addSelection.openDialog(
        true,
        JSON.parse(JSON.stringify(this.multipleSelection))
      );
    },
    alterSelection() {
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

    //修改
    Delete() {
      if (!this.multipleSelection.length) {
        this.$message({
          type: "error",
          message: "请勾选数据",
        });
        return;
      }

      //确定删除
      this.$confirm("确定要删除选中数据吗？")
        .then(() => {
          let indexList = this.multipleSelection.map((item) => {
            return item.userId;
          });

          indexList.forEach((indexItem) => {
            //当数组中的元素在测试条件时返回true时，findIndex()返回符合条件的元素的索引位置
            //如果没有符合条件的元素返回-1
            let currentIndex = this.Table.findIndex((item) => {
              return item.userId === indexItem;
            });

            console.log("currentIndex", currentIndex);
            this.Table.splice(currentIndex, 1);
          });

          this.search();
        })

        //取消删除
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
  top: 190px;
  left: -60px;
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
  left: 390px;
  top: -720px;
}
.userTable {
  width: 900px;
}
.divTable {
  width: 561px;
}
.block {
  position: absolute;
  top: 670px;
  left: 60px;
}
</style>