<template>
  <div class="system-user-center-page">
    <div class="system-header">
      <div class="header-center">
        <div class="header-center-left">
          <span class="header-center-name">上机考试系统</span>
          <span class="header-center-welcom">个人中心</span>
        </div>
        <div class="header-center-right">
          <a @click="outLogin">退出登录</a>
        </div>
      </div>
    </div>
    <div class="system-user-center-content">
      <div class="system-user-center-main">
        <p class="user-info-title">基本信息</p>
        <ul class="user-info-content">
          <li>用&ensp;户&ensp;名：{{userInfo.userName}}</li>
          <li>账&ensp;号&ensp;名：{{userInfo.countName}}</li>
          <!--<li>密&emsp;&emsp;码：{{userInfo.password}}<a href="">修改</a></li>-->
          <li>邮&ensp;箱&ensp;名：{{userInfo.email}}
            <!--<a @click="modal1 = true">修改</a>-->
          </li>
          <Modal v-model="modal1" title="修改邮箱" @on-ok="handleSubmit1('userInfoNew')">
            <div>
              <Form ref="userInfoNew" :model="userInfoNew" :rules="ruleValidate" :label-width="80" label-position="right">
                <FormItem label="邮箱" prop="emailNew">
                  <Input v-model="userInfoNew.emailNew" placeholder="请输入邮箱"></Input>
                </FormItem>
              </Form>
            </div>
          </Modal>
          <li>手&ensp;机&ensp;号：{{userInfo.cellphone}}
            <!--<a @click="modal2 = true">修改</a>-->
          </li>
          <Modal v-model="modal2" title="修改手机号" @on-ok="handleSubmit2('userInfoNew')">
            <div>
              <Form ref="userInfoNew" :model="userInfoNew" :rules="ruleValidate" :label-width="80" label-position="right">
                <FormItem label="手机号" prop="cellphoneNew">
                  <Input v-model="userInfoNew.cellphoneNew" placeholder="请输入手机号"></Input>
                </FormItem>
              </Form>
            </div>
          </Modal>
          <li>身&ensp;份&ensp;证：{{userInfo.idCard}}</li>
          <li>出生日期：{{userInfo.birthday}}</li>
          <li>性&emsp;&emsp;别：{{userInfo.sex}}</li>
          <li><a @click="modal3 = true">修改密码</a></li>
          <Modal v-model="modal3" title="修改密码" @on-ok="handleSubmit3('userInfoNew')">
            <div>
              <Form ref="userInfoNew" :model="userInfoNew" :rules="ruleValidate" :label-width="80" label-position="right">
                <FormItem label="旧密码" prop="passwordOld">
                  <Input type="password" v-model="userInfoNew.passwordOld" placeholder="请输入旧密码"></Input>
                </FormItem>
                <FormItem label="新密码" prop="passwordNew">
                  <Input type="password" v-model="userInfoNew.passwordNew" placeholder="请输入新密码"></Input>
                </FormItem>
              </Form>
            </div>
          </Modal>
        </ul>
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
        name: "system-user-center",
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
              sex:''
            },
            userInfoNew:{
              passwordOld:'',
              passwordNew:'',
              emailNew:'',
              cellphoneNew:'',
            },
            modal1: false,
            modal2: false,
            modal3: false,
            ruleValidate: {
              passwordOld: [
                {required: true, message: '请输入密码', trigger: 'blur'},
                {type: 'string', min: 6, message: '密码长度不得小于6位！', trigger: 'blur'}
              ],
              passwordNew: [
                {required: true, message: '请输入密码', trigger: 'blur'},
                {type: 'string', min: 6, message: '密码长度不得小于6位！', trigger: 'blur'}
              ],
              cellphoneNew:[
                {required: true, message: '请输入手机号', trigger: 'blur'},
                {type: 'string', min: 11,message: '手机号格式不正确！',trigger: 'blur'}
              ],
              emailNew: [
                { required: true, message: '邮箱不能为空！', trigger: 'blur' },
                { type: 'email', message: '邮箱格式不正确！', trigger: 'blur' }
              ]
            }
          }
        },
        methods:{
          outLogin(){
            this.$router.push('/');
          },
          handleSubmit1 (name) {
            this.$refs[name].validate((valid) => {
              if (valid) {
                this.userInfo.email=this.userInfoNew.emailNew;
                axios.post(url + '/update', this.userInfo, {
                  "headers": {
                    "Content-Type": "application/json"
                  }
                })
                  .then(function (response) {
                    console.log(response);
                  })

              } else {
                this.$Message.error('Fail!');
              }
            })
          },
          handleSubmit2 (name) {
            this.$refs[name].validate((valid) => {
              if (valid) {
                if(this.userInfoNew.cellphoneNew !== ''){
                  this.userInfo.cellphone=this.userInfoNew.cellphoneNew;
                  axios.post(url + '/update', this.userInfo, {
                    "headers": {
                      "Content-Type": "application/json"
                    }
                  })
                    .then(function (response) {
                      console.log(response);
                    })

                } else {
                  this.$Message.error('Fail!');
                }


              }else {
                this.$Message.error('Fail!');
              }
            })
          },
          handleSubmit3 (name3) {
            this.$refs[name3].validate((valid) => {
              if (valid) {
                if(this.userInfoNew.passwordOld == this.userInfo.password){
                  this.userInfo.password=this.userInfoNew.passwordNew;
                  axios.post(url + '/update', this.userInfo, {
                    "headers": {
                      "Content-Type": "application/json"
                    }
                  })
                    .then(function (response) {
                      console.log(response);
                    })
                }else{
                  this.$Message.error('旧密码不正确!');
                }
              } else {
                this.$Message.error('Fail!');
              }
            })
          }

        },
      beforeCreate:function(){

          let countNameCurrent=this.$route.query.countName;
          axios.get(url+'/getUser?countName='+countNameCurrent)
            .then(response=>{
              console.log(response);
              this.userInfo=response.data;
            })
            .catch(error=>{
              //console.log(error);
              alert('网络错误，不能访问')
            })
        }

    }
</script>

<style scoped>
  .system-user-center-content{
    width:100%;
    height:600px;
    background:#eaeaea;
    padding-top:50px;
  }
  .system-user-center-content .system-user-center-main{
    width:600px;
    height:500px;
    margin:0 auto;
    padding:25px;
    background:#fff;
    text-align:left;
  }
  .system-user-center-content .system-user-center-main .user-info-title{
    font-size:16px;
    font-weight:bold;
  }
  .system-user-center-content .system-user-center-main .user-info-content{
    margin-top:15px;
    font-size:14px;
  }
  .system-user-center-content .system-user-center-main .user-info-content li{
    margin-bottom:15px;
  }
  .system-header .header-center-right{
    float:right;
  }
  .system-header .header-center-right a{
    font-size:20px;
    color:rgb(49, 49, 49);
  }
</style>
