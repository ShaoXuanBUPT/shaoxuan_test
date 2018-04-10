<template>
    <div class="system-login-page">
      <div class="system-header">
        <div class="header-center">
          <div class="header-center-left">
            <span class="header-center-name">上机考试系统</span>
            <span class="header-center-welcom">欢迎登录</span>
          </div>
        </div>
      </div>
      <div class="system-login-content">
        <article>
          <div class="opacity-login-wrap"></div>
          <div class="login-wrap">
            <Form ref="formInline" :model="formItem" :rules="ruleInline">
              <div class="login-title">登录</div>
              <FormItem prop="countName" label="账号名">
                <Input type="text" v-model="formItem.countName" placeholder="账号名"></Input>
              </FormItem>
              <FormItem prop="password" label="密码">
                <Input type="password" v-model="formItem.password" placeholder="密码"></Input>
              </FormItem>
              <FormItem label="验证码"><br>
                <input type="text" id="input" placeholder="验证码"/>
                <input type="button" id="checkCode" class="code" @click="createCode" />
                <a href="#" class="update-code" @click="createCode">看不清楚</a><br>
              </FormItem>
              <a class="login-btn" @click="handleSubmit('formInline')">登录</a>
              <div class="login-other">
                <a class="free-register" @click="toRegister">免费注册</a>
              </div>
            </Form>
          </div>
        </article>
      </div>
      <div class="system-footer">
        <div class="footer-content">
          <ul class="footer-list">
            <li><a href="javascript:;">关于我们</a></li>
            <li><span>|</span></li>
            <li><a href="javascript:;">业务咨询</a></li>
            <li><span>|</span></li>
            <li><a href="javascript:;">技术服务</a></li>
            <li><span>|</span></li>
            <li><a href="javascript:;">联系我们</a></li>
          </ul>
          <p>COPYRIGHT 2018 shaoxuan.RESERVED</p>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'

  let code; //在全局定义验证码
  // const url='http://192.168.1.107:28080/demo/user';
  const url='http://172.20.21.167:28080/demo/user';


    export default {
      name: "system-login",
      data() {
        return {
          formItem: {
            countName: '',
            password: ''
          },
          ruleInline: {
            countName: [
              {required: true, message: '请输入账号名', trigger: 'blur'},
              {type: 'string', min: 1, message: '账号名不能为空！', trigger: 'blur'}
            ],
            password: [
              {required: true, message: '请输入密码', trigger: 'blur'},
              {type: 'string', min: 6, message: '密码长度不得小于6位！', trigger: 'blur'}
            ]
          }
        }
      },
      methods: {
        createCode() {
          code = "";
          let codeLength = 5; //验证码的长度
          let checkCode = document.getElementById("checkCode");
          let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数
          for (let i = 0; i < codeLength; i++) { //循环操作
            let charIndex = Math.floor(Math.random() * 36); //取得随机数的索引
            code += random[charIndex]; //根据索引取得随机数加到code上
          }
          checkCode.value = code; //把code值赋给验证码
        },
        handleSubmit(name) {
          this.$refs[name].validate((valid) => {
            if (valid) {
              let inputCode = document.getElementById("input").value.toUpperCase(); //取得输入的验证码并转化为大写
              if (inputCode.length <= 0) { //若输入的验证码长度为0
                alert("请输入验证码！"); //则弹出请输入验证码
              } else if (inputCode != code) { //若输入的验证码与产生的验证码不一致时
                alert("验证码输入错误！"); //则弹出验证码输入错误
                this.$options.methods.createCode();//刷新验证码
              } else { //输入正确时
                // this.$Message.success('Success!');//输入正确时验证用户名是否存在，密码是否正确，如果正确则跳转到个人中心页面
                console.log(this.formItem.countName);
                // this.$axios({
                //   method: 'post',
                //   url:'http://172.20.21.167:28080/demo/user/validate',
                //   data:JSON.stringfy(this.formatTime),
                //   ContentType:'application/json;charset=UTF-8',
                //   dataType:'json'
                // }).then((response)=>{
                //   console.log(response);
                // });
                // const url='http://172.20.21.167:28080/demo/user/validate';
                // const url='http://192.168.1.107:28080/demo/user/validate';

                axios.post(url+'/validate', this.formItem, {
                  "headers": {
                    "Content-Type": "application/json"
                  }
                })
                  .then(function (response) {
                    console.log(response);
                    if(response.data.state == 'ERROR'){
                        alert(response.data.result)
                    }else if(response.data.state == 'OK'){
                      window.location.href="./system-user-center?countName="+response.data.result;
                    }
                  })

              }

            } else {
              this.$Message.error('Fail!');
            }
          })


        },
        toRegister(){
          this.$router.push('/system-register');
        }
      },
      beforeCreate:function(){
        window.onload = function(){
          createCode();
        };
        function createCode() {
          code = "";
          let codeLength = 5;
          let checkCode = document.getElementById("checkCode");
          let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
          for(let i = 0; i < codeLength; i++) {
            let charIndex = Math.floor(Math.random() * 36);
            code += random[charIndex];
          }
          checkCode.value = code;
        }
      }
    }

</script>

<style>
  .system-login-content{
    height: 480px;
    background: url(../../assets/images/beijing.jpg) no-repeat center 0;
  }
  .system-login-content article{
    height: 100%;
    width: 1000px;
    position: relative;
    margin: 0 auto;
  }
  .system-login-content .opacity-login-wrap{
    position: absolute;
    top: 30px;
    right:25px;
    background: #000000;
    opacity: 0.7;
    filter: alpha(opacity=70);
    width: 350px;
    height: 426px;
  }
  .system-login-content .login-wrap{
    position: absolute;
    top: 25px;
    right: 40px;
    font-size: 12px;
    padding: 31px 30px 25px 30px;
  }
  .system-login-content .login-wrap .login-title{
    font-size: 18px;
    color: #ffffff;
    line-height: 24px;
    margin-bottom: 21px;
  }
  .ivu-form .ivu-form-item-label{
    color:#ccc !important;
  }
  .ivu-form-item-required .ivu-form-item-label:before{
    display:none;
  }
  .system-login-content .login-btn{
    display: inline-block;
    margin-bottom: 15px;
    width: 240px;
    height: 40px;
    background-color: #ff6600;
    color: #fff;
    font-size: 18px;
    line-height: 40px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
  }
  .system-login-content .update-code{
    color:#ccc;
  }
  .system-login-content .login-wrap .login-other a{
    line-height: 20px;
    cursor: pointer;
  }
  .system-login-content .login-wrap .login-other .free-register {
    margin-left: 180px;
    color: #d29e0b;
  }


</style>
