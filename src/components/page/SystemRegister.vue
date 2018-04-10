<template>
  <div class="system-register-page">
    <div class="system-header">
      <div class="header-center">
        <div class="header-center-left">
          <span class="header-center-name">上机考试系统</span>
          <span class="header-center-welcom">欢迎注册</span>
        </div>
        <div class="header-center-right">
          <a @click="goLogin">返回登录页</a>
        </div>
      </div>
    </div>
    <div class="system-register-content">
      <div class="system-register-main">
        <Form ref="userInfo" :model="userInfo" :rules="ruleValidate" :label-width="80" label-position="right">
          <FormItem label="用户名" prop="userName">
            <Input v-model="userInfo.userName" placeholder="请输入用户名"></Input>
          </FormItem>
          <FormItem label="账号名" prop="countName">
            <Input v-model="userInfo.countName" placeholder="请输入账号名"></Input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input type="password" v-model="userInfo.password" placeholder="请输入密码"></Input>
          </FormItem>
          <FormItem label="确认密码" prop="password_confirm">
            <Input type="password" v-model="userInfo.password_confirm" placeholder="请再次输入密码"></Input>
          </FormItem>
          <FormItem label="邮箱" prop="email">
            <Input v-model="userInfo.email" placeholder="请输入邮箱"></Input>
          </FormItem>
          <FormItem label="手机号" prop="cellphone">
            <Input v-model="userInfo.cellphone" placeholder="请输入手机号"></Input>
          </FormItem>
          <FormItem label="身份证" prop="idCard">
            <Input v-model="userInfo.idCard" placeholder="请输入身份证号"></Input>
          </FormItem>
          <FormItem label="出生日期">
            <FormItem prop="birthday">
              <DatePicker type="date" format="yyyy-MM-dd" placeholder="请选择出生日期" v-model="userInfo.birthday"></DatePicker>
            </FormItem>
          </FormItem>
          <FormItem label="性别" prop="sex">
            <RadioGroup v-model="userInfo.sex">
              <Radio label="男">男</Radio>
              <Radio label="女">女</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem class="register-btn">
            <Button type="primary" @click="handleSubmit('userInfo')">保存</Button>
            <Button type="ghost" @click="handleReset('userInfo')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Form>
      </div>
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
    // const url='http://192.168.1.107:28080/demo/user';
    const url='http://172.20.21.167:28080/demo/user';
    export default {
        name: "system-register",
        data(){
          return{
            userInfo:{
              userName:'',
              countName:'',
              password:'',
              email:'',
              cellphone:'',
              idCard:'',
              birthday:'',
              sex:'',
              password_confirm:''
            },
            ruleValidate: {
              userName: [
                { required: true, message: '用户名不能为空！', trigger: 'blur' }
              ],
              countName: [
                { required: true, message: '账号名不能为空！', trigger: 'blur' }
              ],
              password: [
                {required: true, message: '请输入密码', trigger: 'blur'},
                {type: 'string', min: 6, message: '密码长度不得小于6位！', trigger: 'blur'}
              ],
              password_confirm: [
                {required: true, message: '请再次输入密码', trigger: 'blur'},
                {type: 'string', min: 6, message: '密码长度不得小于6位！', trigger: 'blur'}
              ],
              cellphone:[
                {required: true, message: '请输入手机号', trigger: 'blur'},
                {type: 'string', min: 11,message: '手机号格式不正确！',trigger: 'blur'}
              ],
              idCard:[
                {required: true, message: '请输入身份证号', trigger: 'blur'},
                {type: 'string', min:18, message: '身份证号格式不正确！', trigger: 'blur'}
              ],
              email: [
                { required: true, message: '邮箱不能为空！', trigger: 'blur' },
                { type: 'email', message: '邮箱格式不正确！', trigger: 'blur' }
              ],
              sex: [
                { required: true, message: '请选择性别！', trigger: 'change' }
              ],
              birthday: [
                { required: true, type: 'date',message: '请选择出生日期！', trigger: 'change' }
              ]
            }
          }
        },
        methods: {
          handleSubmit (name) {
            this.$refs[name].validate((valid) => {
              if (valid) {
                if(this.userInfo.password == this.userInfo.password_confirm){
                  axios.post(url+'/register', this.userInfo, {
                    "headers": {
                      "Content-Type": "application/json"
                    }
                  })
                    .then(function (response) {
                      if(response.data.state == 'ERROR'){
                        alert(response.data.result);
                      }else if(response.data.state == 'OK'){
                        alert('恭喜您！完成本次注册！');
                      }
                    })
                }else{
                  alert('两次输入密码不一致！')
                }

              } else {
                this.$Message.error('Fail!');
              }
            })
          },
          handleReset (name) {
            this.$refs[name].resetFields();
          },
          goLogin(){
            this.$router.push('/');
          }
        }
    }
</script>

<style scoped>
  .system-register-content{
    width:100%;
    height:900px;
    background:#eaeaea;
    padding-top:50px;
  }
  .system-register-content .system-register-main{
    width:800px;
    height:800px;
    margin:0 auto;
    padding:85px;
    background:#fff;
    text-align:left;
  }
  .system-register-content .system-register-main .register-btn{
    text-align:center;
  }
  .system-header .header-center-right{
    float:right;
  }
  .system-header .header-center-right a{
    font-size:20px;
    color:rgb(49, 49, 49);
  }
</style>
