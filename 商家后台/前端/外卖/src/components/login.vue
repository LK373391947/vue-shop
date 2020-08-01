<template>
  <div class="login-container">
    <div class="login-box">
      <div class="top-image">
        <img src="../assets/login.png" alt />
      </div>
      <div class="main">
        <el-form ref="loginformRef" class="login_form" :model="loginForm" :rules="loginFormRules">
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
          <!-- 按钮区 -->
          <el-form-item class="btns">
            <el-button type="primary" round @click="login">登录</el-button>
            <el-button type="primary" round @click="addDialogVisible=true">注册</el-button>
            <el-button type="info" round @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog title="注册" :visible.sync="addDialogVisible" width="30%">
      <el-form ref="addformRef" :model="addForm" :rules="addFormRules">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="addForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!-- 店铺名称 -->
        <el-form-item prop="shopname">
          <el-input v-model="addForm.shopname" placeholder="请输入店铺名"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="addForm.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <!-- 密码确认 -->
        <el-form-item prop="confirm">
          <el-input v-model="addForm.confirm" placeholder="请确认密码" type="password"></el-input>
        </el-form-item>
        <!-- 店铺描述 -->
        <el-form-item prop="describe">
          <el-input
            v-model="addForm.describe"
            placeholder="请输入店铺描述"
            type="textarea"
            :autosize="{ minRows: 4}"
            maxlength="100"
            show-word-limit
            resize="none"
          ></el-input>
        </el-form-item>
        <!-- 店铺地址 -->
        <el-form-item prop="address">
          <el-input v-model="addForm.address" placeholder="请输入店铺地址"></el-input>
        </el-form-item>
        <!-- 电话 -->
        <el-form-item prop="telephone">
          <el-input v-model="addForm.telephone" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        <!-- 类别 -->
        <el-form-item prop="category">
          <el-select v-model="addForm.category" placeholder="请选择店铺的种类">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="registerQuit">取 消</el-button>
        <el-button type="primary" @click="register">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //登录表单的数据对象
      loginForm: {
        username: "",
        password: ""
      },
      //注册对话框的显示
      addDialogVisible: false,
      //注册表单的数据对象
      addForm: {
        username: "",
        shopname: "",
        password: "",
        confirm: "",
        describe: "",
        address: "",
        telephone: "",
        category: ""
      },
      //分类种类
      options: [
        {
          value: "选项1",
          label: "快餐"
        },
        {
          value: "选项2",
          label: "饮品"
        },
        {
          value: "选项3",
          label: "烧烤"
        },
        {
          value: "选项4",
          label: "丝袜店"
        }
      ],
      //登录表单验证规则
      loginFormRules: {
        //用户名和密码保证6-16位之间（焦点消失验证）
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 16, message: "请输入3-16位字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "请输入6-16位字符", trigger: "blur" }
        ]
      },
      //注册表单的验证规则
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 16, message: "请输入3-16位字符", trigger: "blur" }
        ],
        shopname: [
          { required: true, message: "请输入店铺名称", trigger: "blur" },
          { min: 3, max: 10, message: "请输入3-16位字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "请输入6-16位字符", trigger: "blur" }
        ],
        confirm: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "请输入6-16位字符", trigger: "blur" }
        ],
        describe: [
          { required: true, message: "请输入店铺描述", trigger: "blur" },
          { min: 40, max: 100, message: "请输入40-100位字符", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入店铺地址", trigger: "blur" }
        ],
        telephone: [
          { required: true, message: "请输入电话号码", trigger: "blur" }
        ],
        category: [
          { required: true, message: "请选择店铺的种类", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //重置登录表单
    resetForm() {
      this.$refs.loginformRef.resetFields();
    },
    //重置注册表单
    resetRegister() {
      this.$refs.addformRef.resetFields();
    },
    //登录提交
    login() {
      //validate函数校验表单是否符合rules中的各个规则
      this.$refs.loginformRef.validate(async valid => {
        if (!valid) return;
        const result = await this.$http.post("/userLogin", this.loginForm);
        if (result.status !== 200 || result.data.length == 0)
          return this.$message({
            message: "登录失败",
            type: "error",
            center: true,
            showClose: true
          });
        this.$message({
          message: "登录成功",
          type: "success",
          center: true,
          showClose: true
        });
        //把店名shopname设置一个seesion级别的本地缓存用于之后home页面的操作
        window.sessionStorage.setItem("username",result.data[0].username);
        window.sessionStorage.setItem("shopname",result.data[0].shopname);
        //随后跳转到home页面
        this.$router.push("/home");
      });
    },
    //注册提交
    register() {
      this.$refs.addformRef.validate(async valid=>{
        if(!valid)return;
        const result=await this.$http.post("/userRegister",this.addForm);
        if (result.data == "error")
          return this.$message({
            message: "注册失败",
            type: "error",
            center: true,
            showClose: true
          });
        this.$message({
          message: "注册成功",
          type: "success",
          center: true,
          showClose: true
        });
        this.registerQuit();
      })
    },
    //退出并重置注册表单
    registerQuit() {
      this.addDialogVisible = false;
      this.resetRegister();
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  background-color: rgb(14, 99, 168);
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 500px;
    height: 300px;
    background-color: #fff;
    border: 5px solid #39c5bb;
    border-radius: 10px;
    position: relative;
    box-shadow: 0 0 10px;
    .top-image {
      width: 150px;
      height: 150px;
      border-radius: 150px;
      overflow: hidden;
      position: absolute;
      top: -75px;
      left: 175px;
      border: 5px solid #39c5bb;
      box-shadow: 0 0 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.main {
  margin-top: 100px;
  padding: 20px;
  .btns {
    display: flex;
    justify-content: flex-end;
  }
}
</style>