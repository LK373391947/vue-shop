<template>
      <div class="container">
    <el-card class="header">
      <el-button type="primary" round>查询评论</el-button>
    </el-card>
    <el-card class="main">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="时间"></el-table-column>
        <el-table-column prop="username" label="客户名"></el-table-column>
        <el-table-column prop="message" label="内容"></el-table-column>
        <el-table-column label="操作">
          
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getComment();
  },
  methods: {
    async getComment() {
      let shopname = window.sessionStorage.getItem("shopname");
      const { data: result } = await this.$http.get("/getComment", {
        params: { shopname: shopname },
      });
      if (result.length == 0) return this.$message.error("暂无数据");
      this.tableData = result[0].commentArray;
    },
    deleteOrder(value) {
      //由于商家和客户共用一个订单表所以暂不支持删除订单功能，实际开发应该把商家的表和客户的表分离
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  .header {
    width: 95%;
    margin: 20px;
  }
  .main {
    width: 95%;
    margin: 20px;
  }
}
</style>