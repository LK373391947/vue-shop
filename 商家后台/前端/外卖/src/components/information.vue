<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{infoForm.shopname}}</span>
        <el-button style="float: right; padding: 3px 0" type="text">修改信息</el-button>
      </div>
      <div class="information">
      <div>用户名:{{infoForm.username}}</div>
      <div>密码:{{infoForm.password}}</div>
      <div>商家描述:{{infoForm.describe}}</div>
      <div>地址:{{infoForm.address}}</div>
      <div>手机号码:{{infoForm.telephone}}</div>
      <div>分类:{{infoForm.category}}</div>
   </div> </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      infoForm: {
        username: "",
        shopname: "",
        password: "",
        describe: "",
        address: "",
        telephone: "",
        category: ""
      },
      obj:{
        username:""
      }
    };
  },
  created() {
      this.getInfo();
  },
  methods: {
      //获取当前商铺信息
     async getInfo(){
          this.obj.username=window.sessionStorage.getItem("username");
          const {data:result}=await this.$http.post("/getInfo",this.obj);
          if(result.length==0)return this.$message.error("获取信息失败");
          this.infoForm=result[0];
      }
  }
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  .box-card {
      width: 40%;
      .information {
          padding-left:20px ;
          >div {
              margin-top:10px;
              font-size: 16px;
              color:gray
          }
      }
  }
}
</style>