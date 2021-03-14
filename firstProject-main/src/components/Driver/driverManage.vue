<template>
  <div id="userManage">
    <div class="query">
      <el-form
        :inline="true"
        :model="formInline"
        ref="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="司机编号" prop="num" class="h">
          <el-input
            v-model="formInline.num"
            class="w"
            placeholder="编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="司机姓名" prop="name" class="h">
          <el-input
            v-model="formInline.name"
            class="w"
            placeholder="姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="所在省份" prop="province" class="h">
          <el-select
            v-model="formInline.province"
            placeholder="省份"
            filterable
            @change="provinceChange"
            class="w2"
          >
            <el-option
              v-for="item in optionProvince"
              :key="item.ProID"
              :label="item.name"
              :value="item.ProSort"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所在市" prop="county" class="h">
          <el-select
            v-model="formInline.county"
            filterable
            placeholder="请选择"
            class="w2"
          >
            <el-option
              v-for="item in optionsTown"
              :key="item.CitySort"
              :label="item.name"
              :value="item.name"
            ></el-option>
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
      <el-button @click="detailsSelection()">详情</el-button>
      <el-button type="primary" @click="addSelection()">新增</el-button>
      <el-button @click="alterSelection()">修改</el-button>
      <el-button @click="Delete()">删除</el-button>
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
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="num" label="司机编号" width="110">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="100">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机"
          width="140"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="myID" label="身份证" width="200" class="sfz">
        </el-table-column>
        <el-table-column prop="zhangHao" label="账号" width="110" class="sfz">
        </el-table-column>
        <el-table-column prop="province" label="省份" width="100" class="sfz">
        </el-table-column>
        <el-table-column prop="county" label="城市" width="100" class="sfz">
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
      optionsTown: [],
      optionProvince: [
        {
          ProID: 1,
          name: "北京市",
          ProSort: 1,
        },
        {
          ProID: 2,
          name: "天津市",
          ProSort: 2,
        },
        {
          ProID: 3,
          name: "河北省",
          ProSort: 3,
        },
        {
          ProID: 4,
          name: "山西省",
          ProSort: 4,
        },
        {
          ProID: 5,
          name: "内蒙古自治区",
          ProSort: 5,
        },
        {
          ProID: 6,
          name: "辽宁省",
          ProSort: 6,
        },
        {
          ProID: 7,
          name: "吉林省",
          ProSort: 7,
        },
        {
          ProID: 8,
          name: "黑龙江省",
          ProSort: 8,
        },
        {
          ProID: 9,
          name: "上海市",
          ProSort: 9,
        },
        {
          ProID: 10,
          name: "江苏省",
          ProSort: 10,
        },
        {
          ProID: 11,
          name: "浙江省",
          ProSort: 11,
        },
        {
          ProID: 12,
          name: "安徽省",
          ProSort: 12,
        },
        {
          ProID: 14,
          name: "江西省",
          ProSort: 14,
        },
        {
          ProID: 15,
          name: "山东省",
          ProSort: 15,
        },
        {
          ProID: 16,
          name: "河南省",
          ProSort: 16,
        },
        {
          ProID: 17,
          name: "湖北省",
          ProSort: 17,
        },
        {
          ProID: 18,
          name: "湖南省",
          ProSort: 18,
        },
        {
          ProID: 19,
          name: "广东省",
          ProSort: 19,
        },
        {
          ProID: 23,
          name: "陕西省",
          ProSort: 23,
        },
        {
          ProID: 27,
          name: "重庆市",
          ProSort: 27,
        },
        {
          ProID: 28,
          name: "四川省",
          ProSort: 28,
        },
        {
          ProID: 30,
          name: "云南省",
          ProSort: 30,
        },
        {
          ProID: 31,
          name: "西藏自治区",
          ProSort: 31,
        },
        {
          ProID: 32,
          name: "台湾省",
          ProSort: 32,
        },
      ],

      // 市
      town: [
        {
          CityID: 1,
          name: "北京市",
          ProID: 1,
          CitySort: 1,
        },
        {
          CityID: 2,
          name: "天津市",
          ProID: 2,
          CitySort: 2,
        },
        {
          CityID: 3,
          name: "上海市",
          ProID: 9,
          CitySort: 3,
        },
        {
          CityID: 4,
          name: "重庆市",
          ProID: 27,
          CitySort: 4,
        },
        {
          CityID: 6,
          name: "石家庄市",
          ProID: 3,
          CitySort: 6,
        },
        {
          CityID: 7,
          name: "保定市",
          ProID: 3,
          CitySort: 7,
        },
        {
          CityID: 8,
          name: "张家口市",
          ProID: 3,
          CitySort: 8,
        },
        {
          CityID: 13,
          name: "衡水市",
          ProID: 3,
          CitySort: 13,
        },
        {
          CityID: 18,
          name: "太原市",
          ProID: 4,
          CitySort: 18,
        },
        {
          CityID: 21,
          name: "晋中市",
          ProID: 4,
          CitySort: 21,
        },
        {
          CityID: 22,
          name: "长治市",
          ProID: 4,
          CitySort: 22,
        },
        {
          CityID: 26,
          name: "运城市",
          ProID: 4,
          CitySort: 26,
        },
        {
          CityID: 27,
          name: "沈阳市",
          ProID: 6,
          CitySort: 27,
        },
        {
          CityID: 28,
          name: "铁岭市",
          ProID: 6,
          CitySort: 28,
        },
        {
          CityID: 29,
          name: "大连市",
          ProID: 6,
          CitySort: 29,
        },
        {
          CityID: 30,
          name: "鞍山市",
          ProID: 6,
          CitySort: 30,
        },
        {
          CityID: 40,
          name: "葫芦岛市",
          ProID: 6,
          CitySort: 40,
        },
        {
          CityID: 41,
          name: "长春市",
          ProID: 7,
          CitySort: 41,
        },
        {
          CityID: 42,
          name: "吉林市",
          ProID: 7,
          CitySort: 42,
        },
        {
          CityID: 46,
          name: "白城市",
          ProID: 7,
          CitySort: 46,
        },
        {
          CityID: 50,
          name: "哈尔滨市",
          ProID: 8,
          CitySort: 50,
        },
        {
          CityID: 51,
          name: "齐齐哈尔市",
          ProID: 8,
          CitySort: 51,
        },
        {
          CityID: 61,
          name: "伊春市",
          ProID: 8,
          CitySort: 61,
        },
        {
          CityID: 62,
          name: "大庆市",
          ProID: 8,
          CitySort: 62,
        },
        {
          CityID: 63,
          name: "南京市",
          ProID: 10,
          CitySort: 63,
        },
        {
          CityID: 66,
          name: "苏州市",
          ProID: 10,
          CitySort: 66,
        },
        {
          CityID: 76,
          name: "舟山市",
          ProID: 11,
          CitySort: 76,
        },
        {
          CityID: 77,
          name: "衢州市",
          ProID: 11,
          CitySort: 77,
        },
        {
          CityID: 82,
          name: "绍兴市",
          ProID: 11,
          CitySort: 82,
        },
        {
          CityID: 87,
          name: "合肥市",
          ProID: 12,
          CitySort: 87,
        },
        {
          CityID: 88,
          name: "芜湖市",
          ProID: 12,
          CitySort: 88,
        },
        {
          CityID: 95,
          name: "黄山市",
          ProID: 12,
          CitySort: 95,
        },
      ],
      page: {
        //定义页数
        pageNum: 1, //当前的第几页
        total: 10, //一共有多少条
        pageSize: 100, //每页显示条数
        currentPage4: 6,
      },
      formInline: {
        num: "",
        name: "",
        // region: "",
        // manage: "",
      },
      tableData: [],
      alltableData: [
        {
          num: "zz66666",
          name: "王大哥",
          phone: "12312312345",
          myID: "123456789123456789",
          zhangHao: "cq88888",
          province: "北京市",
          county: "北京市",
        },
        {
          num: "dl7777",
          name: "王小哥",
          phone: "12312312345",
          myID: "123456789123456789",
          zhangHao: "cq88888",
          province: "天津市",
          county: "天津市",
        },
        {
          num: "zq8888",
          name: "张三",
          phone: "12312312345",
          myID: "123456789123456789",
          zhangHao: "cq88888",
          province: "河北省",
          county: "衡水市",
        },
        {
          num: "zz66666",
          name: "王小四",
          phone: "12312312345",
          myID: "123456789123456789",
          zhangHao: "cq88888",
          province: "辽宁省",
          county: "沈阳市",
        },
      ],
      multipleSelection: [],
    };
  },

  mounted() {
    this.search();
  },

  methods: {
    //省的change事件
    provinceChange(value) {
      console.log(value);
      this.optionsTown = [];
      this.town.forEach((item) => {
        if (value == item.ProID) {
          this.optionsTown.push(item);
        }
      });
    },

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
    // 查询
    search() {
      console.log("allTableData", this.alltableData);
      this.tableData = this.alltableData
        .filter((item) => {
          return (
            item.num.includes(this.formInline.num) &&
            item.name.includes(this.formInline.name)
          );
        })
        .slice(
          (this.page.pageNum - 1) * this.page.pageSize,
          this.page.pageNum * this.page.pageSize
        );
      this.page.total = this.alltableData.length;
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //详情按钮
    detailsSelection() {
      if (1 == this.multipleSelection.length) {
        this.$refs.detailsSelection.openDialog(
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

    //接受子页面传过来的值(新增)
    searchAdd(val) {
      val;
      console.log(val);
      //val源数据
      this.alltableData.push(val);
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
      let index = this.alltableData.findIndex((item) => {
        return item.userId === value.userId;
      });

      let newFormData = Object.assign({}, value);
      this.alltableData.splice(index, 1, newFormData);
      console.log(this.alltableData);
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

      //确定删除
      this.$confirm("确定要删除选中数据吗？")
        .then(() => {
          let indexList = this.multipleSelection.map((item) => {
            return item.userId;
          });

          indexList.forEach((indexItem) => {
            //当数组中的元素在测试条件时返回true时，findIndex()返回符合条件的元素的索引位置
            //如果没有符合条件的元素返回-1
            let currentIndex = this.alltableData.findIndex((item) => {
              return item.userId === indexItem;
            });

            console.log("currentIndex", currentIndex);
            this.alltableData.splice(currentIndex, 1);
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
  top: 180px;
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
  top: -750px;
}
.userTable {
  width: 915px;
}
.block {
  margin: 50px 0 0 300px;
}
</style>